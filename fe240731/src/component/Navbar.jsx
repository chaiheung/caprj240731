import { useNavigate } from "react-router-dom";
import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import writeImage from "../../public/img/writelogo.png";
import { LoginContext } from "./LoginProvider";
import axios from "axios";

export function Navbar() {
  const navigate = useNavigate();
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const nickname = memberInfo?.nickname || null;

  const handleLogout = async () => {
    try {
      const formData = new FormData();
      formData.append("nickname", nickname);
      const response = await axios.post("/api/member/logout", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setMemberInfo(null);
        localStorage.removeItem("memberInfo");
        navigate("/member/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleClickLogo = () => {
    if (memberInfo) {
      navigate("/board/list");
    } else {
      navigate("/");
    }
  };

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
          onClick={handleClickLogo}
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          className="transition duration-300 ease-in-out"
        />
        <HStack
          mr={50}
          spacing={8}
          className="transition duration-300 ease-in-out"
        >
          {memberInfo ? (
            <>
              <Box
                onClick={() => navigate("/board/write")}
                cursor="pointer"
                _hover={{ color: "yellow.400" }}
                fontWeight="semibold"
                fontSize="lg"
              >
                글쓰기
              </Box>
              <Box
                onClick={() => navigate(`/member/page/${memberInfo.id}`)}
                cursor="pointer"
                _hover={{ color: "yellow.400" }}
                fontWeight="semibold"
                fontSize="lg"
              >
                {nickname}님
              </Box>
              <Box
                onClick={handleLogout}
                cursor="pointer"
                _hover={{ color: "yellow.400" }}
                fontWeight="semibold"
                fontSize="lg"
              >
                LOGOUT
              </Box>
            </>
          ) : (
            <Text
              onClick={() => navigate("/member/login")}
              cursor="pointer"
              _hover={{ color: "yellow.400" }}
              fontWeight="semibold"
              fontSize="lg"
            >
              LOGIN
            </Text>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
