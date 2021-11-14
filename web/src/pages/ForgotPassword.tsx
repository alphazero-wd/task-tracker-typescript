import { FC, FormEvent, useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import AuthInput from "../components/Auth/AuthInput";
import { useAppDispatch, useAppSelector } from "../store";
import { forgotPassword } from "../reducers/user";
const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const { message, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
          {message && (
            <Alert status="success">
              <AlertIcon />
              {message}
            </Alert>
          )}
          <AuthInput
            name="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="Email Address"
            error={error}
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
