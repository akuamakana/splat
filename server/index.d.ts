import { Repository } from 'typeorm';
import { Project } from './entity/Project';
import { User } from './entity/User';

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
