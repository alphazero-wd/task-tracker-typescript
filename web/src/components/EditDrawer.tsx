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
import { useAppSelector, useAppDispatch } from "../store";
import { updateTask } from "../reducers/tasks";
import moment from "moment";
import { Task } from "../utils/types";
interface Props {
  onClose: () => void;
  isOpen: boolean;
  taskId: string | number;
}
const EditDrawer: FC<Props> = ({ onClose, isOpen, taskId }) => {
  const [editValues, setEditValues] = useState({
    taskName: "",
    isImportant: false,
    isCompleted: false,
  });
  const [taskDate, setTaskDate] = useState({
    createdAt: "",
    updatedAt: "",
  });
  const { tasks } = useAppSelector(state => state.tasks);
  const [task, setTask] = useState<Task | undefined>(
    tasks.find(task => task.taskId === taskId)
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (taskId) {
      setTask(tasks.find(task => task.taskId === taskId));
      if (task) {
        setEditValues({
          taskName: task!.taskName,
          isCompleted: task!.isCompleted,
          isImportant: task!.isImportant,
        });
        setTaskDate({
          createdAt: moment(task.createdAt).format("MMMM Do YYYY, h:mm a"),
          updatedAt: moment(task.updatedAt).format(" MMMM Do YYYY, h:mm a"),
        });
      }
    }
  }, [taskId, tasks]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const inputValue =
      target.type === "checkbox" ? target.checked : target.value;
    setEditValues({ ...editValues, [target.name]: inputValue });
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateTask({
        taskId,
        taskName: editValues.taskName,
        isImportant: editValues.isImportant,
        isCompleted: editValues.isCompleted,
      })
    );
  };
  const firstField = useRef(null);
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
                  {taskDate.createdAt}
                </Text>
                <Text display="flex" justifyContent="space-between">
                  <Text fontWeight="bold">Updated At: </Text>{" "}
                  {taskDate.updatedAt}
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
                !editValues.taskName || editValues.taskName === task?.taskName
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
