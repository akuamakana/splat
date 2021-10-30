import axios from 'axios';
import constants from './constants';

const _axios = axios.create({ withCredentials: true });

export const fetchProjects = async () => {
  const { data } = await _axios.get(`${constants.API_URL}/project`);
  return data;
};

export const fetchMe = async () => {
  const { data } = await axios.get('http://localhost:3001/user/me', { withCredentials: true });
  return data;
};
