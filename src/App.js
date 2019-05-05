import React from 'react';
import {HashRouter} from 'react-router-dom';
import Routes from './routes';
import Navbar from './components/Navbar/Navbar';
import {Provider} from 'react-redux';
import store from './store';
// import './App.css';

function App() {
  return (
    <Provider store={store}>
    <HashRouter>
    <Navbar/>
    {Routes}
    </HashRouter>
    </Provider>
  );
}

export default App;
