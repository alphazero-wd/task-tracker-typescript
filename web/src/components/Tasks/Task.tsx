import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import {
  Tr,
  Td,
  Stack,
  IconButton,
  Tooltip,
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Task as TaskProps } from '../../utils/types';
import moment from 'moment';
const Task: FC<TaskProps> = ({
  taskId,
  taskName,
  isCompleted,
  isImportant,
  createdAt,
}) => {
  return (
    <Tr
      bg={`${isImportant ? 'blue.100' : 'white'}`}
      color={`${isImportant ? 'blue' : 'black'}`}
    >
      <Td>
        <Stack direction="row" spacing={4}>
          <Tooltip hasArrow placement="top" label="Mark as Complete">
            <Checkbox isChecked={isCompleted} colorScheme="green" size="lg" />
          </Tooltip>
          <Text>{taskName}</Text>
        </Stack>
      </Td>
      <Td display={['none', 'none', 'table-cell']}>
        {moment(createdAt).format('DD MMM, YYYY')}
      </Td>
      <Td>
        <Stack direction="row" justifyContent="flex-end" spacing={[3, 4]}>
          <Tooltip hasArrow placement="top" label="Mark as Important">
            <IconButton
              aria-label="Toggle Important"
              icon={<StarIcon />}
              variant="ghost"
            />
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Edit Task">
            <IconButton
              aria-label="Edit Task"
              icon={<EditIcon />}
              variant="ghost"
            />
          </Tooltip>
          <Tooltip hasArrow placement="top" label="Delete Task">
            <IconButton
              aria-label="Delete Task"
              icon={<DeleteIcon />}
              variant="ghost"
            />
          </Tooltip>
        </Stack>
      </Td>
    </Tr>
  );
};

export default Task;
