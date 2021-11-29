import React from 'react';
import './App.css';
import Home from './pages/Home';
import Overview from './pages/Overview';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AppSettings from './pages/AppSettings';
import GoToCommands from './pages/GoToCommands';
import CameraConfig from './pages/CameraConfig';
import SimpleActions from './pages/SimpleActions';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="overview" element={<Overview />} />
        <Route path="app-settings" element={<AppSettings />} />
        <Route path="go-to" element={<GoToCommands />} />
        <Route path="camera-config" element={<CameraConfig />} />
        <Route path="simple-actions" element={<SimpleActions />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
