import React, { useState } from "react";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
const addProduct = async () => {

    //return false - fn just executes till return false and then returns 

    if(!name || !price || !category || !company){
        setError(true);
        return false;
    }
    console.log(name, price, category, company);
    let user = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch('http://localhost:5000/add',{
        method:"post",
        body:JSON.stringify({name, price, category, user, company}),
        headers:{
            "Content-Type":"application/json",
            "authorization":JSON.parse(localStorage.getItem("token"))
        }
    })
    result = await result.json();
    console.log(result);
    setName("");
    setCategory("");
    setPrice("");
    setCompany("");
}
    return(
        <div className="add">
            <h1>Add Product</h1>
            <input type="text" placeholder="Product Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <span className="error">{error && !name && <p>Enter valid name</p>}</span>
            <input type="text" placeholder="Product Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <span className="error">{error && !price && <p>Enter valid price</p>}</span>
            <input type="text" placeholder="Product Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
            <span className="error">{error && !category && <p>Enter valid category</p>}</span>
            <input type="text" placeholder="Product Company" value={company} onChange={(e)=>setCompany(e.target.value)}/>
            <span className="error">{error && !company && <p>Enter valid company</p>}</span>
            <button type="submit" onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;