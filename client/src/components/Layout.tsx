import React from "react";
import NavBar from "./Navbar";
import { Outlet } from 'react-router-dom';


const Layout: React.FC = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}

export default Layout;