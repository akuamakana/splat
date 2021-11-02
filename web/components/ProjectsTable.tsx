import { Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useProjects } from '@lib/splat-api';
import ProjectItem from '@components/ProjectItem';
import { useMediaQuery } from '@chakra-ui/react';

interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = ({}) => {
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)');
  const { data } = useProjects();

  return (
    <Table variant="simple" size={isLargerThan992 ? 'md' : 'xs'}>
      <Thead>
        <Tr>
          <Th>id</Th>
          <Th>Title</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </Tbody>
    </Table>
  );
};

export default Projects;
