import React from "react";

import "../styles/connect.css"

import NavBar from "../components/Navbar";

const Connect: React.FC = () => {
  return (
    <div className="connect-Container">
      <NavBar/>
      <div className="connect-wrapUpContainer">
     <div className="connect-SignupContainer">
       
       <div className="connect-SignupContent">
          <h2>Sign Up</h2>
          <form className="connect-SignupForm">
            <input type="text" className="connect-SignupInput" placeholder="First Name" required/>
            <input type="text" className="connect-SignupInput" placeholder="Last Name" required/>
            <input type="email"className="connect-SignupInput" placeholder="Email" required/>
            <input type="password" className="connect-SignupInput" placeholder="Password" required/>
            <input type="password" className="connect-SignupInput" placeholder="Confirm Password" required/>
            <button type="submit">Sign Up</button>
          </form>

        </div>


     </div>
     <div className="connect-LoginContainer">
      <h2>Login</h2>
      <form className="connect-SignupForm">
        <input type="email" placeholder="Email" required/>
        <input type="password" placeholder="Password" required/>
        <button type="submit">Login</button>
      </form>
     </div>
     </div>
    </div>
  );
};

export default Connect;