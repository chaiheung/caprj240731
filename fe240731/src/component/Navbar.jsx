import { useNavigate } from "react-router-dom";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import writeImage from "../../public/img/writelogo.png";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <Box w="full" bg="blue.600" boxShadow="lg" py={4} px={6}>
      <Flex
        maxW="800px"
        color="white"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        borderRadius="md"
        height="60px"
      >
        <Image
          src={writeImage}
          alt="Write"
          height="30vh"
          width="auto"
          onClick={() => navigate("/")}
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          className="transition duration-300 ease-in-out"
        />
        <HStack
          mr={50}
          spacing={8}
          className="transition duration-300 ease-in-out"
        >
          <Text
            onClick={() => navigate("/board/list")}
            cursor="pointer"
            _hover={{ color: "yellow.400" }}
            fontWeight="semibold"
            fontSize="lg"
          >
            목록
          </Text>
          <Text
            onClick={() => navigate("/board/write")}
            cursor="pointer"
            _hover={{ color: "yellow.400" }}
            fontWeight="semibold"
            fontSize="lg"
          >
            글쓰기
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
}
