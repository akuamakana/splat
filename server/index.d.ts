import { Repository } from 'typeorm';
import { Project } from './entities/Project';
import { User } from './entities/User';

interface Locals {
  projectRepository?: Repository<Project>;
  project?: Project;
  userRole?: number;
  user?: User;
}

declare module 'express' {
  export interface Response {
    locals: Locals;
  }
}
