import {
  SearchIcon,
  ChevronDownIcon,
  SettingsIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  LinkBox,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { clearMessage, logout } from '../reducers/user';
import { queryTasks } from '../reducers/tasks';
import jwtDecode from 'jwt-decode';
const Navbar: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      const token = user.token;
      const { exp } = jwtDecode(token) as any;
      if (token) {
        if (exp * 1000 - 60000 <= Date.now()) {
          dispatch(logout());
        }
      }
    }
  }, [user]);
  useEffect(() => {
    dispatch(clearMessage());
  }, [location, dispatch]);
  useEffect(() => {
    dispatch(queryTasks({ search }));
  }, [dispatch, search, tasks]);

  return (
    <Box bg="blue.500" p={4}>
      <Container maxW="1200px">
        <Flex justifyContent="space-between" alignItems="center">
          <LinkBox fontSize="xl" to="/" color="white">
            To Do
          </LinkBox>
          {user && (
            <>
              <InputGroup w="75">
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Search Tasks"
                  focusBorderColor="white"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
              <Menu>
                <MenuButton
                  rightIcon={<ChevronDownIcon />}
                  as={Button}
                  colorScheme="pink"
                >
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuGroup title={user?.username}>
                    <MenuItem icon={<SettingsIcon />}>
                      <Link to="/account">Your Account</Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => dispatch(logout())}
                      icon={<ArrowForwardIcon />}
                    >
                      Logout
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
