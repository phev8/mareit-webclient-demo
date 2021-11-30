import React, { useEffect, useState } from 'react';
import { Nav, Navbar as BsNavbar } from 'react-bootstrap';
import SettingsIcon from '@material-ui/icons/Settings';
import BackspaceIcon from '@material-ui/icons/CloseRounded';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { getRobotStateReq } from '../api/roboter';
import clsx from 'clsx';


interface NavbarProps {
  useBack?: boolean;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const selectedRobot = useAppSelector((state) => state.robot.selectedRobot);
  let navigate = useNavigate();

  useEffect(() => {
    if (!selectedRobot) {
      navigate('/')
    }
    fetchRobotState()
    const timer = setTimeout(() => fetchRobotState(), 5000)
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const fetchRobotState = () => {
    try {
      getRobotStateReq().then(resp => {
        const states = resp.data.state;
        setRobotState(states)
      })
    } catch (e: any) {
      setRobotState(['API ERROR'])
      console.error(e);
    }
  }

  const [robotState, setRobotState] = useState<string[]>([])

  return (
    <BsNavbar bg="light" expand="lg">
      <div className="container">
        {selectedRobot ? <BsNavbar.Brand className="d-flex align-items-center">
          <img className="bg-white p-2" src={selectedRobot.imageURL} height="60px" alt={selectedRobot.name} />
          <div className="d-flex flex-column">
            <span className="ps-2 fs-3">{selectedRobot.name}</span>
            {robotState ? robotState.map(state =>
              <span key={state} className={clsx(
                "ms-2 mt-1 badge", {
                "bg-primary": !state.includes("ERROR"),
                "bg-danger": state.includes("ERROR"),
              }
              )}>{state}</span>
            ) : null}
          </div>


        </BsNavbar.Brand>
          : null}


        {props.useBack ? <Nav.Link as={Link} to="/overview">
          <BackspaceIcon />
        </Nav.Link> : <Nav.Link as={Link} to="/">
          <SettingsIcon />
        </Nav.Link>}

      </div>
    </BsNavbar>
  );
};

export default Navbar;
