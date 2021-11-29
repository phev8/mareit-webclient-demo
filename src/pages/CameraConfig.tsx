
import React from 'react';
import CameraControl from '../components/CameraControl';
import Navbar from '../components/Navbar';
import StreamController from '../components/StreamController';

interface CameraConfigProps {
}

const CameraConfig: React.FC<CameraConfigProps> = (props) => {
  return (
    <React.Fragment>
      <Navbar useBack={true} />
      <div className="container">
        <StreamController />
        <CameraControl />
      </div>
    </React.Fragment>
  );
};

export default CameraConfig;
