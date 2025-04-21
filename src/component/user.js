import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

export const User = () =>
{
  
   const {id} = useParams();

   const [user,setUser] = useState(null);
   
   
   useEffect(()=>
    {
       fetch(`https://reqres.in/api/users/${id}`).then((res)=> res.json()).then((data)=>{setUser(data.data)})
    },[id])

    return (<div>
               {user? (<div>
                  <img src={user?.avatar}  alt="" style={{borderRadius:'50%' , width:'70px' , height:'70px'}}/>
                <h2>{user?.first_name}   {user?.last_name}</h2> 
                <h3>{user?.email}</h3>
               </div>) : (
                  <p>Loading user details...</p>
               )}
      
    </div>)
}
