import { Express } from 'express';
import validateLoggedIn from '../middleware/validateLoggedIn';
import verifyAccess from '../middleware/verifyAccess';
import { createProject, deleteProject, updateProject, getProjects, getProject } from './../controllers/project';

export const projectRoute = (app: Express) => {
  app.post('/project', [validateLoggedIn], createProject);

  app.put('/project', [validateLoggedIn, verifyAccess], updateProject);

  app.delete('/project', [validateLoggedIn, verifyAccess], deleteProject);

  app.get('/project', [validateLoggedIn], getProjects);

  app.get('/project/:id', [validateLoggedIn], getProject);
};
