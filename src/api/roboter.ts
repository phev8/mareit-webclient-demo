import axios from 'axios';

const roboterAPIInstance = axios.create({
  baseURL: 'http://192.168.1.22:6789'
});

export const selectRobotReq = (name: string) => roboterAPIInstance.get(`/api/selectRobot?name=${name}`);
export const getRobotStateReq = () => roboterAPIInstance.get('/api/getRobotState');
export const getLogMessageReq = () => roboterAPIInstance.get('/api/getLogMessage');
export const getPermissionRequestsReq = () => roboterAPIInstance.get('/api/getPermissionRequests');
export const setPermissionRequestReq = (robotName: string, uid: string, allow: boolean) => roboterAPIInstance.get(`/api/setPermission?robot=${robotName}&requestuid=${uid}&allow=${allow}`);

export const setRobotAPIBaseURL = (url: string) => {
  roboterAPIInstance.defaults.baseURL = url;
};

export default roboterAPIInstance;


export const getAvailableRobots = () => roboterAPIInstance.get('api/getAvailableRobots')
