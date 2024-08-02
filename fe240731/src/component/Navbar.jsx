import { useNavigate } from "react-router-dom";
import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

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
      >
        <Text
          onClick={() => navigate("/")}
          cursor="pointer"
          _hover={{ color: "yellow.400" }}
          fontWeight="bold"
          fontSize="2xl"
          className="transition duration-300 ease-in-out"
        >
          LOGO
        </Text>
        <HStack spacing={8} className="transition duration-300 ease-in-out">
          <Text
            onClick={() => navigate("/")}
            cursor="pointer"
            _hover={{ color: "yellow.400" }}
            fontWeight="semibold"
            fontSize="lg"
          >
            HOME
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
          <Text
            onClick={() => navigate("/board/list")}
            cursor="pointer"
            _hover={{ color: "yellow.400" }}
            fontWeight="semibold"
            fontSize="lg"
          >
            목록
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
}
