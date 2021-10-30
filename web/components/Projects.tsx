import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchProjects } from '../lib/splat-api';
import ProjectItem from './shared/ProjectItem';

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = ({}) => {
  const { data } = useQuery('projects', fetchProjects);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>id</Th>
          <Th>Title</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.projects.map((project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </Tbody>
    </Table>
  );
};

export default Projects;
