import { Td, Tr } from '@chakra-ui/react';
import React from 'react';

interface ProjectItemProps {
  project: any;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  return (
    <Tr>
      <Td>{project.id}</Td>
      <Td>{project.title}</Td>
      <Td>{project.description}</Td>
    </Tr>
  );
};

export default ProjectItem;
