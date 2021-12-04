import { Stack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { FC } from "react";

const Options: FC = () => {
  return (
    <Stack
      mt={5}
      direction="row"
      maxW={400}
      justifyContent="flex-end"
      spacing={4}
    >
      <Select variant="flushed" placeholder="Filter By" name="filterBy">
        <option value="importantTasks">Important Tasks</option>
        <option value="completedTasks">Completed Tasks</option>
        <option value="incompletedTasks">Incompleted Tasks</option>
      </Select>
      <Select variant="flushed" placeholder="Sort By" name="sortBy">
        <option value="a-z">Alphabets (A - Z)</option>
        <option value="z-a">Alphabets (Z - A)</option>
        <option value="latest">Latest Tasks</option>
        <option value="oldest">Oldest Tasks</option>
      </Select>
    </Stack>
  );
};

export default Options;
