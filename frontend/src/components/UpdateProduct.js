import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useState( async ()=>{
        console.log(params);
        
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: "bearer " + JSON.parse(localStorage.getItem("token"))
              }
        });
        result = await result.json();

        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    })

const updateProduct = async () => {
    let product = await fetch(`http://localhost:5000/product/${params.id}`, {
        method:"PUT",
        body: JSON.stringify({name, price, category, company}),
        headers:{
            "Content-Type":"application/json",
            "authorization":"bearer " + JSON.parse(localStorage.getItem("token"))
        }
    })
    if(product) {
        navigate("/");
    }
    product = await product.json();
    console.log(product);
}
    return(
        <div className="add">
            <h1>Update Product</h1>
            <input type="text" placeholder="Product Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <span className="error">{error && !name && <p>Enter valid name</p>}</span>
            <input type="text" placeholder="Product Price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            <span className="error">{error && !price && <p>Enter valid price</p>}</span>
            <input type="text" placeholder="Product Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
            <span className="error">{error && !category && <p>Enter valid category</p>}</span>
            <input type="text" placeholder="Product Company" value={company} onChange={(e)=>setCompany(e.target.value)}/>
            <span className="error">{error && !company && <p>Enter valid company</p>}</span>
            <button type="submit" onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;