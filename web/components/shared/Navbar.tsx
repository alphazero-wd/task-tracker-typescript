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
import { FC } from 'react';
import Link from 'next/link';
import { useMeQuery } from '../../generated/graphql';

const Navbar: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data } = useMeQuery();
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
              fontSize="xl"
              // to={user ? "/tasks" : "/"}
              color={colorMode === 'light' ? 'gray.900' : 'white'}
              fontWeight="bold"
            >
              To Do
            </LinkBox>

            <InputGroup w="75" mr={3}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input type="text" placeholder="Search Tasks" name="search" />
            </InputGroup>
          </Stack>
          <Stack direction="row" spacing={4}>
            <IconButton
              aria-label="Toggle Theme"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
            />
            {data?.me ? (
              <Menu>
                <MenuButton
                  rightIcon={<ChevronDownIcon />}
                  as={Button}
                  colorScheme="pink"
                >
                  Profile
                </MenuButton>
                <MenuList>
                  <MenuGroup title={`Hello ${data.me.username}`}>
                    <MenuItem icon={<SettingsIcon />}>Your Profile</MenuItem>
                    <MenuItem icon={<EditIcon />}>Your Tasks</MenuItem>
                    <MenuItem icon={<ArrowForwardIcon />}>Logout</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            ) : (
              <Stack spacing={4} direction="row">
                <Button colorScheme="pink">
                  <Link href="/user/login">Login</Link>
                </Button>
                <Button colorScheme="blue" variant="outline">
                  <Link href="/user/signup">Sign up</Link>
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
