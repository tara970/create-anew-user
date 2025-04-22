import { useState,useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";

export const User = () =>
{
  
   const {id} = useParams();
   const [user,setUser] = useState(null);
   const [error,setError] = useState(false);
   const {userDetails} = useContext(AppContext);
   
   useEffect(() => {
      if (userDetails && String(userDetails.id) === String(id)) {
        setUser(userDetails); // اگه یوزر لاگین شده بود
      } else {
        fetch(`https://reqres.in/api/users/${id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error('User not found');
            }
            return res.json();
          })
          .then((data) => {
            if (data && data.data) {
              setUser(data.data);
            } else {
              setError(true);
            }
          })
          .catch(() => {
            setError(true);
          });
      }
    }, [id, userDetails]);
  
    if (error) {
      return <p>User not found.</p>;
    }
    

    return (
      <div className="container mt-5">
      {user ? (
        <div className="card mx-auto" style={{ maxWidth: '400px' }}>
          <div className="card-body text-center">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="rounded-circle mb-3"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <h3 className="card-title">{user.first_name} {user.last_name}</h3>
            <p className="card-text">{user.email}</p>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading user details...</p>
        </div>
      )}
    </div>
    )
}
