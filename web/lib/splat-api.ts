import { IRoleInput } from './../interfaces/IRoleInput';
import { ICommentInput } from './../interfaces/ICommentInput';
import { IFieldError } from '@interfaces/IFieldError';
import { INotification } from '@interfaces/INotification';
import { IProject } from '@interfaces/IProject';
import { ITicket } from '@interfaces/ITicket';
import { ITicketInput } from '@interfaces/ITicketInput';
import { ITicketReport } from '@interfaces/ITicketReport';
import { IUser } from '@interfaces/IUser';
import axios from 'axios';
import { useQuery } from 'react-query';
import { IUserInput } from '@interfaces/IUserInput';

const _axios = axios.create({ withCredentials: true, baseURL: process.env.API_URL });

const fetchProjects = async () => {
  const { data } = await _axios.get<IProject[]>(`/project`);
  return data;
};

const fetchProject = async (id: string) => {
  const { data } = await _axios.get<IProject>(`/project/${id}`);
  return data;
};

const fetchMe = async () => {
  const { data } = await _axios.get<IUser>(`/user/me`);
  return data;
};

const fetchUsers = async () => {
  const { data } = await _axios.get<IUser[]>(`/user`);
  return data;
};

const fetchTicket = async (id: string) => {
  const { data } = await _axios.get<ITicket>(`/ticket/${id}`);
  return data;
};

const fetchTicketReport = async () => {
  const { data } = await _axios.get<ITicketReport>(`/report`);
  return data;
};

const fetchTickets = async (id: string) => {
  const { data } = await _axios.get<ITicket[]>(`/tickets/${id}`);
  return data;
};

const fetchAllTickets = async () => {
  const { data } = await _axios.get<ITicket[]>(`/tickets`);
  return data;
};

const fetchNotifications = async () => {
  const { data } = await _axios.get<INotification[]>(`/notifications`);
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

export const useTickets = (id: string) => {
  return useQuery<ITicket[], Error>('tickets', () => fetchTickets(id));
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
  const { data } = await _axios.delete<Boolean>(`/notifications?${_ids.join('')}`);
  return data;
};

export const changePassword = async (values: { password: string; token: string }) => {
  const { data } = await _axios.patch<Boolean>(`/auth/change-password/${values.token}`, { password: values.password });
  return data;
};

export const forgotPassword = async (values: { email: string }) => {
  const { data } = await _axios.post<{ message: string }>(`/auth/forgot-password`, values);
  return data;
};

export const login = async (values: { usernameOrEmail: string; password: string }) => {
  const { data } = await _axios.post(`/auth/login`, values);
  return data;
};

export const register = async (values: IUserInput) => {
  const { data } = await _axios.post(`/auth/register`, values);
  return data;
};

export const changeRole = async (values: IRoleInput) => {
  const { data } = await _axios.patch(`/user/${values.user ? values.user : '0'}`, values);
  return data;
};

export const createTicket = async (values: ITicketInput) => {
  const { data } = await _axios.post<ITicket>(`/ticket`, values);
  return data;
};

export const editTicket = async (values: ITicketInput, id: string) => {
  const { data } = await _axios.patch<ITicket>(`/ticket/${id}`, values);
  return data;
};

export const deleteTicket = async (id: string) => {
  const { data } = await _axios.delete<ITicket>(`/ticket/${id}`);
  return data;
};

export const updateProject = async (id: string, values: { title: string; description: string }) => {
  const { data } = await _axios.patch<IProject>(`/project/${id}`, values);
  return data;
};

export const addUserToProject = async (pid: string, uid: string) => {
  const { data } = await _axios.patch<IFieldError>(`/project/${pid}/user/${uid}`);
  return data;
};

export const removeUserFromProject = async (pid: string, uid: string) => {
  const { data } = await _axios.delete<IFieldError>(`/project/${pid}/user/${uid}`);
  return data;
};

export const addComment = async (values: ICommentInput) => {
  const { data } = await _axios.post<Boolean>(`/comment`, values);
  return data;
};

export const logout = async () => {
  const { data } = await _axios.delete<Boolean>(`/auth/logout`);
  return data;
};
