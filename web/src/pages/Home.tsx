import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Container, Flex, Heading, Stack, Text } from '@chakra-ui/layout';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../images/hero_img.svg';
const Home: FC = () => {
  return (
    <Container p={5} mt={5} maxW="1200px">
      <Stack
        justifyContent="center"
        alignItems="center"
        direction={['column', 'column', 'row']}
      >
        <Stack spacing={4} maxW="500px">
          <Heading fontSize="4xl">Task Management in Just One Click</Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, magnam. Autem omnis corporis fuga maxime magni ipsam
            eius eveniet tempora.
          </Text>
          <Button
            as={Link}
            w={['100%', '100%', '25%']}
            to="/login"
            colorScheme="blue"
          >
            Join Now
          </Button>
        </Stack>
        <Image flexGrow={1} src={heroImg} w={['100%', '75%', '50%']} />
      </Stack>
    </Container>
  );
};

export default Home;
