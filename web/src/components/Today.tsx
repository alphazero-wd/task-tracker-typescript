import { Heading, Stack, Text } from "@chakra-ui/layout";
import { FC } from "react";
import moment from "moment";
const Today: FC = () => {
  return (
    <Stack spacing={3} mb={5}>
      <Heading fontSize="2xl">My Day</Heading>
      <Text fontSize="sm">{moment().format("dddd, MMMM Do YYYY")}</Text>
    </Stack>
  );
};

export default Today;
