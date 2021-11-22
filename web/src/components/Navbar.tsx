import {
  SearchIcon,
  ChevronDownIcon,
  SettingsIcon,
  ArrowForwardIcon,
  SunIcon,
  MoonIcon,
  EditIcon,
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
  IconButton,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { FC, useEffect, ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { clearMessage, logout } from '../reducers/user';
import jwtDecode from 'jwt-decode';

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Navbar: FC<Props> = ({ onChange }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
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
    switch (location.pathname) {
      case '/':
        document.title = 'To Do';
        break;
      case '/login':
        document.title = 'Login';
        break;
      case '/signup':
        document.title = 'Sign Up';
        break;
      case '/tasks':
        document.title = `Tasks | ${user?.username}`;
        break;
      case '/forgot-password':
        document.title = 'Forgot Password';
        break;
      case `/reset-password/${user?.token}`:
        document.title = 'Reset Password';
        break;
      case '/profile':
        document.title = 'Profile | ' + user?.username;
        break;
      default:
        break;
    }
  }, [location, dispatch]);

  return (
    <Box bg={colorMode === 'light' ? 'white' : 'gray.700'} p={4}>
      <Container maxW="1200px">
        <Stack
          spacing={4}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={4} direction="row" alignItems="center">
            <LinkBox
              as={Link}
              fontSize="xl"
              to={user ? '/tasks' : '/'}
              color={colorMode === 'light' ? 'gray.900' : 'white'}
              fontWeight="bold"
            >
              To Do
            </LinkBox>

            {user && location.pathname === '/tasks' && (
              <InputGroup w="75" mr={3}>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Search Tasks"
                  name="search"
                  onChange={onChange}
                />
              </InputGroup>
            )}
          </Stack>
          <Stack direction="row" spacing={4}>
            <IconButton
              aria-label="Toggle Theme"
              icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
              onClick={toggleColorMode}
            />
            {user ? (
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
                    <MenuItem as={Link} to="/profile" icon={<SettingsIcon />}>
                      Your Profile
                    </MenuItem>
                    <MenuItem as={Link} to="/tasks" icon={<EditIcon />}>
                      Your Tasks
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
            ) : (
              <Stack spacing={4} direction="row">
                <Button colorScheme="pink" as={Link} to="/login">
                  Login
                </Button>
                <Button
                  as={Link}
                  colorScheme="blue"
                  variant="outline"
                  to="/signup"
                >
                  Sign Up
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
