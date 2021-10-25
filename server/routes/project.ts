import { Express } from 'express';
import verifyLoggedIn from '../middleware/verifyLoggedIn';
import verifyAccess from '../middleware/verifyAccess';
import verifyRole from '../middleware/verifyRole';
import { createProject, deleteProject, updateProject, getProjects, getProject } from './../controllers/project';

export const projectRoute = (app: Express) => {
  app.post('/project', [verifyLoggedIn, verifyRole(3)], createProject);

  app.put('/project/:id', [verifyLoggedIn, verifyAccess, verifyRole(3)], updateProject);

  app.delete('/project/:id', [verifyLoggedIn, verifyAccess, verifyRole(3)], deleteProject);

  app.get('/project', [verifyLoggedIn], getProjects);

  app.get('/project/:id', [verifyLoggedIn, verifyAccess, verifyRole(2)], getProject);
};
