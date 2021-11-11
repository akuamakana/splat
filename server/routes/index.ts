import { authRoute } from './auth';
import { commentRoute } from './comment';
import { graphRoute } from './graph';
import { helloRoute } from './hello';
import { notificationRoute } from './notification';
import { projectRoute } from './project';
import { ticketRoute } from './ticket';
import { userRoute } from './user';

export const routes = {
  hello: helloRoute,
  auth: authRoute,
  project: projectRoute,
  user: userRoute,
  ticket: ticketRoute,
  comment: commentRoute,
  notification: notificationRoute,
  graph: graphRoute,
};
