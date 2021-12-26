import { authRoute } from './auth';
import { commentRoute } from './comment';
import { notificationRoute } from './notification';
import { projectRoute } from './project';
import { reportRoute } from './report';
import { ticketRoute } from './ticket';
import { userRoute } from './user';

export const routes = {
  auth: authRoute,
  project: projectRoute,
  user: userRoute,
  ticket: ticketRoute,
  comment: commentRoute,
  notification: notificationRoute,
  report: reportRoute,
};
