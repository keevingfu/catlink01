import { createSlice } from '@reduxjs/toolkit';

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    kpis: {},
    insights: [],
    trends: [],
    predictions: [],
    loading: false,
    error: null,
  },
  reducers: {
    setKPIs: (state, action) => {
      state.kpis = action.payload;
    },
    setInsights: (state, action) => {
      state.insights = action.payload;
    },
    setTrends: (state, action) => {
      state.trends = action.payload;
    },
    setPredictions: (state, action) => {
      state.predictions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setKPIs, setInsights, setTrends, setPredictions, setLoading, setError } = analyticsSlice.actions;
export default analyticsSlice.reducer;