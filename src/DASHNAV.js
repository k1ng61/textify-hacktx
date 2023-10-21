

import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

const DASHNAV = ({ renderFunction }) => {
   const router = useRouter();
   const [user] = useAuthState(auth)
 
  return (
    <div>
          
        
    <aside id="logo-sidebar" class="fixed top-0 left-0  rounded-xll w-64 h-screen  transition-transform -translate-x-full   sm:translate-x-0 " aria-label="Sidebar">
    
   <div class=" dashboard-left bg-white px-3 pb-4">
      <p className="text-sm text-gray-500">{user.email}</p>
      

      <ul class="space-y-2 pt-20 font-medium">
         <li onClick={() => router.push('/dashboard')}>
            <div className={router.asPath == '/dashboard'? "relative cursor-pointer p-2 text-gray-900 rounded-lg bg-red-400 group" : "relative cursor-pointer p-2 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group"}>
                    
                 <p className="icon-text">Home</p>
            </div>
         </li>
         
         <li onClick={() => router.push('/dashboard/campaigns')}>
            <div className={router.asPath == '/dashboard/campaigns'? "relative cursor-pointer p-2 text-gray-900 rounded-lg bg-red-400 group" : "relative cursor-pointer p-2 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group"} >
                         <p className="icon-text">Campaigns</p>

            </div>
         </li>
         
         <li onClick={() => router.push('/dashboard/settings')} >
            <div  className={router.asPath == '/dashboard/settings'? "relative cursor-pointer p-2 text-gray-900 rounded-lg bg-red-400 group" : "relative cursor-pointer p-2 text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700 group"}>
                            <p className="icon-text">Settings</p>

            </div>
         </li>
         
      </ul>
   </div>
</aside>

    <div class=" bg-white p-8 px-12 dashboard-right sm:ml-64">
    {renderFunction()}

    </div>
    </div>
  );
};
export default DASHNAV;