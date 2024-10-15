import React, { useState, useEffect } from "react";
import '../../../css/user/sidemenu.css';
import { Link } from "react-router-dom";
import Popup from "./Popup";
import Addsite from "./Addsite";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSiteId } from "../../../redux/slices/siteSlice";

const Campaignsidebar = (props) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [WebsiteList, setWebsiteList] = useState([]);
    const activeSiteId = useSelector((state) => state.site.activeSiteId);
    const dispatch = useDispatch();

    const togglePopup = () => {
      setIsPopupOpen(!isPopupOpen);
    };

    const usersiteApi = async (usedId) => {
        try {
          const response = await fetch(
            `http://localhost:9000/api/website/${usedId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    
          const data = await response.json();
    
          if (data) {
            setWebsiteList(data);
            if (data.length > 0) {
              dispatch(setActiveSiteId(data[0].siteId));
            }
          } else {
            console.error("website not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
    
      useEffect(() => {
        const usedId = Cookies.get("userId");
        usersiteApi(usedId);
      }, []);

    const handleSiteClick = (siteId) => {
      dispatch(setActiveSiteId(siteId));
    };

    // Callback to add the new site to the list
    const handleSiteAdded = (newSite) => {
      setWebsiteList([...WebsiteList, newSite]); // Add new site to WebsiteList
      togglePopup(); // Close the popup after adding
    };
    
  return (
    <>
    <div className="campaign-sidebar">
        <div className="sidebar-items">
            <div className="sidebar-section-title">
                <p className="site_name">Sites</p>

                <div className="websitelist">
                  <ul>
                    {WebsiteList.map((data) => {
                      return (
                        <li 
                          key={data.siteId} 
                          className={activeSiteId === data.siteId ? "active" : ""}
                        >
                          <Link 
                            to={`/campaigns/site/${data.siteId}`}
                            onClick={() => handleSiteClick(data.siteId)}
                          >
                            {data.sitename}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="sidebar-create-item">
                  <button onClick={togglePopup} className="btn btn-link">Add new site</button>
                </div>


                <p className="site_name"><Link to="/campaigns/folder/archives">Archives</Link></p>
                
                <p className="site_name">Trash</p>

            </div>
        </div>
    </div>

    <Popup isOpen={isPopupOpen} closePopup={togglePopup}>
      <Addsite closePopup={togglePopup} onSiteAdded={handleSiteAdded} />
    </Popup>
    </>
  );
};

export default Campaignsidebar;
