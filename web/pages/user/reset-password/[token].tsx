import { Button } from "@chakra-ui/button";
import {
  Container,
  Heading,
  Stack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/layout";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import AuthInput from "../../../components/Auth/AuthInput";

const ResetPassword: FC = () => {
  const [resetValues, setResetValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResetValues({ ...resetValues, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container maxW="700px" p={5} mt={5}>
      <Heading textAlign="center" fontSize="2xl" mb={5}>
        Reset Password
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <AuthInput
            placeholder="New Password"
            name="password"
            onChange={onChange}
            type="password"
            value={resetValues.password}
          />
          <UnorderedList px={5}>
            <ListItem>Password should be above 6 characters.</ListItem>
            <ListItem>
              Password should contain one lowercase and one uppercase letter.
            </ListItem>
            <ListItem>
              Password should contain a number and a special character.
            </ListItem>
          </UnorderedList>
          <AuthInput
            placeholder="Confirm New Password"
            name="confirmPassword"
            onChange={onChange}
            type="password"
            value={resetValues.confirmPassword}
          />
          <Button
            colorScheme="blue"
            isDisabled={!resetValues.password || !resetValues.confirmPassword}
            type="submit"
          >
            Change Password
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ResetPassword;
