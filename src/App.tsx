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
    <BrowserRouter basename={process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL : undefined}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="overview" element={<Overview />} />
        <Route path="app-settings" element={<AppSettings />} />
        <Route path="go-to" element={<GoToCommands />} />
        <Route path="camera-config" element={<CameraConfig />} />
        <Route path="simple-actions" element={<SimpleActions />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Route not found</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
