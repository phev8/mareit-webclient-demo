import React from 'react';
import Navbar from '../components/Navbar';

interface SimpleActionsProps {
}

const SimpleActions: React.FC<SimpleActionsProps> = (props) => {
  return (
    <React.Fragment>
      <Navbar useBack={true} />
    </React.Fragment>
  );
};

export default SimpleActions;
