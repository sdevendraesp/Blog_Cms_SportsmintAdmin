import "./App.css";
import React, { components, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import config from "./CoreFiles/config";
import { UserProvider } from "./Context/ToggleContext";
import LoginNew from "./Pages/LoginNew";
import Press from "./Pages/cms/Press";
import Blog from "./Pages/cms/Blog";
import Categories from "./Pages/cms/Categories";
import AddBlog from "./Pages/cms/AddBlog";

function App() {
  const loadingStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "24px",
    fontWeight: "bold",
    color: "inherit", // Change to your desired text color
    animation: "fade-in 2s linear infinite", // Add animation CSS
  };


  function myFunction(x) {
    if (x.matches) {
      document.body.classList.add("sidebar-collapse");
    } else {
      document.body.classList.remove("sidebar-collapse")
    }
  }
  var x = window.matchMedia("(max-width: 768px)")
  myFunction(x);
  x.addEventListener("change", function () {
    myFunction(x);
  });



  return (
    <BrowserRouter>
      <UserProvider>
        <div>
          <Routes>
            <Route path={`${config.baseUrl}`} element={<LoginNew />} />

            <Route
              path={`${config.baseUrl}press`}
              element={
                <Suspense
                  fallback={<div style={loadingStyles}>Loading...</div>}
                >
                  {" "}
                  <Press />{" "}
                </Suspense>
              }
            />

            <Route
              path={`${config.baseUrl}blog`}
              element={
                <Suspense
                  fallback={<div style={loadingStyles}>Loading...</div>}
                >
                  {" "}
                  <Blog />{" "}
                </Suspense>
              }
            />

            <Route
              path={`${config.baseUrl}categories`}
              element={
                <Suspense
                  fallback={<div style={loadingStyles}>Loading...</div>}
                >
                  {" "}
                  <Categories />{" "}
                </Suspense>
              }
            />

            <Route
              path={`${config.baseUrl}add-blog`}
              element={
                <Suspense
                  fallback={<div style={loadingStyles}>Loading...</div>}
                >
                  {" "}
                  <AddBlog />{" "}
                </Suspense>
              }
            />
          </Routes>

        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
