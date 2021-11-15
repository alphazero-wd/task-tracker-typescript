import { CheckCircleIcon } from '@chakra-ui/icons';
import { ListIcon, ListItem } from '@chakra-ui/layout';
import { FC } from 'react';

const Task: FC = () => {
  return (
    <ListItem>
      <ListIcon as={CheckCircleIcon} />
    </ListItem>
  );
};

export default Task;
