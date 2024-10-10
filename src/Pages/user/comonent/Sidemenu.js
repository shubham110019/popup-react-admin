import React from "react";
import '../../../css/user/sidemenu.css';
import { Link } from "react-router-dom";

const Sidemenu = (props) => {
  return (
    <>
      <nav class={`sidebar dark_sidebar ${props.menu ? 'mini_sidebar' : ''}`}>
        <div class="logo d-flex justify-content-between">
          <a class="large_logo" href="index.html">
           <h2>CVMaker</h2>
          </a>
          <a class="small_logo" href="index.html">
          <h2>CV</h2>
          </a>
          <div class="sidebar_close_icon d-lg-none">
            <i class="ti-close"></i>
          </div>
        </div>
        <ul id="sidebar_menu" class="metismenu">
          <li class="">
            <Link class="has-arrow" to="/profile" aria-expanded="false">
              <div class="nav_icon_small">
                <img
                  src="https://demo.dashboardpack.com/cryptocurrency-html/img/menu-icon/1.svg"
                  alt=""
                />
              </div>
              <div class="nav_title">
                <span>Dashboard </span>
              </div>
            </Link>

          </li>


          <li class="">
            <Link class="has-arrow" to="/campaigns-list" aria-expanded="false">
              <div class="nav_icon_small">
                <img
                  src="https://demo.dashboardpack.com/cryptocurrency-html/img/menu-icon/1.svg"
                  alt=""
                />
              </div>
              <div class="nav_title">
                <span>All Campaigns </span>
              </div>
            </Link>

          </li>

          <li class="">
            <Link class="has-arrow" to="/campaigns" aria-expanded="false">
              <div class="nav_icon_small">
                <img
                  src="https://demo.dashboardpack.com/cryptocurrency-html/img/menu-icon/1.svg"
                  alt=""
                />
              </div>
              <div class="nav_title">
                <span>Campaigns </span>
              </div>
            </Link>

          </li>

        </ul>
      </nav>
    </>
  );
};

export default Sidemenu;
