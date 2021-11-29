import React, { useState } from 'react';
import leitstandAPIInstance, { setLeitStandAPIBaseURL } from '../api/leitstand';
import roboterAPIInstance, { setRobotAPIBaseURL } from '../api/roboter';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';


const AppSettings: React.FC = () => {
    const [robotAPI, setRobotAPI] = useState(roboterAPIInstance.defaults.baseURL);
    const [leitstandAPI, setLeitstandAPI] = useState(leitstandAPIInstance.defaults.baseURL);
    let navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container">
                <div className="row gy-3">
                    <div className="col-12">
                        <h1>App Settings</h1>
                    </div>
                    <div className="col-12">
                        <h6 className="mt-4">API addresses:</h6>
                        <Form.Group className="mb-3" controlId="robotAPI">
                            <Form.Label>Robot API</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter the API URL"
                                value={robotAPI}
                                onChange={(event) => {
                                    setRobotAPI(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="controlAPI">
                            <Form.Label>Control API</Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter the API URL"
                                value={leitstandAPI}
                                onChange={(event) => {
                                    setLeitstandAPI(event.target.value);
                                }}
                            />
                        </Form.Group>

                        <button className="btn btn-primary"
                            onClick={() => {
                                if (leitstandAPI) {
                                    setLeitStandAPIBaseURL(leitstandAPI);
                                }
                                if (robotAPI) {
                                    setRobotAPIBaseURL(robotAPI);
                                }
                                navigate('/');
                            }}
                        >
                            Save
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AppSettings;
