import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Sidemenu from "./comonent/Sidemenu";
import "../../css/user/content.css";
import Topbar from "./comonent/Topbar";
import Campaignsidebar from "./comonent/Campaignsidebar";

const Campaigns = () => {
  const navigate = useNavigate();

  const [htmlfrm, setHtmlfrm] = useState("");  // For user input HTML
  const [html, setHtml] = useState("");        // Full HTML with #popid
  const [js, setJs] = useState("");
  const [css, setCss] = useState("");
  const [message, setMessage] = useState("");

  const [userId, setUserId] = useState("");
  const [popid, setPopid] = useState("");

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const [allpopup, setAllpopup] = useState([]);


  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      userApi(token);
    }
  }, [navigate]);

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const userApi = async (token) => {
    try {
      const response = await fetch("http://localhost:9000/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      if (data.user) {
        setUserId(data.user.userId);
        setName(data.user.name);
        setLastname(data.user.lastname);
        setEmail(data.user.email);

        // Fetch the allpopup data after userId is set
        allpopupview(data.user.userId);
      } else {
        console.error("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/login");
    }
  };

  const allpopupview = async (userId) => {
    try {
      const response = await fetch(`http://localhost:9000/api/modal-data/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Fetched popups:", data); // Log the data to check structure

      if (Array.isArray(data)) {
        setAllpopup(data); // Ensure data is an array
      } else {
        setAllpopup([]); // Fallback to an empty array if the response is not an array
      }
    } catch (error) {
      console.error("Error fetching popup data:", error);
    }
  };

  return (
    <div>
   

   <div className='main__content'>

<Topbar/>
         

        <div className="campaign-dashboard-content">


          
  <Campaignsidebar/>


  <div className="campaign-drawer-container">

    
            <div className="campaign-dashboard-drawer">

              <div className="dashboard-card">
              <h3>All Popups</h3>
              {
                (allpopup && Array.isArray(allpopup)) ? (
                  allpopup.map((data) => (
                    <div key={data._id}>
                      <p>Popup ID: {data.popid}</p>
                      {/* Add more fields if needed */}
                    </div>
                  ))
                ) : (
                  <p>No popups available</p>
                )
              }
              </div>
            </div>
            <div className="campaign-dashboard-campaigns">
            <div className="dashboard-card">
              <h3>Preview Popup</h3>
              {/* You can add popup preview logic here */}
              </div>
            </div>
       
        </div>

        </div>

</div>
</div>
  );
};

export default Campaigns;
