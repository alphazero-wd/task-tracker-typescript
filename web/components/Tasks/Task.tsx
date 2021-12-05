import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import {
  Tr,
  Td,
  Stack,
  IconButton,
  Tooltip,
  Checkbox,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import moment from 'moment';
import EditDrawer from '../shared/EditDrawer';

interface Props {
  taskId: number | string;
  taskName: string;
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: Date;
}

const Task: FC<Props> = ({
  taskId,
  taskName,
  isCompleted,
  isImportant,
  createdAt,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tr>
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
                colorScheme={isImportant ? 'yellow' : ''}
              />
            </Tooltip>
            <Tooltip hasArrow placement="top" label="Edit Task">
              <IconButton
                aria-label="Edit Task"
                icon={<EditIcon />}
                variant="ghost"
                onClick={onOpen}
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
      <EditDrawer taskId={taskId} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Task;
