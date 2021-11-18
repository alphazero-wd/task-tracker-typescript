import { Button } from '@chakra-ui/button';
import { Container, Heading, Stack, Text } from '@chakra-ui/layout';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: FC = () => {
  return (
    <Container maxW="500px" mt={5} p={5} textAlign="center">
      <Heading mb={4} fontSize="4xl">
        Page Not Found
      </Heading>
      <Text mb={4}>
        It seems like you are trying to access a page that does not exist.
      </Text>
      <Button colorScheme="blue">
        <Link to="/">Back to Home</Link>
      </Button>
    </Container>
  );
};

export default ErrorPage;
