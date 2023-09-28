// import { useState } from 'react'
import "./stylesheets/App.scss";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import {Routes, Route} from "react-router-dom"
import AccountOptions from "./components/account-options/AccountOptions";

const App = () => {
  return (
    <>
      <h1 style={{textAlign: "center", fontSize: "3rem", marginTop: "1rem"}}>Prep App</h1>
      <Routes>
        <Route index path="/" element={<AccountOptions />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Signin />}/>
      </Routes>
    </>
  );
};

export default App;
