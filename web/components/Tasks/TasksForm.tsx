import { IconButton } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { FC, FormEvent, useState } from "react";
import {
  TasksDocument,
  TasksQuery,
  useAddTaskMutation,
  useTasksQuery,
} from "../../generated/graphql";

const TasksForm: FC = () => {
  const [taskValues, setTaskValues] = useState("");
  const [addTask] = useAddTaskMutation();
  const { data: tasks } = useTasksQuery();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTaskValues("");
    addTask({
      variables: { task: { taskName: taskValues } },
      update: (cache, { data }) => {
        cache.writeQuery<TasksQuery>({
          query: TasksDocument,
          data: {
            __typename: "Query",
            tasks: [...((tasks?.tasks as any) || []), data?.addTask],
          },
        });
      },
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={5} direction={{ md: "row" }}>
        <Tooltip placement="top" label="Click to add a task">
          <IconButton
            colorScheme="blue"
            aria-label="Add a task"
            icon={<AddIcon />}
            isDisabled={!taskValues}
            variant="ghost"
            type="submit"
          />
        </Tooltip>
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
