import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Details from '../components/Details';

test('renders Details component snapshot', () => {
  const { container } = render(
    <Provider store={store}>
      {' '}
      {}
      <Details />
    </Provider>,
  );
  expect(container.innerHTML).toMatchSnapshot();
});
