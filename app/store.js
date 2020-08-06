import {configureStore} from '@reduxjs/toolkit';
import PictureReducer from '../features/pictures/PicturesSlice';

export default configureStore({
  reducer: {
    picture: PictureReducer,
  },
});
