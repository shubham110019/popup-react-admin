import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CampaignPreview = ({ userId, campaignId }) => {
  const [apidata, setApidata] = useState(null); // Initially set to null for proper loading behavior
  const [apicampaignId, setApicampaignId] = useState(campaignId); // Initialize with campaignId

  // Fetch the popup data
  const allpopupview = async (userId, campaignId) => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/modal-data/${userId}/${campaignId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response Data: ", data); // Debugging: Log the full response
        setApidata(data[0]); // Assuming the data comes back as an array and you want the first item
      } else {
        console.error("Error fetching data. Status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching popup data:", error);
    }
  };

  // Fetch data on initial render and when campaignId or userId changes
  useEffect(() => {
    if (userId && campaignId) {
      allpopupview(userId, campaignId);
    }
    setApicampaignId(campaignId); // Update the local state with the new campaignId
  }, [userId, campaignId]);


  const handleTrashPop = async (apicampaignId) => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/modal-data/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ popid: apicampaignId, trash: 1 }),
        }
      );
  
      if (response.ok) {
        const data = await response.json(); 
        // console.log("Popup moved to trash:", data);
      } else {
        // console.error("Error moving popup to trash. Status:", response.status);
      }
    } catch (error) {
      console.error("Error in handleTrashPop:", error);
    }
  };
  


  const handleArchivesPop = async (apicampaignId) =>{
    try {
      const response = await fetch(
        "http://localhost:9000/api/modal-data/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ popid: apicampaignId, archives: true }),
        }
      );
  
      if (response.ok) {
        const data = await response.json(); 
        // console.log("Popup moved to trash:", data);
      } else {
        // console.error("Error moving popup to trash. Status:", response.status);
      }
    } catch (error) {
      console.error("Error in handleTrashPop:", error);
    }
  }

  return (
    <>
      <div className="dashboard-card main-campaign-cards">
        {/* {apicampaignId} */}

        <div className="toolbar">
          <ul>
            <li><Link to={`/campaigns/${apicampaignId}`} className="btn btn-primary">Edit</Link></li>


            
            <li><button onClick={()=>handleArchivesPop(apicampaignId)} className="btn btn-primary">Archives</button></li>
            <li><button onClick={()=>handleTrashPop(apicampaignId)} className="btn btn-danger">Delete</button></li>
          </ul>
        </div>

        <div className="content">
          <div className="header_title">
            {/* Check if apidata is not null and render campaignName */}
            <h4>{apidata ? apidata.campaignName : "Loading..."}</h4>
          </div>

          <div className="sub-title">
            <span className="campaign-type">Campaign Type: {apidata ? apidata.campaignType : "Loading..."}</span>
            <span className="status">Status: {apidata ? apidata.status : "Loading..."}</span>
          </div>

<hr/>


<hr/>
          <div className="meta-data">
            <p>Campaign ID: <span>{apicampaignId}</span></p>

            <p>Site: <span>{apidata ? apidata.site : "Loading..."}</span></p>
            <p>Last edited on: <span>{apidata ? apidata.editdate : "Loading..."}</span></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignPreview;
