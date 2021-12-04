import type { AppProps } from "next/app";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import theme from "../utils/theme";
import Wrapper from "../components/shared/Wrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ChakraProvider>
  );
}

export default MyApp;
