import { FC, useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  TableCaption,
  Stack,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useMeQuery, useTasksQuery } from "../../generated/graphql";
import { useRouter } from "next/router";
import Task from "./Task";
import Loading from "../shared/Loading";
import emptyImg from "../../images/empty.svg";
import NextImage from "next/image";

const Tasks: FC = () => {
  const { data, loading } = useTasksQuery();
  const { data: user } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (loading) {
    return <Loading />;
  }

  if (data?.tasks.length === 0) {
    return (
      <Stack spacing={4} alignItems="center" mt={8}>
        <Box width={["80%", "60%", "40%", "25%"]}>
          <Image as={NextImage} src={emptyImg} alt="" />
        </Box>
        <Heading fontSize="1.5rem">No Tasks Found</Heading>
      </Stack>
    );
  }

  return (
    <Table variant="simple" mt={5}>
      <TableCaption>
        Total Number of Tasks: {data?.tasks.length || 0}
      </TableCaption>
      <Thead>
        <Tr>
          <Th>Task</Th>
          <Th display={["none", "none", "table-cell"]}>Date</Th>
          <Th isNumeric>Tools</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data?.tasks.map(task => (
          <Task key={task.taskId} {...task} />
        ))}
      </Tbody>
    </Table>
  );
};

export default Tasks;
