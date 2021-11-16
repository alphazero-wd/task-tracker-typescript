import { Stack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { queryTasks } from '../../reducers/tasks';
import { useAppDispatch } from '../../store';

const Options: FC = () => {
  const [queries, setQueries] = useState({
    filterBy: '',
    sortBy: '',
  });
  const dispatch = useAppDispatch();
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setQueries({ ...queries, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(queryTasks(queries));
  }, [dispatch, queries]);
  return (
    <Stack
      mt={5}
      direction="row"
      maxW={400}
      justifyContent="flex-end"
      spacing={4}
    >
      <Select
        value={queries.filterBy}
        onChange={onChange}
        variant="flushed"
        placeholder="Filter By"
        name="filterBy"
      >
        <option value="importantTasks">Important Tasks</option>
        <option value="completedTasks">Completed Tasks</option>
        <option value="incompletedTasks">Incompleted Tasks</option>
      </Select>
      <Select
        variant="flushed"
        placeholder="Sort By"
        value={queries.sortBy}
        name="sortBy"
        onChange={onChange}
      >
        <option value="a-z">Alphabets (A - Z)</option>
        <option value="z-a">Alphabets (Z - A)</option>
        <option value="latest">Latest Tasks</option>
        <option value="oldest">Oldest Tasks</option>
      </Select>
    </Stack>
  );
};

export default Options;
