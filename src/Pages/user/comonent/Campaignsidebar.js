import React, { useState, useEffect } from "react";
import '../../../css/user/sidemenu.css';
import { Link } from "react-router-dom";
import Popup from "./Popup";
import Addsite from "./Addsite";
import Cookies from "js-cookie";

const Campaignsidebar = (props) => {

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [WebsiteList, setWebsiteList] = useState([]);

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
            console.log(data);
          } else {
            console.error("website not find");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
    
      useEffect(() => {
        const usedId = Cookies.get("userId");
        usersiteApi(usedId);
      }, []);

    
  return (
    <>
    <div className="campaign-sidebar">
        <div className="sidebar-items">
            <div className="sidebar-section-title">
                <p className="site_name">Sites</p>

                <div className="websitelist">
                <ul>

{
WebsiteList.map((data)=>{
    return(
        <>
            <li>{data.sitename}</li>
        </>
    )
})

}

                </ul>
                </div>

                <div className="sidebar-create-item">
                <button onClick={togglePopup}>Add new site</button>



   
                    
                </div>
            </div>
        </div>
    </div>

    <Popup isOpen={isPopupOpen} closePopup={togglePopup}>
      <Addsite closePopup={togglePopup}/>
      </Popup>
    </>
  );
};

export default Campaignsidebar;
