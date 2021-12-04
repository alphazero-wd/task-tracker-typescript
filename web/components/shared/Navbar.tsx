import {
  SearchIcon,
  ChevronDownIcon,
  SettingsIcon,
  ArrowForwardIcon,
  SunIcon,
  MoonIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
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
import { FC, useEffect, ChangeEvent } from "react";
import jwtDecode from "jwt-decode";

const Navbar: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={colorMode === "light" ? "white" : "gray.700"} p={4}>
      <Container maxW="1200px">
        <Stack
          spacing={4}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={4} direction="row" alignItems="center">
            <LinkBox
              fontSize="xl"
              // to={user ? "/tasks" : "/"}
              color={colorMode === "light" ? "gray.900" : "white"}
              fontWeight="bold"
            >
              To Do
            </LinkBox>

            <InputGroup w="75" mr={3}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Search Tasks"
                name="search"
                // onChange={onChange}
              />
            </InputGroup>
          </Stack>
          <Stack direction="row" spacing={4}>
            <IconButton
              aria-label="Toggle Theme"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
            <Menu>
              <MenuButton
                rightIcon={<ChevronDownIcon />}
                as={Button}
                colorScheme="pink"
              >
                Profile
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <MenuItem icon={<SettingsIcon />}>Your Profile</MenuItem>
                  <MenuItem icon={<EditIcon />}>Your Tasks</MenuItem>
                  <MenuItem icon={<ArrowForwardIcon />}>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
            <Stack spacing={4} direction="row">
              <Button colorScheme="pink">Login</Button>
              <Button colorScheme="blue" variant="outline">
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
