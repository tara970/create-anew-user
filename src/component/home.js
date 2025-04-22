 import { AppContext } from "../App";
 import { useContext } from "react";
 
 
 export const Home = () =>
{
   const {username , setUsername} = useContext(AppContext);
   
   return (
    <div className="text-center mt-5">
      <div className="card p-5 shadow-sm">
        <h1 className="mb-4 text-primary">Welcome {username ? username : "Guest"}!</h1>
        {username ? (
          <p className="lead">
            Hi Dear <span className="text-danger fw-bold">{username}</span>
          </p>
        ) : (
          <p className="lead">Please login to enjoy more features!</p>
        )}
      </div>
    </div>
   )
}