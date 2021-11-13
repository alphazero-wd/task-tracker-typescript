import { Container, Heading, LinkBox, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthInput from '../components/Auth/AuthInput';
import { login } from '../reducers/user';
import { useAppDispatch, useAppSelector } from '../store';

const Login: FC = () => {
  const { error, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [loginValues, setLoginValues] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      login({
        usernameOrEmail: loginValues.usernameOrEmail,
        password: loginValues.password,
      })
    );
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
            error={error}
          />

          <AuthInput
            onChange={onChange}
            placeholder="Password"
            name="password"
            type="password"
            error={error}
          />
          <Button
            type="submit"
            colorScheme="blue"
            isDisabled={!loginValues.usernameOrEmail || !loginValues.password}
            isLoading={loading}
          >
            Login
          </Button>
        </Stack>
      </form>
      <Text textAlign="center" mt={4}>
        Don't Have An Account?{' '}
        <LinkBox as={Link} color="blue.500" to="/signup">
          Sign Up
        </LinkBox>
      </Text>
    </Container>
  );
};

export default Login;
