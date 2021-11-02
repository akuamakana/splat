import { IFieldError } from '@interfaces/IFieldError';
import { IProject } from '@interfaces/IProject';
import { IUser } from '@interfaces/IUser';
import axios from 'axios';
import { useQuery } from 'react-query';
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

const fetchUsers = async () => {
  const { data } = await _axios.get<IUser[]>(`${constants.API_URL}/user`);
  return data;
};

export const updateProject = async (id: string, values: { title: string; description: string }) => {
  const { data } = await _axios.put<IProject>(`${constants.API_URL}/project/${id}`, values);
  return data;
};

export const addUserToProject = async (pid: string, uid: string) => {
  const { data } = await _axios.put<IFieldError>(`${constants.API_URL}/project/${pid}/user/${uid}`);
  return data;
};

export const removeUserFromProject = async (pid: string, uid: string) => {
  const { data } = await _axios.delete<IFieldError>(`${constants.API_URL}/project/${pid}/user/${uid}`);
  return data;
};

export const useMe = () => {
  return useQuery<IUser, Error>('me', fetchMe, { staleTime: 1000 * 20, retry: 1 });
};

export const useProject = (id: string) => {
  return useQuery<IProject, Error>('project', () => fetchProject(id), {});
};

export const useProjects = () => {
  return useQuery<IProject[], Error>('projects', fetchProjects);
};

export const useUsers = () => {
  return useQuery<IUser[], Error>('users', fetchUsers);
};
