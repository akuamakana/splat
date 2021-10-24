import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Project } from '../entity/Project';
import { User } from '../entity/User';
import logger from '../middleware/logger';

export const createProject = async (request: Request, response: Response) => {
  try {
    const projectRepository = getRepository(Project);
    const project = new Project();
    project.title = request.body.title;
    project.description = request.body.description;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.session.userId);
    if (!user) {
      response.status(401).send();
      return;
    }
    project.user = user;

    await projectRepository.save(project);
    logger.info('Project created successfully: ' + project.id);
    const _project = { ...project, user: undefined };
    response.status(201).send({ field: 'alert', message: 'Project successfully created.', project: _project });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const updateProject = async (request: Request, response: Response) => {
  try {
    const updatedProject = await response.locals.projectRepository.save({ id: response.locals.project.id, ...request.body });
    response.status(200).send({ field: 'alert', message: 'Project successfully updated.', project: updatedProject });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const deleteProject = async (_: Request, response: Response) => {
  try {
    await response.locals.projectRepository.remove(response.locals.project);
    response.status(200).send({ field: 'alert', message: 'Project successfully deleted.' });
  } catch (error) {
    logger.error(error);
    response.status(500).send({ message: error.message });
  }
};

export const getProjects = async (request: Request, response: Response) => {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.session.userId);
    const projectRepository = getRepository(Project);
    const projects = await projectRepository.find({ user });

    response.status(200).send({ projects });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};

export const getProject = async (request: Request, response: Response) => {
  try {
    const projectRepository = getRepository(Project);
    const project = await projectRepository.findOne(request.params.id);

    if (!project) {
      response.status(404).send({ message: 'Project not found' });
      return;
    }

    response.status(200).send({ project });
  } catch (error) {
    response.status(500).send({ error: error.message });
  }
};
