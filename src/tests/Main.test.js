import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import store from '../redux/store';

import Main from '../components/Main';

import '@testing-library/jest-dom/extend-expect';

test('Main Component renders without crashing', () => {
  render(
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>,
  );

  expect(screen.getByText('Shows List')).toBeInTheDocument();

  expect(screen.getByText('Categories')).toBeInTheDocument();

  expect(screen.getByText('All')).toBeInTheDocument();
});
