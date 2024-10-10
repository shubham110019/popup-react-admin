import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Topbar = () => {

 
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    navigate("/login");
  };



  return (
    <>
      <div className="header">
        <nav class="navbar navbar-expand-lg navbarBg">
          <Link class="navbar-brand" to="/dashboard">
            PopUp
          </Link>
          <button class="navbar-toggler" type="button">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto">
              <Link class="nav-item nav-link" to="/dashboard">
                Home
              </Link>
              <Link class="nav-item nav-link" to="/campaigns">
                Campaigns
              </Link>

              <Link class="nav-item nav-link" to="/createpopup">
                Create New Campaign
              </Link>

              <button onClick={logout} className="nav-item nav-link">
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Topbar;
