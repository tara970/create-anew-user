import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import axios from "axios";

export const Users = () =>
{
    const [users,setUsers] = useState([]);
    
    
    useEffect(
        ()=>
        {
           fetch('https://reqres.in/api/users').then((res) => res.json()).then((data) => {setUsers(data.data)})
        },[]) 


    return (
        <div key={users.id}>
        <button className="btn btn-info m-4" onClick={handelCreate}>CREATE</button>
        <div className="row">{users.map((user)=>{
            return(
                <div className="col-4 p-5 text-center" key={user.id}>
                    <img  src={user.avatar}  alt="" style={{borderRadius:'50%' , width:'50px' , height:'50px'}}/>
                    <Link to={`/user/${user.id}`}><h4>{user.first_name}   {user.last_name}</h4></Link> 
                    <h5>{user.email}</h5>
                    <div className="row">
                        <div className="col-6 text-center">
                            <button className="btn btn-danger btn-sm" onClick={()=>{handelDelete(user)}}>DELETE</button>
                        </div>
                        <div className="col-6 text-center">
                            <button className="btn btn-warning btn-sm" onClick={()=>{handelUpdate(user)}}>UPDATE</button>
                        </div>
                    </div>
                </div>
            ) 
        })}</div>
        </div>
    )

    async function handelCreate()  
    {
        const newuser = {
            first_name : 'tara',
            last_name : 'jush',
            email : 'tr@1234hjku.com',
            avatar : 'https://pouyaandish.com/wp-content/uploads/2021/08/Professional_Headshot_101.jpg'
        }
          
        try {

             const response = await fetch('https://reqres.in/api/users',{
              method : 'POST',
              headers :{
                'Content-Type' : 'application/json'
              },
              body : JSON.stringify(newuser),
             });
               
             if(response.ok)
             {
              const newUse = await response.json();
              setUsers([...users , newUse]);
             }else{
              console.log('error');
             }

        }catch(error){
            console.log(error);
        }
        
    }

    async function handelDelete(userId) 
    {
        const response = await fetch(`https://reqres.in/api/users${userId.id}`,{
          method : 'DELETE'
        });

        if(response.ok)
        {
          setUsers(users.filter(user => user.id !== userId.id))
        }

    }

    async function handelUpdate(userId) 
    {
       const newEmail = {  ...userId,
        email : "ztms@12356hgj.com",
           }

       try {
        const response = await fetch(`https://reqres.in/api/users/${userId.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEmail), // Make sure to structure the request body as an object
        });
    
        if (response.ok) {
          const updatedUser = await response.json();
          setUsers((prevusers)=>
            {
              return prevusers.map((user)=>
                {
                  return user.id === userId.id ? updatedUser : user;
                }
              )
            }
          )
        } else {
          console.error('Failed to update user');
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    
    }
       
               
     
} 
