import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Container, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { FC } from "react";
import { Link } from "react-router-dom";
import heroImg from "../images/hero_img.svg";
const Home: FC = () => {
  return (
    <Container p={5} mt={5} maxW="1200px">
      <Stack
        justifyContent="center"
        spacing={8}
        alignItems="center"
        direction={["column-reverse", "column-reverse", "row"]}
      >
        <Stack
          spacing={4}
          maxW="500px"
          textAlign={["center", "center", "start"]}
        >
          <Heading fontSize={["2xl", "3xl", "4xl", "5xl"]}>
            Task Management in Just One Click
          </Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, magnam. Autem omnis corporis fuga maxime magni ipsam
            eius eveniet tempora.
          </Text>
          <Button
            as={Link}
            w={["100%", "100%", "25%"]}
            to="/login"
            colorScheme="blue"
          >
            Join Now
          </Button>
        </Stack>
        <Image src={heroImg} w={["100%", "60%", "40%"]} />
      </Stack>
    </Container>
  );
};

export default Home;
