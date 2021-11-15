import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { FC, FormEvent, useState } from "react";
import { addTask } from "../../reducers/tasks";
import { useAppDispatch } from "../../store";
const TasksForm: FC = () => {
  const [taskValues, setTaskValues] = useState("");
  const dispatch = useAppDispatch();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTask({ taskName: taskValues }));
    setTaskValues("");
  };
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={5} direction={{ md: "row" }}>
        <IconButton
          colorScheme="blue"
          aria-label="Add a task"
          icon={<AddIcon />}
          isDisabled={!taskValues}
          variant="ghost"
          type="submit"
        />
        <Input
          onChange={e => setTaskValues(e.target.value)}
          placeholder="Add a Task..."
          variant="flushed"
          value={taskValues}
        />
      </Stack>
    </form>
  );
};

export default TasksForm;
