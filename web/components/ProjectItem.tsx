import { Td, Tr } from '@chakra-ui/react';
import React from 'react';
import router from 'next/router';
import { useState } from 'react';
import { IProject } from '@interfaces/IProject';

interface ProjectItemProps {
  project: IProject;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <Tr
      style={{ cursor: 'pointer' }}
      bgColor={hover ? 'gray.100' : ''}
      onClick={() =>
        router.push({
          pathname: '/project/[id]',
          query: {
            id: project.id,
          },
        })
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Td>{project.id}</Td>
      <Td>{project.title}</Td>
      <Td>{project.description}</Td>
    </Tr>
  );
};

export default ProjectItem;
