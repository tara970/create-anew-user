import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); 
  const { userDetails } = useContext(AppContext);


   useEffect(() => {

    const localUsersStr = localStorage.getItem("users");

    if (localUsersStr) {
      try {
        let localUsers = JSON.parse(localUsersStr);

        if (Array.isArray(localUsers)) {
          let updatedUser = [...localUsers];
          if (userDetails && !updatedUser.some(u => u.id === userDetails.id)) {
            updatedUser.push(userDetails);
          }

          setUsers(updatedUser);
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
  console.log("Fetching users from API...");

  axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      const serverUsers = response.data || [];
      console.log("Fetched users:", serverUsers);
      setUsers(serverUsers);
      localStorage.setItem("users", JSON.stringify(serverUsers));
    })
    .catch((error) => {
      console.error("Failed to fetch users from API:", error);
      setError("Error fetching users.");
    });
};



  if (error) {
    return <p>{error}</p>;
  }


  const handleDelete = (user) => {
    const filteredUsers = users.filter(u => u.id !== user.id);
    setUsers(filteredUsers);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
    const currentUser = JSON.parse(localStorage.getItem("userDetails"));
    if (currentUser && currentUser.id === user.id) {
      localStorage.removeItem("userDetails");
    }
  };


  const handleUpdate = (user) => {
    const updated = users.map(u =>
      u.id === user.id ? { ...u, email: "ztms@12356hgj.com" } : u
    );
    
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  return (
  <div className="container py-5">
    <div className="row">
      {users.filter(user => user != null).map(user => {
        const gender = user.id % 2 === 0 ? "male" : "female";
        const avatar = gender === "male"
          ? `https://randomuser.me/api/portraits/men/${user.id % 100}.jpg`
          : `https://randomuser.me/api/portraits/women/${user.id % 100}.jpg`;

        return (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={user.id}>
            <div className="card h-100 shadow-sm border-0" style={{ animation: "fadeInUp 0.6s" }}>
              <div className="card-body text-center">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="rounded-circle mb-3"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <Link to={`/user/${user.id}`} className="text-decoration-none">
                  <h5 className="card-title text-primary">{user.name}</h5>
                </Link>
                <p className="card-text">{user.email}</p>
              </div>
              <div className="card-footer bg-transparent border-0 d-flex justify-content-around">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(user)}
                >
                  حذف
                </button>
                <button
                  className="btn btn-outline-warning btn-sm"
                  onClick={() => handleUpdate(user)}
                >
                  ویرایش ایمیل
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

};
