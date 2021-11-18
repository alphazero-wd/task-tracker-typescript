import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import {
  Tr,
  Td,
  Stack,
  IconButton,
  Tooltip,
  Checkbox,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC } from "react";
import { Task as TaskProps } from "../../utils/types";
import moment from "moment";
import { useAppDispatch } from "../../store";
import { deleteTask, updateTask } from "../../reducers/tasks";
import EditDrawer from "../EditDrawer";
const Task: FC<TaskProps> = ({
  taskId,
  taskName,
  isCompleted,
  isImportant,
  createdAt,
}) => {
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tr bg={isImportant ? "blue.100" : ""} color={isImportant ? "blue" : ""}>
        <Td>
          <Stack direction="row" spacing={4}>
            <Tooltip hasArrow placement="top" label="Mark as Complete">
              <Checkbox
                onChange={() =>
                  dispatch(updateTask({ isCompleted: !isCompleted, taskId }))
                }
                isChecked={isCompleted}
                colorScheme="green"
                size="lg"
              />
            </Tooltip>
            <Text>{taskName}</Text>
          </Stack>
        </Td>
        <Td display={["none", "none", "table-cell"]}>
          {moment(createdAt).format("DD MMM, YYYY")}
        </Td>
        <Td>
          <Stack direction="row" justifyContent="flex-end" spacing={[3, 4]}>
            <Tooltip hasArrow placement="top" label="Mark as Important">
              <IconButton
                aria-label="Toggle Important"
                icon={<StarIcon />}
                variant="ghost"
                onClick={() =>
                  dispatch(updateTask({ isImportant: !isImportant, taskId }))
                }
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
                onClick={() => dispatch(deleteTask(taskId))}
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
