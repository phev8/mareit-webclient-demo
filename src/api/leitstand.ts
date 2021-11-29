import axios from 'axios';

const leitstandAPIInstance = axios.create({
  baseURL: 'http://192.168.1.22:5678'
});

export const getRobotStreamReq = () => leitstandAPIInstance.get('/api/streams/getRobotStreamInfo');
export const initStreamReq = (robotName: string, stream: string) => leitstandAPIInstance.get(`/api/streams/initStream?robot=${robotName}&stream=${stream}`);
export const deleteStreamReq = (robotName: string, stream: string) => leitstandAPIInstance.get(`/api/streams/deleteStream?robot=${robotName}&stream=${stream}`);

export const getCameraConfigReq = () => leitstandAPIInstance.get('/api/getCameraConfig');
export const selectCameraReq = (camera: string) => leitstandAPIInstance.get(`/api/selectCamera?camera=${camera}`)
export const rotateCameraReq = (camera: string, valueString: string) => leitstandAPIInstance.get(`/api/rotateCamera?camera=${camera}${valueString}`)

export const setLeitStandAPIBaseURL = (url: string) => {
  leitstandAPIInstance.defaults.baseURL = url;
};

export default leitstandAPIInstance;

