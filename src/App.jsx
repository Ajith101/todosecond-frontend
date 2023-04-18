import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/Header";
import SinglePage from "./components/pages/SinglePage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<SinglePage />} />
        </Routes>{" "}
      </BrowserRouter>
    </>
  );
};

export default App;
