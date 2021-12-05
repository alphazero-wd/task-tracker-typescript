import { Stack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { FC, useEffect, useState } from 'react';
import { InputGroup, Input, InputLeftElement } from '@chakra-ui/input';
import { SearchIcon } from '@chakra-ui/icons';
import { useGetTasksQuery } from '../../generated/graphql';

const Options: FC = () => {
  const [queries, setQueries] = useState({
    search: '',
    filter: {
      isCompleted: false,
      isImportant: false,
    },
    sort: {
      orderBy: '',
      order: '',
    },
  });
  const { data, refetch } = useGetTasksQuery({ variables: { queries } });

  useEffect(() => {
    refetch({ queries });
    console.log(data);
  }, [queries]);

  return (
    <Stack spacing={8}>
      <Stack
        mt={5}
        direction="row"
        maxW={400}
        justifyContent="flex-end"
        spacing={4}
      >
        <Select
          variant="flushed"
          onChange={(e) => {
            setQueries({
              ...queries,
              filter: {
                ...queries.filter,
                [e.target.value.split('=')[0]]: Boolean(
                  e.target.value.split('=')[1]
                ),
              },
            });
          }}
          placeholder="Filter By"
          name="filter"
        >
          <option value="isImportant=true">Important Tasks</option>
          <option value="isCompleted=false">Completed Tasks</option>
          <option value="isCompleted=false">Incompleted Tasks</option>
        </Select>
        <Select
          variant="flushed"
          onChange={(e) =>
            setQueries({
              ...queries,
              sort: {
                ...queries.sort,
                [e.target.value.split('=')[0]]: e.target.value.split('=')[1],
              },
            })
          }
          placeholder="Sort By"
          name="sort"
        >
          <option value="taskName=ASC">Alphabets (A - Z)</option>
          <option value="taskName=DESC">Alphabets (Z - A)</option>
          <option value="createdAt=ASC">Latest Tasks</option>
          <option value="createdAt=DESC">Oldest Tasks</option>
        </Select>
      </Stack>

      <InputGroup w="75" mr={3}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          type="text"
          placeholder="Search Tasks"
          onChange={(e) => setQueries({ ...queries, search: e.target.value })}
          name="search"
        />
      </InputGroup>
    </Stack>
  );
};

export default Options;
