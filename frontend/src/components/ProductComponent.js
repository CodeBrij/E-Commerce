import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let products = await fetch("http://localhost:5000/products",{
      headers:{
        authorization: "bearer " + JSON.parse(localStorage.getItem("token"))
      }
    });
    products = await products.json();
    setProducts(products);
  };

  const handleDelete = async (id) => {
    console.log(`http://localhost:5000/product/${id}`);
    
    try {
        const response = await fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE',
          headers:{
          authorization: "bearer " + JSON.parse(localStorage.getItem("token"))
        } 
      });
        if (!response.ok) {
            throw new Error('Failed to delete the product');
        }
        console.log('Product deleted successfully');
        getProducts();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the product');
    }
};

const handleSearch = async (event) => {
  let key = event.target.value;
  if(key){
  let result = await fetch(`http://localhost:5000/search/${key}`,{
    headers:{
      authorization: "bearer " + JSON.parse(localStorage.getItem("token"))
    }
    });
  result = await result.json();

  if(result){
    setProducts(result);
  } 
 } else{
    getProducts();
  }
}

  return (
    <div className="product">
      <h1>Product List</h1>
      <input type="text" onChange={handleSearch} placeholder="Search..." />
      <ul className="list-products">
        <li>Sr. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>

      { products.length>0 ?
      products.map((item, index) => (
        <ul className="list-products">
          <li>{index}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>
            <button type="submit" onClick={()=>handleDelete(item._id)}>Delete</button>
            <Link to={"/update/"+item._id} >Update</Link>
          </li>
        </ul>
      )) : <h1>No product found...</h1>
      }
    </div>
  );
};

export default Products;
