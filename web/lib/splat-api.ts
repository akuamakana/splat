import axios from 'axios';
import { useQuery } from 'react-query';
import { IProject } from '../interfaces/IProject';
import { IUser } from '../interfaces/IUser';
import constants from './constants';

const _axios = axios.create({ withCredentials: true });

const fetchProjects = async () => {
  const { data } = await _axios.get<IProject[]>(`${constants.API_URL}/project`);
  return data;
};

const fetchProject = async (id: string) => {
  const { data } = await _axios.get<IProject>(`${constants.API_URL}/project/${id}`);
  return data;
};

const fetchMe = async () => {
  const { data } = await _axios.get<IUser>(`${constants.API_URL}/user/me`);
  return data;
};

export const useMe = () => {
  return useQuery<IUser, Error>('me', fetchMe, { staleTime: 1000 * 20 });
};

export const useProject = (id: string) => {
  return useQuery<IProject, Error>('project', () => fetchProject(id));
};

export const useProjects = () => {
  return useQuery<IProject[], Error>('projects', fetchProjects);
};
