import {
  Container,
  Heading,
  LinkBox,
  UnorderedList,
  Text,
  ListItem,
} from "@chakra-ui/layout";
import { Alert, AlertIcon, Button, Stack } from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import AuthInput from "../components/Auth/AuthInput";
import { signUp } from "../reducers/user";
import { SignUp as SignUpInterface } from "../utils/types";
import { Link } from "react-router-dom";

const SignUp: FC = () => {
  const dispatch = useAppDispatch();
  const { error, loading, message } = useAppSelector(state => state.user);
  const [signUpValues, setSignUpValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignUpValues({ ...signUpValues, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: SignUpInterface = {
      username: signUpValues.username,
      email: signUpValues.email,
      password: signUpValues.password,
      confirmPassword: signUpValues.confirmPassword,
    };
    dispatch(signUp(newUser));

    setSignUpValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Container maxW="700px" p={5} mt={5}>
      <Heading fontSize="3xl" textAlign="center" mb={3}>
        Sign Up
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack spacing={4} mt={5}>
          {message && (
            <Alert status="success">
              <AlertIcon />
              {message}
            </Alert>
          )}
          <AuthInput
            onChange={onChange}
            placeholder="Username"
            name="username"
            error={error}
            value={signUpValues.username}
          />
          <AuthInput
            onChange={onChange}
            placeholder="Email address"
            name="email"
            error={error}
            value={signUpValues.email}
          />
          <AuthInput
            onChange={onChange}
            placeholder="Password"
            name="password"
            type="password"
            error={error}
            value={signUpValues.password}
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
            placeholder="Confirm Password"
            onChange={onChange}
            name="confirmPassword"
            type="password"
            error={error}
            value={signUpValues.confirmPassword}
          />
          <Button
            type="submit"
            colorScheme="blue"
            isDisabled={
              !signUpValues.username ||
              !signUpValues.email ||
              !signUpValues.password ||
              !signUpValues.confirmPassword
            }
            isLoading={loading}
          >
            Sign Up
          </Button>
        </Stack>
      </form>
      <Text textAlign="center" mt={4}>
        Already Have An Account?{" "}
        <LinkBox as={Link} to="/login" color="blue.500">
          Login
        </LinkBox>
      </Text>
    </Container>
  );
};

export default SignUp;
