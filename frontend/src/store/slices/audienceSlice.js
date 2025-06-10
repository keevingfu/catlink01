import { createSlice } from '@reduxjs/toolkit';

const audienceSlice = createSlice({
  name: 'audience',
  initialState: {
    personas: [],
    sentimentData: [],
    affinityData: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPersonas: (state, action) => {
      state.personas = action.payload;
    },
    setSentimentData: (state, action) => {
      state.sentimentData = action.payload;
    },
    setAffinityData: (state, action) => {
      state.affinityData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPersonas, setSentimentData, setAffinityData, setLoading, setError } = audienceSlice.actions;
export default audienceSlice.reducer;