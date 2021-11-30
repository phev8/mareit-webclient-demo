import axios from 'axios';
import { Pose } from '../pages/GoToCommands';

const roboterAPIInstance = axios.create({
  baseURL: 'http://192.168.1.22:6789'
});

export const selectRobotReq = (name: string) => roboterAPIInstance.get(`/api/selectRobot?name=${name}`);
export const getRobotStateReq = () => roboterAPIInstance.get('/api/getRobotState');
export const getLogMessageReq = () => roboterAPIInstance.get('/api/getLogMessage');
export const getPermissionRequestsReq = () => roboterAPIInstance.get('/api/getPermissionRequests');
export const setPermissionRequestReq = (robotName: string, uid: string, allow: boolean) => roboterAPIInstance.get(`/api/setPermission?robot=${robotName}&requestuid=${uid}&allow=${allow}`);

export const getSimpleActionsReq = () => roboterAPIInstance.get('/api/requestSimpleActions');
export const setSimpleActionCommandReq = (actionName: string, state: any) => roboterAPIInstance.post(`/api/setSimpleActionCommand`, { name: actionName, state: state });

export const getCurrentPoseReq = () => roboterAPIInstance.get('/api/getCurrentPose');
interface GoTo {
  maxForwardSpeed: number;
  waypointMaxForwardSpeed: number;
  waypointPose: Pose;
}
export const setGoToCommandReq = (command: GoTo) => roboterAPIInstance.post('/api/setGoToCommand', command);

export const setRobotAPIBaseURL = (url: string) => {
  roboterAPIInstance.defaults.baseURL = url;
};

export default roboterAPIInstance;


export const getAvailableRobots = () => roboterAPIInstance.get('api/getAvailableRobots')
