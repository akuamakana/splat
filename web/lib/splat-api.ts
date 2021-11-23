import { ICommentInput } from './../interfaces/ICommentInput';
import { IFieldError } from '@interfaces/IFieldError';
import { INotification } from '@interfaces/INotification';
import { IProject } from '@interfaces/IProject';
import { ITicket } from '@interfaces/ITicket';
import { ITicketInput } from '@interfaces/ITicketInput';
import { ITicketReport } from '@interfaces/ITicketReport';
import { IUser } from '@interfaces/IUser';
import axios from 'axios';
import constants from './constants';
import { useQuery } from 'react-query';
import { IUserInput } from '@interfaces/IUserInput';

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

const fetchTicket = async (id: string) => {
  const { data } = await _axios.get<ITicket>(`${constants.API_URL}/ticket/${id}`);
  return data;
};

const fetchTicketReport = async () => {
  const { data } = await _axios.get<ITicketReport>(`${constants.API_URL}/report`);
  return data;
};

export const createTicket = async (values: ITicketInput) => {
  const { data } = await _axios.post<ITicket>(`${constants.API_URL}/ticket`, values);
  return data;
};

export const editTicket = async (values: ITicketInput, id: string) => {
  const { data } = await _axios.put<ITicket>(`${constants.API_URL}/ticket/${id}`, values);
  return data;
};

export const deleteTicket = async (id: string) => {
  const { data } = await _axios.delete<ITicket>(`${constants.API_URL}/ticket/${id}`);
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

export const addComment = async (values: ICommentInput) => {
  const { data } = await _axios.post<Boolean>(`${constants.API_URL}/comment`, values);
  return data;
};

export const logout = async () => {
  const { data } = await _axios.post<Boolean>(`${constants.API_URL}/auth/logout`);
  return data;
};

export const useMe = () => {
  return useQuery<IUser, Error>('me', fetchMe, { staleTime: 1000 * 20, retry: 1 });
};

export const useProject = (id: string) => {
  return useQuery<IProject, Error>('project', () => fetchProject(id));
};

export const useProjects = () => {
  return useQuery<IProject[], Error>('projects', fetchProjects);
};

export const useUsers = () => {
  return useQuery<IUser[], Error>('users', fetchUsers);
};

export const useTicket = (id: string) => {
  return useQuery<ITicket, Error>('ticket', () => fetchTicket(id));
};

const fetchTickets = async (id: string) => {
  const { data } = await _axios.get<ITicket[]>(`${constants.API_URL}/tickets/${id}`);
  return data;
};

const fetchAllTickets = async () => {
  const { data } = await _axios.get<ITicket[]>(`${constants.API_URL}/tickets`);
  return data;
};

export const useTickets = (id: string) => {
  return useQuery<ITicket[], Error>('tickets', () => fetchTickets(id));
};

const fetchNotifications = async () => {
  const { data } = await _axios.get<INotification[]>(`${constants.API_URL}/notifications`);
  return data;
};

export const useNotifications = () => {
  return useQuery<INotification[], Error>('notifications', fetchNotifications);
};

export const useTicketReport = () => {
  return useQuery<ITicketReport, Error>('ticket report', fetchTicketReport);
};

export const useAllTickets = () => {
  return useQuery<ITicket[], Error>('all tickets', fetchAllTickets);
};

export const deleteNotifications = async (ids: string[]) => {
  let _ids: string[] = [];
  for (let i = 0; i < ids.length; i++) {
    _ids.push(`id=${ids[i]}&`);
  }
  const { data } = await _axios.delete<Boolean>(`${constants.API_URL}/notifications?${_ids.join('')}`);
  return data;
};

export const changePassword = async (values: { password: string; token: string }) => {
  const { data } = await _axios.put<Boolean>(`${constants.API_URL}/auth/change-password/${values.token}`, { password: values.password });
  return data;
};

export const forgotPassword = async (values: { email: string }) => {
  const { data } = await _axios.post<{ message: string }>(`${constants.API_URL}/auth/forgot-password`, values);
  return data;
};

export const login = async (values: { usernameOrEmail: string; password: string }) => {
  const { data } = await _axios.post(`${constants.API_URL}/auth/login`, values);
  return data;
};

export const register = async (values: IUserInput) => {
  const { data } = await _axios.post(`${constants.API_URL}/auth/register`, values);
  return data;
};
