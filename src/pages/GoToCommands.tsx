import React from 'react';
import Navbar from '../components/Navbar';

interface GoToCommandsProps {
}

const GoToCommands: React.FC<GoToCommandsProps> = (props) => {
  return (
    <React.Fragment>
      <Navbar useBack={true} />
    </React.Fragment>
  );
};

export default GoToCommands;
