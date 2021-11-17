import { FC, useEffect } from "react";
import { Table, Thead, Tr, Th, Tbody, Image, Text } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/layout";
import Task from "./Task";
import { useAppSelector, useAppDispatch } from "../../store";
import { getTasks } from "../../reducers/tasks";
import Loading from "../Loading";
import emptyImg from "../../images/empty.svg";
const Tasks: FC = () => {
  const { displayedTasks, loading } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, []);
  if (loading) {
    return <Loading />;
  }
  if (displayedTasks.length === 0) {
    return (
      <Stack alignItems="center" mt={8} spacing={4}>
        <Image src={emptyImg} w={["80%", "60%", "40%", "25%"]} />
        <Text fontSize="xl">You have no tasks left. Please add a task.</Text>
      </Stack>
    );
  }

  return (
    <Table variant="simple" mt={5}>
      <Thead>
        <Tr>
          <Th>Task</Th>
          <Th display={["none", "none", "table-cell"]}>Date</Th>
          <Th isNumeric>Tools</Th>
        </Tr>
      </Thead>
      <Tbody>
        {displayedTasks.map(task => (
          <Task key={task.taskId} {...task} />
        ))}
      </Tbody>
    </Table>
  );
};

export default Tasks;
