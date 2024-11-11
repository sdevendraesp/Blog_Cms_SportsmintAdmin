import React, { Component, useContext, useEffect, useState } from "react";

import config from "../CoreFiles/config";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../Context/ToggleContext";
import { useSelector } from "react-redux";
import { HiBars3 } from "react-icons/hi2";
import { Dropdown } from "react-bootstrap";




const Header = () => {
  const { setcustomTheme } = useContext(UserContext);
  const loginData = useSelector((state) => state.auth.LoginDetails);

  const [toggle1, settoggle1] = useState(false);
  const toggleFunc1 = () => {
    settoggle1(!toggle1);
  };

  useEffect(() => { }, []);

  const toggleFunc = () => {
    const hasSidebarCollapse = document.body.className.includes("sidebar-collapse");
    console.log(document.body.className);
    if (hasSidebarCollapse) {
      // Remove "sidebar-collapse" if it exists
      document.body.className = document.body.className.replace(
        "sidebar-collapse",
        ""
      );
    } else {
      // Add "sidebar-collapse" if it doesn't exist
      document.body.classList.add("sidebar-collapse");
    }
  };

  const toggleFunctheme = () => {
    const hasSidebarCollapse = document.body.className.includes("dark-skin");
    const hasSidebarCollapse1 = document.body.className.includes("light-skin");

    console.log(document.body.className);
    if (hasSidebarCollapse) {
      document.body.className = document.body.className.replace(
        "dark-skin",
        "light-skin"
      );
      setcustomTheme(false);
    }
    if (hasSidebarCollapse1) {
      document.body.className = document.body.className.replace(
        "light-skin",
        "dark-skin"
      );
      setcustomTheme(true);
    }
  };

  if (!loginData.id || loginData.id == "") {
    window.location.href = `${config.baseUrl}`;
  }

  useEffect(() => {
    // toggleFunc();
  });

  const logout = async () => {
    Cookies.remove("loginSuccessMrMintAdminCms");
    window.location.href = config.baseUrl;
    localStorage.clear();
    window.location.reload()
  };

  return (
    <>
      <header className="main-header">
        <div className="d-flex align-items-center logo-box justify-content-start">
          {/* Logo */}
          <a className="logo d-none d-md-block">
            {/* logo*/}
            <div className="logo-mini w-50">
              <span className="light-logo">
                <img src="./images/favicon.png" alt="logo" loading="lazy" />
              </span>
              <span className="dark-logo">
                <img src="./images/favicon.png" alt="logo" loading="lazy" />
              </span>
            </div>
            <div className="logo-lg px-4">
              <span className="light-logo">
                <img src="./images/logo.svg" alt="logo" loading="lazy" />
              </span>
              <span className="dark-logo">
                <img src="./images/logo.svg" alt="logo" loading="lazy" />
              </span>
            </div>
          </a>
        </div>
        {/* Header Navbar */}
        <nav className="navbar navbar-static-top">
          {/* Sidebar toggle button*/}
          <div className="app-menu">
            <ul className="header-megamenu nav">
              <li className="btn-group nav-item">
                <a
                  className="waves-effect waves-light nav-link push-btn btn-primary-light"
                  data-toggle="push-menu"
                  role="button"
                  onClick={toggleFunc}
                >
                  {/* <i data-feather="align-left" /> */}
                  < HiBars3 />
                </a>
              </li>
              {/* <li className="btn-group nav-item">
                <a
                  className="waves-effect waves-light nav-link push-btn btn-primary-light"
                  data-toggle="push-menu"
                  role="button"
                  onClick={toggleFunctheme}
                >
                  <i data-feather="sun" />
                </a>
              </li> */}
            </ul>
          </div>
          <div className="navbar-custom-menu r-side">
            <ul className="nav navbar-nav">
              {/* User Account*/}
              <li className="dropdown user user-menu">
                <a
                  className={
                    toggle1
                      ? "d-flex align-items-center h-100 dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow show"
                      : "d-flex align-items-center h-100 dropdown-toggle w-auto l-h-12 bg-transparent py-0 no-shadow"
                  } style={{ textDecoration: "none" }}
                  title="User"
                  onClick={toggleFunc1}
                >
                  <div className="d-flex align-items-center">
                    <div className="text-end me-10 mt-2">
                      <p className="fs-4 mb-2 fw-700 text-primary">
                        {loginData.username}
                      </p>
                      <small className="fs-6 mb-0 text-uppercase text-mute">
                        Admin
                      </small>
                    </div>

                    <Dropdown>
                      <Dropdown.Toggle className="p-0" style={{ background: 'transparent' }} id="dropdown-basic">
                        <img
                          src="./images/avatar/avatar-1.png"
                          className="avatar rounded-10 bg-primary-light img-fluid"
                          alt=""
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="py-0">
                        <Dropdown.Item onClick={logout} className="text-center py-2">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                  </div>
                </a>
                {/* <ul
                  className={
                    toggle1
                      ? "dropdown-menu animated flipInX show"
                      : "dropdown-menu animated flipInX"
                  }
                >
                  <li className="user-body">
                    <a
                      className="dropdown-item"
                      href="javascript:;"
                      onClick={logout}
                    >
                      <i className="ti-lock text-muted me-2" /> Logout
                    </a>
                  </li>
                </ul> */}
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Header;
