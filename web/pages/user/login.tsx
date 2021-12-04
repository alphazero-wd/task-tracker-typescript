import { Container, Heading, LinkBox, Stack, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { NextPage } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';
import Link from 'next/link';
import AuthInput from '../../components/Auth/AuthInput';
import { useLoginMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';

const Login: NextPage = () => {
  const [loginValues, setLoginValues] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [login, { data, loading }] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login({ variables: { user: loginValues } });
    if (response.data?.login.user) {
      localStorage.setItem('token', JSON.stringify(response.data.login.token));
      setLoginValues({ usernameOrEmail: '', password: '' });
      router.push('/tasks');
    } else if (response.data?.login.error) {
      setLoginValues({
        ...loginValues,
        [response.data.login.error.field as string]: '',
      });
    }
    return response;
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
            error={data?.login.error}
          />

          <AuthInput
            onChange={onChange}
            placeholder="Password"
            name="password"
            type="password"
            value={loginValues.password}
            error={data?.login.error}
          />

          <LinkBox color="blue.500">Forgot Password?</LinkBox>
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
        Don't Have An Account?
        <LinkBox color="blue.500" display="inline">
          {' '}
          <Link href="/user/signup">Sign up</Link>
        </LinkBox>
      </Text>
    </Container>
  );
};

export default Login;
