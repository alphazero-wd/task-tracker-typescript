import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Container, Heading, Stack, Text } from '@chakra-ui/layout';
import { NextPage } from 'next';
import heroImg from '../images/hero_img.svg';
import NextImage from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <Container p={5} mt={5} maxW="1200px">
      <Stack
        justifyContent="center"
        spacing={8}
        alignItems="center"
        direction={['column-reverse', 'column-reverse', 'row']}
      >
        <Stack
          spacing={4}
          maxW="500px"
          textAlign={['center', 'center', 'start']}
        >
          <Heading fontSize={['2xl', '3xl', '4xl', '5xl']}>
            Task Management in Just One Click
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, magnam. Autem omnis corporis fuga maxime magni ipsam
            eius eveniet tempora.
          </Text>
          <Button w={['100%', '100%', '25%']} colorScheme="blue">
            <Link href="/user/login">Join Now</Link>
          </Button>
        </Stack>
        <Image as={NextImage} src={heroImg} w={['100%', '60%', '40%']} />
      </Stack>
    </Container>
  );
};

export default Home;
