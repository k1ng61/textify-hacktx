import Head from 'next/head'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { ref, child, get } from "firebase/database";
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import { db, auth, dbase } from '@/firebaseConfig'
import { Timestamp, doc, updateDoc, getDoc, setDoc, collection, addDoc, getDocs, orderBy, onSnapshot, query, snapshotEqual } from "firebase/firestore";
import DASHNAV from '@/DASHNAV';

export default function Home() {
    const router = useRouter()
    const { id } = router.query;
    const [campaignData, setCampaignData] = useState([])
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [sucess, setSucess] = useState(false);
    const [user] = useAuthState(auth)
    const [userMessages, setuserMessages] = useState([])
    useEffect(() => {
        const getUser = async() => {
            if(id){
              const docRef = doc(db, "Campaigns", id);
              const docSnap = await getDoc(docRef);
  
              if (docSnap.exists()) {
                  const data = docSnap.data();
                  setCampaignData(data);
                  if (data.users) {
                    let temp = [];
                    let promises = [];
                  
                    for (var i = 0; i < data.users.length; i++) {
                      const dbRef = ref(dbase);
                      const newsletterRef = child(dbRef, `${id}/${data.users[i].number}`);
                      
                      const promise = get(newsletterRef)
                        .then((snapshot) => {
                          if (snapshot.exists()) {
                            temp.push(snapshot.val());
                          } else {
                            console.log("No data available");
                          }
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                  
                      promises.push(promise);
                    }
                  
                    Promise.all(promises)
                      .then(() => {
                        setuserMessages(temp);
                        console.log(temp);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }
              }
            }
            
        } 
     
        getUser();
      }, [id]);


      const handleJoin = async () =>{
        if (!name || !number){
            alert("Enter both your email and number!");
            return;
        }

        let temp = [];
        if (campaignData.users){
            temp = [...campaignData.users];
        }

        temp.push({"name": name, "number" : number});

        await updateDoc(doc(db,"Campaigns", id), {
            users: temp
        });         
        
        alert("Joined!")
        router.push('/')
      }


    return (
    <>
      <Head>
        <title>Textify</title>
        <meta name="description" content="Mailchimp for SMS, powered by AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/monument-extended" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap" rel="stylesheet" />

        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&display=swap" rel="stylesheet" />
        

      </Head>
      <main> 
      <div>
             {user? <>
             
                <DASHNAV renderFunction={() => 
                        <>
                        
                        <div>
                        <div className='mt-4'>
              <div class="mx-auto grid max-w-screen-lg gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                <div class="max-w-md rounded-lg border px-6 pt-6 pb-10">
                  <div class="inline-block rounded-full border-8 border-emerald-50 bg-emerald-200 p-2 text-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="float-right h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  <p class="text-sm font-medium text-gray-500">Messages sent</p>
                  <p class="text-4xl font-medium text-gray-800">36</p>
                  <span class="float-right rounded-full bg-rose-100 px-1 text-sm font-medium text-rose-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 pb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                    2%</span
                  >
                </div>

                <div class="max-w-md rounded-lg border px-6 pt-6 pb-10">
                  <div class="inline-block rounded-full border-8 border-emerald-50 bg-emerald-200 p-2 text-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="float-right h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  <p class="text-sm font-medium text-gray-500">Response Rate</p>
                  <p class="text-4xl font-medium text-gray-800">37%</p>
                  <span class="float-right rounded-full bg-emerald-100 px-1 text-sm font-medium text-emerald-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 pb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                    15%</span
                  >
                </div>

                <div class="max-w-md rounded-lg border px-6 pt-6 pb-10">
                  <div class="inline-block rounded-full border-8 border-emerald-50 bg-emerald-200 p-2 text-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="float-right h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                  <p class="text-sm font-medium text-gray-500">Sales generated</p>
                  <p class="text-4xl font-medium text-gray-800">$1,422</p>
                  <div class="float-right flex -space-x-2">
                    <img class="h-7 w-7 rounded-full ring ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                    <img class="h-7 w-7 rounded-full ring ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                    <img class="h-7 w-7 rounded-full ring ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" />
                    <img class="h-7 w-7 rounded-full ring ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                    <div class="flex h-7 w-7 items-center justify-center rounded-full bg-gray-300 font-semibold text-white ring ring-white">+5</div>
                  </div>
                </div>
              </div>
            </div>
                        </div>
                        <div className="container mx-auto py-5">
  {userMessages.map((messages, index) => (
    <div key={index} className="my-5 p-5 border rounded shadow-md">
      <h3 className="text-2xl font-bold mb-4">{campaignData.users[index].name}'s conversation</h3>
      {Object.values(messages).map((message, msgIndex) => (
          <div key={msgIndex} className={`p-3 mb-2 rounded ${message.role === 'user' ? 'bg-blue-200' : 'bg-green-200'}`}>
              <p className="font-semibold">{message.role}:</p>
              <p className="ml-5">{message.content}</p>
          </div>
      ))}
    </div>
  ))}
</div>
                        
                        </>
                    } />    
             </> : <></>}
                      
        </div>
        
      </main>
    </>
  )
}