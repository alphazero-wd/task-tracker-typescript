import { List } from '@chakra-ui/layout';
import { FC } from 'react';
import Task from './Task';
const Tasks: FC = () => {
  return (
    <List spacing={4}>
      <Task />
    </List>
  );
};

export default Tasks;
