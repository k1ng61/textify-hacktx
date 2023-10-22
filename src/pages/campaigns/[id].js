import Head from 'next/head'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";

import { db, auth, storage } from '@/firebaseConfig'
import { Timestamp, doc, updateDoc, getDoc, setDoc, collection, addDoc, getDocs, orderBy, onSnapshot, query, snapshotEqual } from "firebase/firestore";

export default function Home() {
    const router = useRouter()
    const { id } = router.query;
    const [campaignData, setCampaignData] = useState([])
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [sucess, setSucess] = useState(false);

   
    useEffect(() => {
        const getUser = async() => {
            if(id){
              const docRef = doc(db, "Campaigns", id);
              const docSnap = await getDoc(docRef);
  
              if (docSnap.exists()) {
                  const data = docSnap.data();
                  setCampaignData(data);
                
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
      <div className='bg-red-500'>
                        
                        {campaignData? <>
                        
                            <div className="flex items-center min-h-screen ">
                            <div
                                className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl"
                            >
                                <div className="flex flex-col md:flex-row">
                                <div className="h-32 md:h-auto md:w-1/2">
                                    <img
                                    className="object-cover w-full h-full"
                                    src="https://firebasestorage.googleapis.com/v0/b/bimi-b478b.appspot.com/o/AND09740.jpg?alt=media&token=e6e51be5-7e31-4b11-8b8e-3a8d03f63fab"
                                    alt="img"
                                    width={500}
                                    height={500}
                                    />
                                </div>
                                <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                                    <div className="w-full">
                                    <h3 className="mb-4 text-xl font-bold text-blue-600">Join {campaignData.title}</h3>
        
                                    
                            <div className="mb-4">
                                        <label className="block mb-2 text-sm"> Name </label>
                                        <input
                                        type="text"
                                        className="
                                            w-full
                                            px-4
                                            py-2
                                            text-sm
                                            border
                                            rounded-md
                                            focus:border-blue-400
                                            focus:outline-none
                                            focus:ring-1
                                            focus:ring-blue-600
                                        "
                                        placeholder="mrbeast"
                                        value={name}
                                        onChange={(e) => {setName(e.target.value)}}
                                        />
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm"> Phone Number (with area code!) </label>
                                        <input
                                            type="number"
                                            className="
                                            w-full
                                            px-4
                                            py-2
                                            text-sm
                                            border
                                            rounded-md
                                            focus:border-blue-400
                                            focus:outline-none
                                            focus:ring-1
                                            focus:ring-blue-600
                                            "
                                            placeholder="11231231234"
                                            value={number}
                                            onChange={(e) => {setNumber(e.target.value)}}
                                        />
                                        </div>
                                    <div className="flex justify-center">
                                        <button
                                        className="
                                            px-6
                                            py-2
                                            mt-4
                                            text-sm
                                            font-medium
                                            leading-5
                                            text-center text-white
                                            transition-colors
                                            duration-150
                                            bg-blue-600
                                            border border-transparent
                                            rounded-lg
                                            hover:bg-blue-700
                                            focus:outline-none
                                        "
                                        onClick={handleJoin}
                                        >
                                        Join
                                        </button>
                                    </div>
                                    
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                
                        
                        
                        </> : <></>}
                    </div>
        
      </main>
    </>
  )
}