import { Container, Heading, LinkBox, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { NextPage } from "next";
import { ChangeEvent, FormEvent, useState } from "react";
import AuthInput from "../../components/Auth/AuthInput";

const Login: NextPage = () => {
  const [loginValues, setLoginValues] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
  };

  return (
    <Container maxW="700px" p={5} mt={5}>
      <Heading fontSize="3xl" textAlign="center" mb={3}>
        Login To Your Account
      </Heading>
      <form onSubmit={onSubmit}>
        <Stack spacing={4} mt={5}>
          <AuthInput
            onChange={onChange}
            placeholder="Username Or Email"
            name="usernameOrEmail"
            value={loginValues.usernameOrEmail}
          />

          <AuthInput
            onChange={onChange}
            placeholder="Password"
            name="password"
            type="password"
            value={loginValues.password}
          />

          <LinkBox color="blue.500">Forgot Password?</LinkBox>
          <Button
            type="submit"
            colorScheme="blue"
            isDisabled={!loginValues.usernameOrEmail || !loginValues.password}
          >
            Login
          </Button>
        </Stack>
      </form>
      <Text textAlign="center" mt={4}>
        Don't Have An Account? <LinkBox color="blue.500">Sign Up</LinkBox>
      </Text>
    </Container>
  );
};

export default Login;
