import { Container } from "@chakra-ui/layout";
import { FC } from "react";
import Tasks from "../components/Tasks/Tasks";
import TasksForm from "../components/Tasks/TasksForm";
import Today from "../components/shared/Today";

const TasksPage: FC = () => {
  return (
    <Container p={5} mt={5} maxW="1200px">
      <Today />
      <TasksForm />
      <Tasks />
    </Container>
  );
};

export default TasksPage;
