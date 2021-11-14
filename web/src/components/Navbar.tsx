import {
  SearchIcon,
  ChevronDownIcon,
  SettingsIcon,
  ArrowForwardIcon,
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
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { clearMessage, logout } from "../reducers/user";

const Navbar: FC = () => {
  const { user } = useAppSelector(state => state.user);
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    dispatch(clearMessage());
  }, [location]);
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
