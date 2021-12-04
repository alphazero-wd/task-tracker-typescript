import { FC } from "react";
import { Table, Thead, Tr, Th, Tbody, TableCaption } from "@chakra-ui/react";
// import Task from "./Task";
// import Loading from "../Loading";
// import emptyImg from "../../images/empty.svg";
const Tasks: FC = () => {
  return (
    <Table variant="simple" mt={5}>
      <TableCaption>Total Number of Tasks: 0</TableCaption>
      <Thead>
        <Tr>
          <Th>Task</Th>
          <Th display={["none", "none", "table-cell"]}>Date</Th>
          <Th isNumeric>Tools</Th>
        </Tr>
      </Thead>
      <Tbody></Tbody>
    </Table>
  );
};

export default Tasks;
