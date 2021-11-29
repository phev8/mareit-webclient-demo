import React, { useEffect, useState } from 'react';
import roboterAPIInstance, { getAvailableRobots, selectRobotReq } from '../../api/roboter';
import leitstandAPIInstance from '../../api/leitstand';
import { RobotLabel } from '../../types/robot';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { selectRobot } from '../../store/robot';




const Home: React.FC = () => {
  const robotAPIAddr = roboterAPIInstance.defaults.baseURL;
  const leitstandAPIAddr = leitstandAPIInstance.defaults.baseURL;

  const dispatch = useAppDispatch()
  let navigate = useNavigate();

  const [availableRobots, setAvailableRobots] = useState<RobotLabel[]>([])

  useEffect(() => {
    fetchAvailableRobots()
  }, [])

  const fetchAvailableRobots = async () => {
    try {
      const robots = await getAvailableRobots()
      console.log(robots);
      const robotList: RobotLabel[] = [];
      for (let robot in robots.data) {
        console.log(robot)
        console.log(robots.data[robot])
        robotList.push({
          name: robot,
          imageURL: `${robotAPIAddr}${robots.data[robot]}`,
        })
      }
      setAvailableRobots([...robotList])
    } catch (e: any) {

    }
  }

  const onSelectRobot = async (robot: RobotLabel) => {
    try {
      await selectRobotReq(robot.name);
      dispatch(selectRobot(robot))
      navigate('overview')
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row gy-3">
          <div className="col-12">
            <h1>Mare IT Mobile Client</h1>
          </div>
          <div className="col-12">
            <h6>Available robots:</h6>
            {availableRobots.map(robot => <button
              key={robot.name}
              className="btn btn-secondary w-100 d-flex align-items-center justify-content-start"
              onClick={() => onSelectRobot(robot)}
            >
              <img className="bg-white p-2" src={robot.imageURL} height="50px" alt={robot.name} />
              <span className="ps-2 fs-3">{robot.name}</span>
            </button>)}
            {availableRobots.length < 1 ? <p className="fs-3 text-danger">No robots available</p> : null}

          </div>
          <div className="col-12">
            <h6 className="mt-4">API addresses:</h6>
            <p className="text-muted m-0">Robot: {robotAPIAddr}</p>
            <p className="text-muted">Control: {leitstandAPIAddr}</p>
            <Link className="btn btn-outline-secondary"
              to="app-settings"
            >Edit</Link>
          </div>

        </div>

      </div>
    </div>

  );
};

export default Home;

