import { FC, useEffect } from "react";
import { Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import Task from "./Task";
import { useAppSelector, useAppDispatch } from "../../store";
import { getTasks } from "../../reducers/tasks";
const Tasks: FC = () => {
  const { displayedTasks } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, []);
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
