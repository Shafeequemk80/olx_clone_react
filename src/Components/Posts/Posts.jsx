import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import {PostContext} from '../../store/PostContext'
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const {firestore}= useContext(FirebaseContext)
  const [products, setProducts]= useState([])
  const{setPostDetails} = useContext(PostContext)
  const navigate= useNavigate()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, "products");
        const snapshot = await getDocs(productsCollection);
        const allPost = snapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id
        }));
        setProducts(allPost);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, [firestore]); // Make sure to include dependencies
  
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {products.map(product=>{
        return   <div
        className="card"
        onClick={()=>{setPostDetails(product); navigate('/viewpost')}}
      >
        <div className="favorite">
          <Heart></Heart>
        </div>
        <div className="image">
          <img src={product.url} alt="" />
        </div>
        <div className="content">
          <h4 className="rate">&#x20B9; {product.price}</h4>
          <h6 className="kilometer">{product.category}</h6>
          <h6 className="name"> {product.name}</h6>
          <p className=""> {product.place}</p>
        </div>
        <div className="date">
          <span>{product.createAt}</span>
        </div>
      </div>
        })}
        
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards" >
        {[...products].reverse().map(product=>{
        return   <div
        className="card"
        onClick={()=>{setPostDetails(product); navigate('/viewpost')}}
      >
        <div className="favorite">
          <Heart></Heart>
        </div>
        <div className="image">
          <img src={product.url} alt="" />
        </div>
        <div className="content">
          <h4 className="rate">&#x20B9; {product.price}</h4>
          <h6 className="kilometer">{product.category}</h6>
          <h6 className="name"> {product.name}</h6>
          <p className=""> {product.place}</p>
        </div>
        <div className="date">
          <span>{product.createAt}</span>
        </div>
      </div>
        })}
        
        </div>
      </div>
    </div>
  );
}

export default Posts;
