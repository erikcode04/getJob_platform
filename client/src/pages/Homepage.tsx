import React, {useEffect} from "react";
import NavBar from "../components/Navbar";
import axios from "axios";


const Homepage : React.FC = () => {

    useEffect(() => {
      try{
        console.log("Sending request");
        const response = axios.get("http://localhost:5000/auth/authenticateToken", {
            withCredentials: true
        });        console.log(response);
        }
        catch(err){
            console.log(err);
        }
    }, []);



    return(
        <div>
            <NavBar />
            <h1>Homepage</h1>
        </div>
    )
}

export default Homepage;