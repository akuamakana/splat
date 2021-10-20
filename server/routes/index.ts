import { projectRoute } from './project';
import { authRoute } from './auth';
import { helloRoute } from './hello';

export const routes = {
  hello: helloRoute,
  auth: authRoute,
  project: projectRoute,
};
