import {
  SearchIcon,
  ChevronDownIcon,
  SettingsIcon,
  ArrowForwardIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FC, useEffect, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { clearMessage, logout } from "../reducers/user";
import jwtDecode from "jwt-decode";

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Navbar: FC<Props> = ({ onChange }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
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

  return (
    <Box bg={colorMode === "light" ? "white" : "gray.700"} p={4}>
      <Container maxW="1200px">
        <Flex justifyContent="space-between" alignItems="center">
          <LinkBox
            as={Link}
            fontSize="xl"
            to={user ? "/tasks" : "/"}
            color={colorMode === "light" ? "gray.900" : "white"}
            fontWeight="bold"
          >
            To Do
          </LinkBox>
          <IconButton
            aria-label="Toggle Theme"
            icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
            onClick={toggleColorMode}
          />

          {user ? (
            <>
              <InputGroup w="75">
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type="text"
                  placeholder="Search Tasks"
                  name="search"
                  focusBorderColor="white"
                  onChange={onChange}
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
                    <MenuItem as={Link} to="/profile" icon={<SettingsIcon />}>
                      Your Profile
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
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
