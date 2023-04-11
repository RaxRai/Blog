import { useState, React, useContext } from "react";
import { LoginContext } from "../contexts/loginProvider";
import Login from "../login";
import Register from "../register";
import Blogs from "../blogs";
import Home from "../home";


function Layout() {

    const { text, setText } = useContext(LoginContext);

    switch(text.route) {
        case '/login':
            return (
                <div>
                    <Login />
                </div>
              );
        case '/register':
            return (
                <div>
                    <Register />
                </div>
              );
        case '/user':
            return (
                <div>
                    <Blogs />
                </div>
                );     
        default:
            return (
                <div>
                    <Home />
                </div>
              );
      }

}

export default Layout;