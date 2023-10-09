// showsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  shows: [],
  genres: [],
  selectedGenre: '',
  selectedShow: null,
  error: null,
};

export const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    setSelectedShow: (state, action) => {
      state.selectedShow = action.payload;
      state.error = null;
    },
    setShows: (state, action) => {
      state.shows = action.payload;
      state.error = null;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
      state.error = null;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedShow, setShows, setGenres, setSelectedGenre, setError,
} = showsSlice.actions;

export const fetchShow = createAsyncThunk('shows/fetchShow', async (id, { dispatch }) => {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
    const data = await response.json();
    dispatch(setSelectedShow(data));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the show data.'));
  }
});

export const fetchShows = createAsyncThunk('shows/fetchShows', async (_, { dispatch }) => {
  try {
    const response = await fetch('https://api.tvmaze.com/shows');
    const data = await response.json();
    dispatch(setShows(data));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the shows data.'));
  }
});

export const fetchGenres = createAsyncThunk('shows/fetchGenres', async (_, { dispatch }) => {
  try {
    const response = await fetch('https://api.tvmaze.com/shows');
    const data = await response.json();
    const genres = data.map((show) => show.genres).flat();
    const uniqueGenres = [...new Set(genres)];
    dispatch(setGenres(uniqueGenres));
  } catch (error) {
    dispatch(setError('An error occurred while fetching the genres data.'));
  }
});

export default showsSlice.reducer;
