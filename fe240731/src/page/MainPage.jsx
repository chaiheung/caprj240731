import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import write2Image from "../../public/img/writelogo2.png";

export const MainPage = () => {
  return (
    <Box bg="black" height="100vh">
      <Flex justify="center" align="center" height="70%">
        <Box textAlign="center" maxW="500%">
          <Image src={write2Image} alt="writelogo" boxSize="500px" />
        </Box>
      </Flex>
    </Box>
  );
};
