import React from 'react';
import Navbar from '../components/Navbar';

interface CameraConfigProps {
}

const CameraConfig: React.FC<CameraConfigProps> = (props) => {
  return (
    <React.Fragment>
      <Navbar useBack={true} />
    </React.Fragment>
  );
};

export default CameraConfig;
