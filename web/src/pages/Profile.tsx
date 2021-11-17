import { Container, Heading, Stack, Box } from "@chakra-ui/layout";
import {
  Alert,
  AlertIcon,
  Button,
  FormLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import AuthInput from "../components/Auth/AuthInput";
import ConfirmModal from "../components/ConfirmModal";
import { updateProfile } from "../reducers/user";
import { useAppSelector, useAppDispatch } from "../store";
const Profile: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { message, user, error } = useAppSelector(state => state.user);
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (user) {
      setProfile({ ...profile, username: user.username });
    }
  }, [user]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateUsername = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   make PUT request to the server
    dispatch(updateProfile({ username: profile.username }));
  };

  const updatePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   make PUT the passwords to the server
    dispatch(
      updateProfile({
        password: profile.password,
        newPassword: profile.newPassword,
        confirmNewPassword: profile.confirmNewPassword,
      })
    );
    setProfile({
      ...profile,
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };
  return (
    <>
      <Container maxW="900px" p={5} mt={5}>
        {" "}
        {message && (
          <Alert mb={5} status="success">
            <AlertIcon />
            {message}
          </Alert>
        )}
        <Heading mb={5}>Your Profile</Heading>
        <form onSubmit={updateUsername}>
          <FormLabel>Username:</FormLabel>
          <Stack spacing={4}>
            <AuthInput
              name="username"
              placeholder="Edit your username here..."
              onChange={onChange}
              value={profile.username}
              error={error}
            />
            <Button
              disabled={
                !profile.username || profile.username === user?.username
              }
              colorScheme="blue"
              type="submit"
            >
              Edit
            </Button>
          </Stack>
        </form>
        <Stack mt={8}>
          <Box>
            <Heading mb={3} fontSize="xl">
              Change Your Password
            </Heading>
            <form onSubmit={updatePassword}>
              <FormLabel>
                It's always a good idea to strengthen your password.
              </FormLabel>
              <Stack spacing={4}>
                <AuthInput
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={onChange}
                  value={profile.password}
                  error={error}
                />
                <AuthInput
                  name="newPassword"
                  placeholder="New Password"
                  type="password"
                  onChange={onChange}
                  value={profile.newPassword}
                  error={error}
                />
                <AuthInput
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  type="password"
                  onChange={onChange}
                  value={profile.confirmNewPassword}
                  error={error}
                />
                <Button
                  isDisabled={
                    !profile.password ||
                    !profile.confirmNewPassword ||
                    !profile.newPassword
                  }
                  colorScheme="blue"
                  type="submit"
                >
                  Change Password
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Stack mt={8} spacing={4}>
          <Heading fontSize="xl">Delete Your Account</Heading>
          <Text>There is no going back. Please be certain.</Text>
          <Button onClick={onOpen} colorScheme="red">
            Delete Account
          </Button>
        </Stack>
      </Container>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        confirmationMessage={user!.username}
      />
    </>
  );
};

export default Profile;
