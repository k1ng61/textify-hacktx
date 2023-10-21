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

    const [loading, setLoading] = useState(false);
   
    

    
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
        
        asdfadfasdfere
    
     </> }/> 
        </> : <>
        
        </>}
      
    </main>
  
  </>
 
  )
}
