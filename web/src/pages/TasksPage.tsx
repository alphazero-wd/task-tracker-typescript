import { Container } from "@chakra-ui/layout";
import { FC } from "react";
import Options from "../components/Tasks/Options";
import Tasks from "../components/Tasks/Tasks";
import TasksForm from "../components/Tasks/TasksForm";
import Today from "../components/Today";
const TasksPage: FC = () => {
  return (
    <Container p={5} mt={5} maxW="1200px">
      <Today />
      <TasksForm />
      <Options />
      <Tasks />
    </Container>
  );
};

export default TasksPage;
