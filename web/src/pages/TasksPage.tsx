import { Container } from "@chakra-ui/layout";
import { ChangeEvent, FC } from "react";
import Options from "../components/Tasks/Options";
import Tasks from "../components/Tasks/Tasks";
import TasksForm from "../components/Tasks/TasksForm";
import Today from "../components/Today";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const TasksPage: FC<Props> = ({ onChange }) => {
  return (
    <Container p={5} mt={5} maxW="1200px">
      <Today />
      <TasksForm />
      <Options onChange={onChange} />
      <Tasks />
    </Container>
  );
};

export default TasksPage;
