 import { AppContext } from "../App";
 import { useContext } from "react";
 
 
 export const Home = () =>
{
   const {username} = useContext(AppContext);
   
   return (<div>
        <h3>this is home page , user is :{username}</h3>
        <p>Hi Dear <h5 style={{color : "red"}}>{username}</h5></p>
        
    </div>)
}