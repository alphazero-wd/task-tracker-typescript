import { FC, useEffect } from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Image,
  Text,
  TableCaption,
} from "@chakra-ui/react";
import { Stack } from "@chakra-ui/layout";
import Task from "./Task";
import { useAppSelector, useAppDispatch } from "../../store";
import { getTasks } from "../../reducers/tasks";
import Loading from "../Loading";
import emptyImg from "../../images/empty.svg";
const Tasks: FC = () => {
  const { displayedTasks, loading, tasks } = useAppSelector(
    state => state.tasks
  );
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
        <Text fontSize="xl">No Tasks Found.</Text>
      </Stack>
    );
  }

  return (
    <Table variant="simple" mt={5}>
      <TableCaption>Total Number of Tasks: {tasks.length}</TableCaption>
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
