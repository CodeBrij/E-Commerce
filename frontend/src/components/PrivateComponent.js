import React from "react";
import {Navigate, Outlet} from 'react-router-dom';

const PrivateComponent = () => {
    let auth = localStorage.getItem("user");
    return auth? <Outlet /> : <Navigate to={"/signup"}/>
}

export default PrivateComponent;

// It is for applying private property such that if 
// user is not logged in then which components to 
// hide and which to show
