import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import audienceReducer from './slices/audienceSlice';
import campaignReducer from './slices/campaignSlice';
import analyticsReducer from './slices/analyticsSlice';

export default configureStore({
  reducer: {
    content: contentReducer,
    audience: audienceReducer,
    campaign: campaignReducer,
    analytics: analyticsReducer,
  },
});