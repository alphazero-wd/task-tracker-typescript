import { FC } from "react";
import { Spinner, Stack } from "@chakra-ui/react";
const Loading: FC = () => {
  return (
    <Stack alignItems="center" mt={5}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Stack>
  );
};

export default Loading;
