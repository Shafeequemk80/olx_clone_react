import React, { useContext, useEffect, useState } from "react";

import "./View.css";
import { PostContext } from "../../store/PostContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FirebaseContext } from "../../store/Context";

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firestore } = useContext(FirebaseContext);

   useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userCollection = collection(firestore, 'users');
        const q = query(userCollection, where('id', '==', postDetails.userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
          console.log(doc.data());
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (postDetails && postDetails.userId) {
      fetchUserData();
    }
  }, [firestore, postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createAt}</span>
        </div>
        {userDetails&& <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
