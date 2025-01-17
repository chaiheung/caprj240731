import React, { useContext, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberLogin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setMemberInfo } = useContext(LoginContext);

  async function handleLogin(event) {
    if (event) event.preventDefault(); // form submit 방지

    setIsLoading(true);
    setError("");

    // 유효성 검사
    if (!username) {
      setError("이메일이 입력되지 않았습니다.");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError("비밀번호가 입력되지 않았습니다.");
      setIsLoading(false);
      return;
    }

    try {
      // FormData 객체 생성
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post("/api/member/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        // 로그인 성공 시 처리
        console.log(response);
        console.log(response.data.nickname);

        const { access, id, nickname } = response.data;
        const memberInfo = { access, id, nickname };
        setMemberInfo(memberInfo);

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem("memberInfo", JSON.stringify(memberInfo));

        navigate("/board/list");
      } else {
        setError("로그인에 실패했습니다.");
      }
    } catch (error) {
      setError("이메일 또는 비밀번호를 다시 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleLogin();
    }
  }

  return (
    <>
      <Center mt={5}>
        <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
          <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
            로그인
          </Box>
          <Box>
            {error && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}
            <FormControl mb={4}>
              <FormLabel>이메일</FormLabel>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="이메일을 입력하세요"
                onKeyPress={handleKeyPress}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>비밀번호</FormLabel>
              <InputGroup>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  onKeyPress={handleKeyPress}
                />
              </InputGroup>
            </FormControl>
            <Box mt={5}>
              <Button
                mt={5}
                width={"100%"}
                height={"50px"}
                colorScheme="blue"
                _hover={{ bgColor: "blue.600 ", color: "yellow.400" }}
                onClick={handleLogin}
                isLoading={isLoading}
              >
                {isLoading ? <Spinner size="sm" /> : "로그인"}
              </Button>
            </Box>
            <Text mt={5} textAlign="center">
              새로운 계정으로 가입하려면{" "}
              <Link
                as={RouterLink}
                to="/member/signup"
                color="blue.500"
                fontWeight="bold"
                _hover={{ textDecoration: "underline" }}
              >
                CLICK
              </Link>
            </Text>
          </Box>
        </Box>
      </Center>
    </>
  );
}
