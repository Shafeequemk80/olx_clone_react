import React, { Fragment, useContext, useRef, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, authContext } from "../../store/Context";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


import { ToastContainer, toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Create = () => {
  const [name, setName] = useState(null);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(null);
  const [place, setPlace] = useState(null);
  const [image, setImage] = useState(null);

  const success = (error) => toast.success(error, {
    position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark"
    });

  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const priceRef = useRef(null);
  const placeRef = useRef(null);

  const { firestore } = useContext(FirebaseContext);
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const storage = getStorage();
    const storageRef = ref(storage, `/images/${image.name}`);
    const currentDate = new Date().toDateString();
    try {
      const snapshot = await uploadBytes(storageRef, image);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      const productsCollection = collection(firestore, "products");
      const obj = {
        name,
        category,
        price,
        place,
        url: downloadUrl,
        userId: user.uid,
        createAt: currentDate,
      };
      let succ = await addDoc(productsCollection, obj);

      if (succ) {
        success("Item Added successfully")
     setTimeout(() => {
      navigate("/");
     }, 2000);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const validateName = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      e.target.style.borderColor = "red";
      nameRef.current.style.opacity = 1;
    } else {
      e.target.style.borderColor = "";
      nameRef.current.style.opacity = 0;
    }
    setName(value);
  };
  const validateCategory = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      e.target.style.borderColor = "red";
      categoryRef.current.style.opacity = 1;
    } else {
      e.target.style.borderColor = "";
      categoryRef.current.style.opacity = 0;
    }
    setCategory(value);
  };
  const validatePrice = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      e.target.style.borderColor = "red";
      priceRef.current.style.opacity = 1;
    } else {
      e.target.style.borderColor = "";
      priceRef.current.style.opacity = 0;
    }
    setPrice(value);
  };
  const validatePlace = (e) => {
    const value = e.target.value.trim();
    if (value === "") {
      e.target.style.borderColor = "red";
      placeRef.current.style.opacity = 1;
    } else {
      e.target.style.borderColor = "";
      placeRef.current.style.opacity = 0;
    }
    setPlace(value);
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <h3>Create post</h3>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onFocus={validateName}
            onChange={validateName}
            id="fname"
            name="Name"
          />

          <div>
            <small ref={nameRef} style={{ color: "red", opacity: 0 }}>
              Enter valid name
            </small>
          </div>
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={category}
            onFocus={validateCategory}
            onChange={validateCategory}
            name="category"
            defaultValue="John"
          />
          <div>
            <small ref={categoryRef} style={{ color: "red", opacity: 0 }}>
              Enter valid category
            </small>
          </div>

          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            value={price}
            onFocus={validatePrice}
            onChange={validatePrice}
            type="number"
            id="fname"
            name="Price"
          />
          <div>
            <small ref={priceRef} style={{ color: "red", opacity: 0 }}>
              Enter valid Price
            </small>
          </div>
          <label htmlFor="fname">Place</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            onFocus={validatePlace}
            onChange={validatePlace}
            name="place"
          />
          <div>
            <small ref={placeRef} style={{ color: "red", opacity: 0 }}>
              Enter valid place
            </small>
          </div>

          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={
              image
                ? URL.createObjectURL(image)
                : "https://st3.depositphotos.com/17828278/33150/v/450/depositphotos_331503262-stock-illustration-no-image-vector-symbol-missing.jpg"
            }
          ></img>

          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
        <ToastContainer/>
      </card>
    </Fragment>
  );
};

export default Create;
