import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './components/Main';
import Details from './components/Details';
import NavBar from './components/NavBar';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      {' '}
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
