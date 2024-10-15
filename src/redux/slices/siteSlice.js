import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  activeSiteId: null,  // The selected siteId
  activeUserId: null,        // The userId
};

// Create a slice for the active site and userId
const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setActiveSiteId: (state, action) => {
      state.activeSiteId = action.payload; // Set the active site ID
    },
    setActiveUserId: (state, action) => {
      state.activeUserId = action.payload; // Set the user ID
    },
  },
});

// Export the actions
export const { setActiveSiteId, setActiveUserId } = siteSlice.actions;
export default siteSlice.reducer;
