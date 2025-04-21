import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../component/login.css";
//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";

export const Login = () =>
{
    
    const {setUsername} = useContext(AppContext);
    
    const navigate = useNavigate();
    
    const schema = yup.object().shape({
        name : yup.string().required(),
        phoneNumber : yup.number().integer().required(),
        email : yup.string().email().required()
    })

    const {register , handleSubmit} = useForm({
        resolver : yupResolver(schema)
    });

     //const [btn,setBtn] = useState("");

    
    const onSubmit = (data) =>
    {
        const message = data.name;
        setUsername(message);
        navigate("/");
    }
    
    return (<>
    <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="name" {...register("name")}/>
        <input type="text" placeholder="phone number" {...register("phoneNumber")}/>
        <input type="text" placeholder="email" {...register("email")}/>
        <button type="submit" >Login</button>
    </form>
    
    </>)
    
}