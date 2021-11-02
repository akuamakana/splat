import { projectRoute } from './project';
import { authRoute } from './auth';
import { helloRoute } from './hello';
import { userRoute } from './user';
import { ticketRoute } from './ticket';

export const routes = {
  hello: helloRoute,
  auth: authRoute,
  project: projectRoute,
  user: userRoute,
  ticket: ticketRoute,
};
