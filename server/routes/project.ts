import { Express } from 'express';
import verifyLoggedIn from '../middleware/verifyLoggedIn';
import verifyAccess from '../middleware/verifyAccess';
import verifyRole from '../middleware/verifyRole';
import { createProject, deleteProject, updateProject, getProjects, getProject, addUserToProject, removeUserFromProject } from '../controllers/project';
import { Role } from '../entities/User';
import validateProject from '../middleware/validateProject';

export const projectRoute = (app: Express) => {
  app.post('/project', [verifyLoggedIn, validateProject, verifyRole([Role.DEV, Role.MANAGER, Role.ADMIN])], createProject);

  app.patch('/project/:id', [verifyLoggedIn, validateProject, verifyAccess, verifyRole([Role.MANAGER, Role.ADMIN])], updateProject);

  app.delete('/project/:id', [verifyLoggedIn, verifyAccess, verifyRole([Role.MANAGER, Role.ADMIN])], deleteProject);

  app.get('/project', [verifyLoggedIn], getProjects);

  app.get('/project/:id', [verifyLoggedIn, verifyAccess, verifyRole([Role.DEV, Role.MANAGER, Role.ADMIN])], getProject);

  app.patch('/project/:id/user/:uid', [verifyLoggedIn, verifyAccess, verifyRole([Role.MANAGER, Role.ADMIN])], addUserToProject);

  app.delete('/project/:id/user/:uid', [verifyLoggedIn, verifyAccess, verifyRole([Role.MANAGER, Role.ADMIN])], removeUserFromProject);
};
