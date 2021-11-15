import { Heading, Stack, Text } from '@chakra-ui/layout';
import { FC } from 'react';
import { weekdays, months } from '../utils/dates';
const Today: FC = () => {
  return (
    <Stack spacing={3} mb={5}>
      <Heading fontSize="2xl">My Day</Heading>
      <Text fontSize="sm">{`${weekdays[new Date().getDay()]}, ${
        months[new Date().getMonth()]
      } ${new Date().getFullYear()}`}</Text>
    </Stack>
  );
};

export default Today;
