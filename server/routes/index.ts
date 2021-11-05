import { authRoute } from './auth';
import { commentRoute } from './comment';
import { helloRoute } from './hello';
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
};
