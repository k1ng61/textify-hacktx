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

export default function Home() {
    const [user] = useAuthState(auth);
    const [userData, setuserData] = useState([]);
  
    const router = useRouter();
    const [title, setTitle] = useState([''])

    const [loading, setLoading] = useState(false);
    const [addCampaign, setaddCampaign] = useState(false);
    

    
    useEffect(() => {
      const getUser = async() => {
          if(user){
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setuserData(data);
                
            }
          }
          
      } 
  
      getUser();
    }, [user, loading]);

   
    const sidepress = (e) => {
        if (e.target.id === "buy-parent" ){
          setaddCampaign(false);
        }
     
        else{
          setaddCampaign(true)
        }
      }

    const handleCampaignAdd = async() => {

    }
  return (
    <>
      <Head>
      <title>hackTX</title>
        <meta name="description" content="create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/monument-extended" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&display=swap" rel="stylesheet" />

        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700&display=swap" rel="stylesheet" />

    </Head>
    <main className='main-dash-container'  >
    
        {user? <>
        
        
            <DASHNAV renderFunction={() => <>
        
                <div className='button-container float-right px-16 pt-2'>
                <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => sidepress(e)}>
                Add
                </button>
            </div>
            <section class="container px-4 mx-auto pt-14 ">
                <div class="flex flex-col">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-gray-800">
                                        
                                        <tr>
                                            <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div class="flex items-center gap-x-3">
                                                    <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                                                    <button class="flex items-center gap-x-2">
                                                        <span>Status</span>

                                                        <svg class="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </th>
                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Name
                                            </th>
                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                #
                                            </th>
                                            
                                            
                                            

                                            

                                            <th scope="col" class="relative py-3.5 px-4">
                                                <span class="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        

                                    
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                
            </section>
            {addCampaign? <>
            
            <div onClick={(e) => sidepress(e)}
                            id='buy-parent' className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className='dashboard-popup p-10 relative'>
                
                    <p>New Campaign</p>
                    <div>
                    <div class="mb-6 pt-2">
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        
                        <input type="text" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e)=>{setName(e.target.value)}} placeholder='Campaign title' />
                    </div>
                    <button onClick={handleCampaignAdd} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add
                    </button>
                    
                    </div>
                        
                  
                </div>
            </div>
            <div  className="bg-opacity-80 fixed inset-0 z-40 bg-black"></div>

            
            </> : <></>}
            
    
                </> }/> 
        </> : <>
        
        </>}
      
    </main>
  
  </>
 
  )
}
