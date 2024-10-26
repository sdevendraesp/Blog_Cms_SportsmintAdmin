import React, { useContext, useEffect, useState } from "react";
import config from "../CoreFiles/config";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { UserContext } from "../Context/ToggleContext";
import { FaClipboardList, FaListUl } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { IoMdTrophy } from "react-icons/io";
import { MdAddToPhotos, MdOutlineNewspaper } from "react-icons/md";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbUsersGroup } from "react-icons/tb";

const Sidebar = (props) => {
  const [pageUrl, setPageUrl] = useState(window.location.href);
  const [activeTab, setActiveTab] = useState("");
  const { user } = useContext(UserContext);
  const [toggles, setToggles] = useState({});
  const loginData = useSelector((state) => state.auth.LoginDetails);

  useEffect(() => {
    // Update the active tab when the page URL changes
    setPageUrl(window.location.href);
    // Check the current URL to keep the submenu open and set the active link
    const urlParts = window.location.href.split("/");
    const currentSection = urlParts[urlParts.length - 1];

    switch (currentSection) {
      case "press":
        setToggles({ user: true });
        setActiveTab("press");
        break;

      case "blog":
        setToggles({ user: true });
        setActiveTab("blog");
        break;

      case "categories":
        setToggles({ user: true });
        setActiveTab("categories");
        break;


      // Add more cases as necessary
      default:
        break;
    }
  }, [window.location.href]);

  const togglefunc = (key) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [key]: !prevToggles[key], // Toggle the state for the corresponding submenu
    }));
  };

  const logout = async () => {
    Cookies.remove("loginSuccessMrMintAdmin");
    window.location.href = config.baseUrl;
    localStorage.clear();
    window.location.reload()
  };


  const [collapsed, setCollapsed] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width < 767) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [window.innerWidth])

  const sidebarCollapse = () => {
    if (collapsed) {
      document.body.classList.add("sidebar-collapse");
    }
  }

  useEffect(() => {
    if (collapsed) {
      document.body.classList.add("sidebar-collapse");
    }
  }, [])

  console.log("collapsed", collapsed);

  return (
    <>
      <aside className="main-sidebar">
        {/* sidebar*/}
        <section className="sidebar position-relative">
          <div className="multinav">
            <div className="multinav-scroll" style={{ height: "100%" }}>
              {/* sidebar menu*/}
              <ul className="sidebar-menu" id="sidebar-menu" data-widget="tree">
                <li className={toggles["cms"] ? "active menu-open" : ""}>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => togglefunc("cms")}
                  >
                    <img
                      src="./images/icons/cmsicon.png"
                      alt="logo"
                      height={24}
                      width={24}
                      loading="lazy"
                    />
                    &emsp;
                    <span>CMS Management </span>
                    <span className="pull-right-container">
                      <i className="fa fa-angle-right pull-right" />
                    </span>
                  </Link>
                  <ul
                    className="treeview-menu"
                    style={{ display: toggles["cms"] ? "block" : "none" }}
                  >
                    {loginData.role == 1 || loginData.role == 5 ? (
                      <>
                        {console.log("activeTab", activeTab)}
                        <li
                          className={
                            activeTab === "press" ? "active" : ""
                          }
                        >
                          <Link to={`${config.baseUrl}press`} onClick={() => { sidebarCollapse() }}>
                            {/* <img
                              src="./images/icons/terms-and-conditions.png"
                              alt="logo"
                              height={24}
                              width={24}
                              loading="lazy"
                            /> */}
                            <span style={{ color: 'white', fontSize: '24px' }}>
                              <MdOutlineNewspaper />
                            </span>
                            &emsp;
                            <span>Press</span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}

                    {loginData.role == 1 || loginData.role == 5 ? (
                      <>
                        {console.log("activeTab", activeTab)}
                        <li
                          className={
                            activeTab === "blog" ? "active" : ""
                          }
                        >
                          <Link to={`${config.baseUrl}blog`} onClick={() => { sidebarCollapse() }}>
                            {/* <img
                              src="./images/icons/terms-and-conditions.png"
                              alt="logo"
                              height={24}
                              width={24}
                              loading="lazy"
                            /> */}
                            <span style={{ color: 'white', fontSize: '24px' }}>
                              <MdOutlineNewspaper />
                            </span>
                            &emsp;
                            <span>Blog</span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}

                    {loginData.role == 1 || loginData.role == 5 ? (
                      <>
                        {console.log("activeTab", activeTab)}
                        <li
                          className={
                            activeTab === "categories" ? "active" : ""
                          }
                        >
                          <Link to={`${config.baseUrl}categories`} onClick={() => { sidebarCollapse() }}>
                            {/* <img
                              src="./images/icons/terms-and-conditions.png"
                              alt="logo"
                              height={24}
                              width={24}
                              loading="lazy"
                            /> */}
                            <span style={{ color: 'white', fontSize: '24px' }}>
                              <MdOutlineNewspaper />
                            </span>
                            &emsp;
                            <span>Categories</span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </aside>
    </>
  );
};

export default Sidebar;
