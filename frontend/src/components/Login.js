import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async() => {
        console.log(email,password);
        let user = await fetch("http://localhost:5000/login", {
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        user = await user.json();
        console.log(user);
        
        if(user.auth){
            localStorage.setItem("user", JSON.stringify(user.user));
            localStorage.setItem("token", JSON.stringify(user.auth));
            navigate("/");
        } else{
            alert("Enter correct details");
        }
    }

    useEffect(()=>{
        let auth = localStorage.getItem("user");
        if(auth){
            navigate("/");
        } 
    }, [])

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit" onClick={handleLogin} >Login</button>
        </div>
    )
}

export default Login;