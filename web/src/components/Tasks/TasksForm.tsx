import { IconButton } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import { FC, FormEvent, useState } from 'react';
const TasksForm: FC = () => {
  const [taskValues, setTaskValues] = useState('');
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={5} direction={{ md: 'row' }}>
        <IconButton
          colorScheme="blue"
          aria-label="Add a task"
          icon={<AddIcon />}
          isDisabled={!taskValues}
          variant="ghost"
        />
        <Input
          onChange={(e) => setTaskValues(e.target.value)}
          placeholder="Add a Task..."
          variant="flushed"
        />
      </Stack>
    </form>
  );
};

export default TasksForm;
