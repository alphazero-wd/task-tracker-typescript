import { FormEvent, useState } from "react";
import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import AuthInput from "../../components/Auth/AuthInput";
import { NextPage } from "next";

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Container maxW="750px" p={5} mt={5}>
      <Heading fontSize="3xl" mb={5} textAlign="center">
        Forgot Password
      </Heading>
      <Text mb={5}>
        We will send you a verification message to your email address. Please
        enter your email to continue the process.
      </Text>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <AuthInput
            name="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
            value={email}
          />
          <Button type="submit" colorScheme="blue" isDisabled={!email}>
            Send
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ForgotPassword;
