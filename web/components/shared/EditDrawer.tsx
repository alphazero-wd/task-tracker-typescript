import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Stack,
  Box,
  FormLabel,
  Input,
  Checkbox,
  DrawerFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import {
  useTasksQuery,
  useUpdateTaskMutation,
  TasksQuery,
  TasksDocument,
} from "../../generated/graphql";
import moment from "moment";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  taskId: string;
}
const EditDrawer: FC<Props> = ({ onClose, isOpen, taskId }) => {
  const [editValues, setEditValues] = useState({
    taskName: "",
    isImportant: false,
    isCompleted: false,
  });
  const [createdAt, setCreatedAt] = useState("");
  const { data: tasks } = useTasksQuery();
  const [updateTask] = useUpdateTaskMutation();

  useEffect(() => {
    const task = tasks?.tasks.find(task => task.taskId === taskId);
    setEditValues({
      taskName: task!.taskName || "",
      isCompleted: task!.isCompleted || false,
      isImportant: task!.isImportant || false,
    });
    setCreatedAt(task?.createdAt);
  }, [taskId, tasks]);

  const firstField = useRef(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;

    setEditValues({
      ...editValues,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateTask({
      variables: {
        task: {
          taskName: editValues.taskName,
          taskId: parseInt(taskId),
          isCompleted: editValues.isCompleted,
        },
      },
      update: (cache, { data }) => {
        cache.writeQuery<TasksQuery>({
          query: TasksDocument,
          data: {
            __typename: "Query",
            tasks:
              tasks?.tasks.map(task =>
                task.taskId === data?.updateTask.taskId
                  ? {
                      ...task,
                      taskName: editValues.taskName,
                      isCompleted: editValues.isCompleted,
                      isImportant: editValues.isImportant,
                    }
                  : task
              ) || [],
          },
        });
      },
    });
  };
  return (
    <Drawer
      size="md"
      initialFocusRef={firstField}
      onClose={onClose}
      isOpen={isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <form onSubmit={onSubmit}>
          <DrawerHeader borderBottomWidth="1px">Task Info</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <Box>
                <FormLabel htmlFor="editValue">Task name:</FormLabel>
                <Input
                  name="taskName"
                  onChange={onChange}
                  ref={firstField}
                  value={editValues.taskName}
                  placeholder="Edit your task name here..."
                />
              </Box>
              <Stack spacing={4} direction="row" alignItems="center">
                <Checkbox
                  isChecked={editValues.isImportant}
                  onChange={onChange}
                  name="isImportant"
                  id="isImportant"
                />
                <FormLabel htmlFor="isImportant">Mark as important</FormLabel>
              </Stack>
              <Stack spacing={4} direction="row" alignItems="center">
                <Checkbox
                  isChecked={editValues.isCompleted}
                  name="isCompleted"
                  onChange={onChange}
                  id="isCompleted"
                />
                <FormLabel htmlFor="isCompleted">Mark as completed</FormLabel>
              </Stack>
              <Stack spacing={4}>
                <Text display="flex" justifyContent="space-between">
                  <Text fontWeight="bold">Created At:</Text>{" "}
                  <Text>
                    {moment(createdAt).format("ddd, MMM D YYYY, h:mm a")}
                  </Text>
                </Text>
              </Stack>
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isDisabled={
                !editValues.taskName ||
                editValues.taskName ===
                  tasks?.tasks.find(task => task.taskId === taskId)?.taskName
              }
              type="submit"
              colorScheme="blue"
              onClick={onClose}
            >
              Edit
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default EditDrawer;
