import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Member } from "./pages/member";
import {FormLogin} from "./pages/formLogin"
import Logout from "./pages/logout";
import FormSignup from "./pages/formSignup";
import Signup from "./pages/signup";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Member />} path="/member/:theid" />
                        <Route path="/login" element={<FormLogin />} />
                        <Route element= {<Logout/>} path= "/logout" />
                        <Route element={<FormSignup />} path="/signup" />
                        <Route element={<Signup/>} path="/private" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
