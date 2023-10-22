import Head from 'next/head'
import { Inter } from 'next/font/google'
import { db, auth } from '@/firebaseConfig'
import React, {useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Timestamp, collection, addDoc, query, onSnapshot,setDoc, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'


import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const provider = new GoogleAuthProvider();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user] = useAuthState(auth);
    const router = useRouter();

   
    

    const handleLogin = async() => {
        if (!email || !password ){
            alert('fill out both fields');
            return;
        }
        let dname = "No Name";
         
        try{
            await createUserWithEmailAndPassword(auth, email, password).then(() => {
                setDoc(doc(db, "Users", auth.currentUser.uid), {
                    userId: auth.currentUser.uid,
                    email: email,
                    createdAt: Timestamp.now().toDate(),
                  }).then(() => {
                    router.push('/dashboard')
                  })
                
                
               
            });
            
            
        } catch(error){
            alert(error);
        }
    }

    const signin = async() => {
        signInWithPopup(auth, provider)
        .then(async(result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
        
            const user = result.user;
    
            if (user.metadata.creationTime === user.metadata.lastSignInTime){
              // new user, add to db
              
              
    
                  await setDoc(doc(db, "Users", user.uid), {
                    name: user.displayName,
                    userId: user.uid,
                    email: user.email,
                    createdAt: Timestamp.now().toDate(),
                  })
                
                router.push('/dashboard');
            }else{
                router.push('/dashboard');

            }
            
    
    
        }).catch((error) => {
        
        alert(error.code);
       
      });
    
      }
  return (
    <>
      <Head>
        <title>Textify</title>
        <meta name="description" content="Mailchimp for SMS, powered by AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
      <div className='bg-red-600'>
      
                        {user? <></>: <>
                        
                        
                        <div className="flex items-center min-h-screen ">
                            <div
                                className="flex-1 h-full max-w-sm mx-auto bg-white rounded-lg shadow-xl"
                            >
                               
                                <div className="flex items-center justify-center p-6 sm:p-12 ">
                                    <div className="w-full">
                                    <h3 className="mb-4 text-xl font-bold text-red-600">Sign Up</h3>
        
                                    
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm"> Email </label>
                                        <input
                                        type="email"
                                        className="
                                            w-full
                                            px-4
                                            py-2
                                            text-sm
                                            border
                                            rounded-md
                                            focus:border-red-400
                                            focus:outline-none
                                            focus:ring-1
                                            focus:ring-red-600
                                        "
                                        placeholder="Email"
                                        onChange={(e) => {setEmail(e.target.value)}}
                                        />
                                        <div>
                                            <label></label>
                                            <input onChange={(e) => {setEmail(e.target.value)}}/>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm"> Password </label>
                                        <input
                                        className="
                                            w-full
                                            px-4
                                            py-2
                                            text-sm
                                            border
                                            rounded-md
                                            focus:border-red-400
                                            focus:outline-none
                                            focus:ring-1
                                            focus:ring-red-600
                                        "
                                        placeholder="password"
                                        type="password"
                                        onChange={(e) => {setPassword(e.target.value)}}
                                        />
                                    </div>
                                    <div className="flex justify-center">
                                        <button
                                        className="
                                            w-full
                                            py-2
                                            mt-4
                                            text-sm
                                            font-medium
                                            leading-5
                                            text-center text-white
                                            transition-colors
                                            duration-150
                                            bg-red-600
                                            border border-transparent
                                            rounded-2xl
                                            hover:bg-red-700
                                            focus:outline-none
                                        "
                                        onClick={handleLogin}
                                        >
                                        Signup
                                        </button>
                                    </div>
                                    <p className='text-center'>or</p>
                                    <div className="flex justify-center relative">
                                        <img className='google-si' src='https://firebasestorage.googleapis.com/v0/b/bimi-b478b.appspot.com/o/glogo.png?alt=media&token=770956bc-46f6-45fa-bd08-3fa6a7d7a070'/>
                                        <button
                                        className="
                                            w-full
                                            py-2

                                            text-sm
                                            font-medium
                                            leading-5
                                            text-center text-white
                                            transition-colors
                                            duration-150
                                            bg-gray-400
                                            border border-transparent
                                            rounded-2xl
                                            hover:bg-gray-700
                                            focus:outline-none
                                        "
                                        onClick={signin}
                                        >
                                            
                                        Continue with Google
                                        </button>
                                    </div>  
                                    <div className="mt-4 text-center">
                                        <p className="text-sm">
                                        Already have an account?&nbsp;
                                        <a href="/login" className="text-red-600 hover:underline">
                                            &nbsp;Login</a>
                                        </p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        
                        
                        
                        </>}
                
                    </div>
            
      </main>
    </>
  )
}
