import { Button } from "@chakra-ui/button";
import {
  Container,
  Heading,
  Stack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/layout";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import AuthInput from "../components/Auth/AuthInput";
import { useAppDispatch, useAppSelector } from "../store";
import { resetPassword } from "../reducers/user";

const ResetPassword: FC = () => {
  const { message, loading, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const { token } = useParams();
  const [resetValues, setResetValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResetValues({ ...resetValues, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        token,
        password: resetValues.password,
        confirmPassword: resetValues.confirmPassword,
      })
    );
  };

  return (
    <Container maxW="700px" p={5} mt={5}>
      <Heading textAlign="center" fontSize="2xl" mb={5}>
        Reset Password
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          {message && (
            <Alert status="success">
              <AlertIcon />
              {message}
            </Alert>
          )}
          <AuthInput
            placeholder="New Password"
            name="password"
            onChange={onChange}
            type="password"
            error={error}
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
            error={error}
            value={resetValues.confirmPassword}
          />
          <Button
            colorScheme="blue"
            isDisabled={!resetValues.password || !resetValues.confirmPassword}
            isLoading={loading}
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
