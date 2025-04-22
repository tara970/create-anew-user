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
    
    const {setUsername , setUserDetails} = useContext(AppContext);
    
    const navigate = useNavigate();
    
    const schema = yup.object().shape({
        first_name : yup.string().required(),
        last_name : yup.string().required(),
        email : yup.string().email().required()
    })

    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const onSubmit = (data) =>
    {
        const newUser = {
            id:Date.now(),
            first_name:data.first_name,
            last_name:data.last_namename,
            email:data.email,
            avatar:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
        };
        setUsername(newUser.first_name);
        setUserDetails(newUser);

        localStorage.setItem('userDetails',JSON.stringify(newUser));

        navigate("/users");
    }
    
    return (<>
   <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="First Name" {...register("first_name")} />
                    <p className="text-danger">{errors.first_name?.message}</p>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Last Name" {...register("last_name")} />
                    <p className="text-danger">{errors.last_name?.message}</p>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" {...register("email")} />
                    <p className="text-danger">{errors.email?.message}</p>
                </div>
                <button type="submit" className="btn btn-success">Login</button>
            </form>
        </div>
    
    </>)
    
}