import { configureStore } from '@reduxjs/toolkit';
import { setSelectedShow, setShows, showsSlice } from '../redux/showsSlice';

describe('Redux Slice Tests', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: showsSlice.reducer,
    });
  });

  it('should set the selected show', () => {
    const selectedShow = { id: 1, name: 'Test Show' };

    store.dispatch(setSelectedShow(selectedShow));

    const state = store.getState();

    expect(state.selectedShow).toEqual(selectedShow);
  });

  it('should set the shows in the state', () => {
    const shows = [{ id: 1, name: 'Show 1' }, { id: 2, name: 'Show 2' }];

    const action = setShows(shows);

    const newState = showsSlice.reducer(store.getState(), action);

    expect(newState.shows).toEqual(shows);
  });
});
