import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../styles/signup.css"



const Signup: React.FC = () => {

    interface User {
        displayName : string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        reqruiter: boolean;
        company?: string;
    }
    
const [displayName, setDisplayName] = useState("");
const [reqruiter, setReqruiter] = useState(false);
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [company, setCompany] = useState("");

async function signup(event : React.FormEvent) {
event.preventDefault();
 if (password !== confirmPassword) {
    console.log("Passwords do not match")
     alert("Passwords do not match");
     return
 }
    const user: User = {
        displayName,
        firstName,
        lastName,
        email,
        password,
        reqruiter,
        company
    }

    try {
        console.log("signup")
        console.log(reqruiter)
        const response = await axios.post("http://localhost:5000/auth/signup", user);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

    
    return (
        <div>
        <h1>Signup</h1>
        <form className="signup-form" onSubmit={signup}>
        <input type="text" onChange={(e) => setDisplayName(e.target.value)} placeholder="Displayname" required className="signup-inputfields"/>
            <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required className="signup-inputfields"/>
            <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required className="signup-inputfields" />
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="signup-inputfields" />
            <div className="signup-checkboxContainer">
                <p>Are you a Reqruiter? </p>
            <input onClick={() => setReqruiter(reqruiter? false : true)} type="checkbox" className="signup-checkBox"  />
            {reqruiter && <input type="text" onChange={(e) => setCompany(e.target.value)} placeholder="Company" required className="signup-inputfields" />}
            </div>
            <input type="password"  onChange={(e) => setPassword(e.target.value)}  placeholder="Password" required className="signup-inputfields" />
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}placeholder="Confirm Password" required className="signup-inputfields" />
            <button type="submit"   className="signup-submitButton" >Sign Up</button>
        </form>
        <Link to="/login">Already have an account? Login here</Link>
        </div>

    );
    };

export default Signup;