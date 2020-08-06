import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {uid} from 'react-uid';

export const picturesLoaded = createAsyncThunk(
  'picture/picturesLoaded',
  async () => {
    console.log('fetching data...');
  },
);

const PictureSlice = createSlice({
  name: 'picture',
  initialState: [],
  reducers: {
    pictureAdded: (state, {payload}) => {
      payload.id = uid(payload);
      payload.title = `Muestra ${state.length + 1}`;
      state.push(payload);
    },
  },
});

export const {pictureAdded} = PictureSlice.actions;

export default PictureSlice.reducer;
