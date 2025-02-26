import React from "react";
import NavBar from "../components/Navbar"
import "../styles/login.css"
import LoginBox from "../components/LoginBox"
import image from "../assets/pexels-aliaksandra-babko-2148943026-30453693.jpg"
const Login : React.FC = () => {


    return(
        <div>
            <NavBar/>
            <div className="login-wrapUpContainer">
            <div className="login-ImgContainer"> 
       <img src={image} alt="login-img" className="login-image"/>
         </div>
         <div className="login-loginSideContainer"> 
         <LoginBox/>
         </div>
         </div>
        </div>
    )
}


export default Login;