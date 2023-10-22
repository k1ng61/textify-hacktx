import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { db, auth } from '@/firebaseConfig'
import { Timestamp, doc, updateDoc, getDoc, deleteDoc,setDoc, collection, addDoc, getDocs, orderBy, onSnapshot, query, snapshotEqual } from "firebase/firestore";
import { useRouter } from 'next/router'
import { ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import DASHNAV from '@/DASHNAV'
import Chart from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";

export default function Home() {
    const [user] = useAuthState(auth);
    const [userData, setuserData] = useState([]);
  
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);
    
    useEffect(() => {
        const getUser = async() => {
            if(user){
              const docRef = doc(db, "Users", user.uid);
              const docSnap = await getDoc(docRef);
  
              if (docSnap.exists()) {
                  const data = docSnap.data();
                  console.log('herer')
                  setuserData(data);
                  if (data.campaigns) {
                      let temp = [];
                   
                      let promises = data.campaigns.map(async (campaign) => {
                          const docRef = doc(db, "Campaigns", campaign);
                          const docSnap = await getDoc(docRef);
                      
                          if(docSnap.exists()) {
                              const campaignData = docSnap.data();
                              temp.push(campaignData);
                           }
                      })
                  
                      Promise.all(promises)
                          .then(() => {
                              setCampaigns(temp);
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
      }, [user, loading]);
  

    const barData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            label: "Sales",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [42, 32, 75, 120, 60, 78, 116],
          },
        ],
      };
    
    
    const piedata = {
      labels: ["Lauren", "Sasha", "Molly", "Nelly", "Maya", "Sandy"],
      datasets: [
        {
          label: "Matches (% this year)",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(0,0,255)",
          data: [0, 10, 5, 2, 20, 30, 45],
        },
      ],
    };
    useEffect(() => {
      window.plugSDK.init({
        app_id: 'don:core:dvrv-us-1:devo/V3Czi2bv:plug_setting/1',                
       });
   }, []);
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

        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
        <script
          src="https://plug-platform.devrev.ai/static/plug.js"                         
          type="text/javascript">
        </script>

    </Head>
    <main className='main-dash-container'  >
    
        {user? <>
        
        
            <DASHNAV renderFunction={() => <>
        
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
                  <p class="text-sm font-medium text-gray-500">Active Campaigns</p>
                  <p class="text-4xl font-medium text-gray-800">{userData.campaigns? userData.campaigns.length : 0}</p>
                  <span class="float-right rounded-full bg-rose-100 px-1 text-sm font-medium text-rose-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline h-4 w-4 pb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                    0%</span
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
                  <p class="text-sm font-medium text-gray-500">Total users</p>
                  <p class="text-4xl font-medium text-gray-800">25</p>
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
                  <p class="text-sm font-medium text-gray-500">Messages sent</p>
                  <p class="text-4xl font-medium text-gray-800">53</p>
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

            <Bar data={barData} />

                </div>
                </> }/> 
        </> : <>
        
        </>}
      
    </main>
  
  </>
 
  )
}
