import React, { useEffect } from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
const Signup = () => {
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();
    const collectData = async () => {
        console.log(name + email + password);
        let result = await fetch('http://localhost:5000/register', {
            method:"post",
            body:JSON.stringify({name, email, password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json();
        console.log(result);
         if(result){
            navigate('/')
            localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.auth));
         } 
    }

    useEffect(()=>{
        let auth = localStorage.getItem("user");
        if(auth){
            navigate('/')
        }
    },[])
    return(
        <div className="signup">
            <h1>Register</h1>
            <input type="text" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

            <button type="button" className="signupBtn" onClick={collectData}>SignUp</button>
        </div>
    )
}

export default Signup;