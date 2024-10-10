import React, { useState } from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
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

          </div>
        </div>
      </nav>
      </div>
    </>
  );
};

export default Topbar;
