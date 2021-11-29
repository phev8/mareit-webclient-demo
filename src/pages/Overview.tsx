import React from 'react';
import { Link } from 'react-router-dom';
import LogMessageComponent from '../components/LogMessageComponent';
import Navbar from '../components/Navbar';
import PermissionRequests from '../components/PermissionRequests';


interface OverviewProps {

}

const Overview: React.FC<OverviewProps> = (props) => {

  return (
    <React.Fragment>
      <Navbar />


      <div className="container">
        <h3 className="mt-4">
          Actions
        </h3>
        <Link className="btn btn-secondary w-100 my-2"
          to="/go-to"
        >Go To</Link>

        <Link className="btn btn-secondary w-100 my-2"
          to="/simple-actions"
        >Simple Action</Link>

        <Link className="btn btn-secondary w-100 my-2"
          to="/camera-config"
        >Stream/Camera Config</Link>

        <PermissionRequests />
        <LogMessageComponent />

      </div>
    </React.Fragment>
  );
};

export default Overview;
