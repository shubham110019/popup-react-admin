import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Sidemenu from "./comonent/Sidemenu";
import "../../css/user/content.css";
import Topbar from "./comonent/Topbar";
import Campaignsidebar from "./comonent/Campaignsidebar";
import Popup from "./comonent/Popup";
import Campaignpop from "./comonent/Campaignpop";
import CampaignPreview from "./comonent/CampaignPreview";
import { useSelector } from 'react-redux';

const Campaigns = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [allpopup, setAllpopup] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCampaignId, setSelectedCampaignId] = useState(""); // New state to hold selected campaign ID

  // Get activeSiteId from Redux
  const activeSiteId = useSelector((state) => state.site.activeSiteId);

  const togglePopupCampaign = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      userApi(token);
    }
  }, [navigate]);

  // Re-trigger API call when activeSiteId changes
  useEffect(() => {
    if (userId && activeSiteId) {
      allpopupview(userId, activeSiteId);
    }
  }, [userId, activeSiteId]);

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const userApi = async (token) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:9000/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      if (data.user) {
        setUserId(data.user.userId);
        // setName(data.user.name);
        // setLastname(data.user.lastname);
        // setEmail(data.user.email);
      } else {
        setError("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user data. Please try again.");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const allpopupview = async (userId, activeSiteId) => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/modal-data/site/${userId}/${activeSiteId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
  
      console.log(data);
  
      if (Array.isArray(data)) {
        // Filter out popups where trash !== 0 OR archives is true
        const validPopups = data.filter(
          (popup) => popup.trash === 0 && popup.archives !== true
        );
  
        if (validPopups.length > 0) {
          setAllpopup(validPopups);
          setSelectedCampaignId(validPopups[0].popid); // Set default campaign ID to the first one
        } else {
          setAllpopup([]);
        }
      } else {
        setAllpopup([]);
      }
  
    } catch (error) {
      console.error("Error fetching popup data:", error);
    }
  };
  
  

  const handleCampaignClick = (id) => {
    setSelectedCampaignId(id); // Set the selected campaign ID when clicked
  };


  

  const handleCampaignAdded = (newCampaign) =>{
    setAllpopup([...allpopup, newCampaign])
    togglePopupCampaign()
  }

  return (
    <div>
      <div className="main__content">
        <Topbar />
        <div className="om-app-header campaign-header">
          <div className="left">
            <h2>Campaign Dashboard</h2>
          </div>
          <div className="right">
            <button onClick={togglePopupCampaign} className="btn btn-success">
              Create New Campaign
            </button>
          </div>
        </div>

        <Popup isOpen={isPopupOpen} closePopup={togglePopupCampaign}>
          <Campaignpop closePopup={togglePopupCampaign} onCampaignAdded={handleCampaignAdded}/>
        </Popup>

        <div className="campaign-dashboard-content">
          <Campaignsidebar />
          <div className="campaign-drawer-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {allpopup.length ? (
                  <>
                    <div className="campaign-dashboard-drawer">
                      <div className="dashboard-card">
                        {allpopup.map((data) => (
                          <div
                            key={data._id}
                            className={`drawer-campaign ${
                              selectedCampaignId === data.popid ? "active" : ""
                            }`}
                            onClick={() => handleCampaignClick(data.popid)}
                          >
                            <div className="campaign-flex-wrapper">
                              <div className="campaign-data-wrapper">
                                <div className="campaign-data">
                                  <div className="campaign-title">
                                    {data.campaignName}
                                  </div>

                                  <div className="campaign-type">
                                    {data.campaignType}
                                  </div>
                                </div>

                                <div className="campaign-actions">
                                  <div className="action"><Link to={`/campaigns/${data.popid}`}>Edit</Link></div>

                                  <div className="action status">
                                    {data.status}
                                  </div>
                                </div>
                              </div>

                              <div className="campaign-analytics-snapshot">
                                <span className="visitors">
                                  Visitors: <strong>0</strong>
                                </span>
                                <span className="leads">
                                  Conversions: <strong>0</strong>
                                </span>
                                <span className="conversion-rate">
                                  CR%: <strong>0</strong>
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="campaign-dashboard-campaigns">
                      <CampaignPreview campaignId={selectedCampaignId} userId={userId} />
                    </div>
                  </>
                ) : (
                  <div className="no-campaigns">
                    <h2>
                      There are currently no campaigns assigned to this site.
                    </h2>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
