import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
//import axios from "axios";

export const Users = () =>
{
    const [users,setUsers] = useState([]);
    const {userDetails} = useContext(AppContext);

    
    useEffect(() => {
      const localUsersStr = localStorage.getItem("users");
      if (localUsersStr) {
        try {
          let localUsers = JSON.parse(localUsersStr);
          if (Array.isArray(localUsers)) {
            // اگر یوزر لاگین شده وجود داشت، و هنوز توی لیست نبود
            if (userDetails) {
              const exists = localUsers.some(u => u.id === userDetails.id);
              if (!exists) {
                localUsers = [...localUsers, userDetails];
              }
            }
            setUsers(localUsers);
            localStorage.setItem("users", JSON.stringify(localUsers));
          } else {
            fetchUsersFromServer();
          }
        } catch (error) {
          console.error("Error parsing localStorage data", error);
          fetchUsersFromServer();
        }
      } else {
        fetchUsersFromServer();
      }
    }, [userDetails]);
    
  
  const fetchUsersFromServer = () => {
      fetch('https://reqres.in/api/users')
        .then((res) => res.json())
        .then((data) => {
          let serverUsers = data.data || [];
          if (userDetails) {
            serverUsers = [...serverUsers, userDetails];
          }
          setUsers(serverUsers);
          localStorage.setItem("users", JSON.stringify(serverUsers));
        });
  };
  
    


    return (
        <div className="row">{users.filter(user => user != null).map((user)=>{
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
       
    )

   

    function handelDelete(user) 
    {
        const deleteUser = users.filter(u => u.id !== user.id);
        setUsers(deleteUser);
        localStorage.setItem('users', JSON.stringify(deleteUser));
        
        const currentUser = JSON.parse(localStorage.getItem('userDetails'));
        if (currentUser && currentUser.id === user.id) {
          localStorage.removeItem('userDetails');
        }
    }
    

     function handelUpdate(userId) 
    {
       const updateUser = users.map((user) => {
         if(user.id === userId.id){
           return {...user , email: "ztms@12356hgj.com"};
         }
         return user;
       })
       setUsers(updateUser);
       localStorage.setItem('users',JSON.stringify(updateUser));

    }
       
               
     
} 
