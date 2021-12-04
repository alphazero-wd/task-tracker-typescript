import { Container, Heading, Stack, Box } from "@chakra-ui/layout";
import { Button, FormLabel, Text, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import AuthInput from "../../components/Auth/AuthInput";
import ConfirmModal from "../../components/shared/ConfirmModal";

const Profile: FC = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [profile, setProfile] = useState({
    username: "",
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateUsername = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const updatePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <Heading mb={5}>Your Profile</Heading>
        <form onSubmit={updateUsername}>
          <FormLabel>Username:</FormLabel>
          <Stack spacing={4}>
            <AuthInput
              name="username"
              placeholder="Edit your username here..."
              onChange={onChange}
              value={profile.username}
            />
            <Button colorScheme="blue" type="submit">
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
                />
                <AuthInput
                  name="newPassword"
                  placeholder="New Password"
                  type="password"
                  onChange={onChange}
                  value={profile.newPassword}
                />
                <AuthInput
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  type="password"
                  onChange={onChange}
                  value={profile.confirmNewPassword}
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
      <ConfirmModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Profile;
