import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { contentAPI } from '../../services/api';

export const fetchContentPerformance = createAsyncThunk(
  'content/fetchPerformance',
  async ({ platform, dateRange }) => {
    const response = await contentAPI.getPerformance({ platform, dateRange });
    return response.data;
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    performance: [],
    loading: false,
    error: null,
    filters: {
      platform: 'all',
      dateRange: [],
      contentType: 'all',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentPerformance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentPerformance.fulfilled, (state, action) => {
        state.loading = false;
        state.performance = action.payload;
      })
      .addCase(fetchContentPerformance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilters, clearError } = contentSlice.actions;
export default contentSlice.reducer;