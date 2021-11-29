import axios from 'axios';

const leitstandAPIInstance = axios.create({
    baseURL: 'http://192.168.1.22:5678'
});

export const setLeitStandAPIBaseURL = (url: string) => {
    leitstandAPIInstance.defaults.baseURL = url;
};

export default leitstandAPIInstance;

