import { createSlice } from '@reduxjs/toolkit';

const campaignSlice = createSlice({
  name: 'campaign',
  initialState: {
    campaigns: [],
    activeCampaign: null,
    performance: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCampaigns: (state, action) => {
      state.campaigns = action.payload;
    },
    setActiveCampaign: (state, action) => {
      state.activeCampaign = action.payload;
    },
    setPerformance: (state, action) => {
      state.performance = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCampaigns, setActiveCampaign, setPerformance, setLoading, setError } = campaignSlice.actions;
export default campaignSlice.reducer;