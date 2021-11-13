import {
  AtSignIcon,
  EmailIcon,
  SearchIcon,
  SettingsIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  LinkBox,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useAppSelector } from '../store';

const Navbar: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <Box bg="blue.500" p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <LinkBox fontSize="xl" to="/" color="white">
          To Do
        </LinkBox>
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
        {user && (
          <>
            <Menu>
              <MenuButton as={Button} colorScheme="red">
                Profile
              </MenuButton>
              <MenuList>
                <MenuGroup title="Account">
                  <MenuItem>{user?.username}</MenuItem>
                  <MenuItem icon={<EmailIcon />}>{user?.email}</MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="About">
                  <MenuItem icons={<SettingsIcon />}>Profile</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton></MenuButton>
            </Menu>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
