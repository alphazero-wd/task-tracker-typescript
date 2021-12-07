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
import moment from "moment";
import EditDrawer from "../shared/EditDrawer";
import {
  TasksDocument,
  TasksQuery,
  useTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../generated/graphql";

interface Props {
  taskId: string;
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
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const { data: tasks } = useTasksQuery();

  const update = async (field: string, value: any) => {
    await updateTask({
      variables: { task: { [field]: value, taskId: parseInt(taskId) } },
      update: (cache, { data }) => {
        cache.writeQuery<TasksQuery>({
          query: TasksDocument,
          data: {
            __typename: "Query",
            tasks:
              tasks?.tasks.map(task =>
                task.taskId === data?.updateTask.taskId
                  ? { ...task, [field]: value }
                  : task
              ) || [],
          },
        });
      },
    });
  };

  return (
    <>
      <Tr>
        <Td>
          <Stack direction="row" spacing={4}>
            <Tooltip hasArrow placement="top" label="Mark as Complete">
              <Checkbox
                isChecked={isCompleted}
                onChange={() => update("isCompleted", !isCompleted)}
                colorScheme="blue"
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
                colorScheme={isImportant ? "yellow" : ""}
                onClick={() => update("isImportant", !isImportant)}
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
                onClick={async () => {
                  await deleteTask({
                    variables: { taskId },
                    update: cache => {
                      cache.writeQuery<TasksQuery>({
                        query: TasksDocument,
                        data: {
                          __typename: "Query",
                          tasks:
                            tasks?.tasks.filter(
                              task => task.taskId !== taskId
                            ) || [],
                        },
                      });
                    },
                  });
                }}
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
