import {useDispatch} from 'react-redux';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-uuid';

export const picturesLoaded = createAsyncThunk(
  'picture/picturesLoaded',
  async () => {
    try {
      const pictures = JSON.parse(await AsyncStorage.getItem('@pictures'));
      if (pictures === null) return [];
      return pictures;
    } catch (e) {
      console.error('ERROR', pictures);
    }
  },
);

export const picturesSaved = createAsyncThunk(
  'picture/picturesSaved',
  async (pictures) => {
    try {
      await AsyncStorage.setItem('@pictures', JSON.stringify(pictures));
    } catch (e) {
      console.error(e);
    }
  },
);

const PictureSlice = createSlice({
  name: 'picture',
  initialState: [],
  reducers: {
    pictureAdded: (state, {payload}) => {
      payload.id = uuid();
      payload.title = `Muestra ${state.length + 1}`;
      state.push(payload);
    },
  },
  extraReducers: {
    [picturesLoaded.fulfilled]: (state, {payload}) => {
      return payload;
    },
  },
});

export const {pictureAdded} = PictureSlice.actions;

export default PictureSlice.reducer;
