import React, { useContext, useRef, useState } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { authContext } from "../../store/Context";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Header() {

  const { user } = useContext(authContext);
  const navigate = useNavigate();
const [showLogout,setshowLogout]=useState(false)
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("User signed out successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSell = () => {
    user ? navigate("/create") : navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        
        <div className="loginPage">
          {user ? (
            <span
              className="tooltipContainer"
             
            >
              <span
              onMouseEnter={()=>{setshowLogout(true)}}
              onMouseLeave={()=>{setTimeout(() => {
                setshowLogout(false)
              }, 2000);}}
            
              className="displayName">{user.displayName}</span>
              
            </span>
          ) : (
            <span onClick={handleLogin}> Login</span>
          )}
          <hr />
          
        
          
          
        </div>
        {showLogout?
      <button  className="logout" onClick={handleLogout}>Logout</button>:''
        }
        
        <div onClick={handleSell} className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
        
      </div>
    </div>
    
  );
}

export default Header;
