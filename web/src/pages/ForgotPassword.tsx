import { FC, FormEvent, useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  Container,
  Heading,
  LinkBox,
  Stack,
  Text,
} from "@chakra-ui/react";
import AuthInput from "../components/Auth/AuthInput";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { forgotPassword } from "../reducers/user";
const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const { message, error } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  if (message) {
    return (
      <Container p={5} mt={5} maxWidth="700px">
        <Stack spacing={4}>
          <Heading fontSize="3xl" textAlign="center">
            Email Sent
          </Heading>
          <Text>
            Reset Password Confirmation has been sent to your email account.
            Please check (include in the trash).
          </Text>
          <LinkBox as={Link} color="blue.500" to="/forgot-password">
            Change your email?
          </LinkBox>
        </Stack>
      </Container>
    );
  }

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
