import React from 'react';
import {HashRouter} from 'react-router-dom';
import Routes from './routes';
// import {Provider} from 'react-redux';
// import './App.css';

function App() {
  return (
    <HashRouter>
    {Routes}
    </HashRouter>
  );
}

export default App;
