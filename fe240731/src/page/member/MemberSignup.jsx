import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer } from "@fortawesome/free-solid-svg-icons";

export function MemberSignup(props) {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isUsernameConfirmed, setIsUsernameConfirmed] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isNicknameConfirmed, setIsNicknameConfirmed] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const isPasswordRight = password === confirmPassword;

  const isFormValid =
    isUsernameValid &&
    isUsernameConfirmed &&
    isNicknameValid &&
    isNicknameConfirmed &&
    isPasswordValid &&
    isPasswordRight;

  // 이메일 유효성 검사
  function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test(
      username,
    );
    setIsUsernameValid(usernameRegex);
  }

  // 닉네임 유효성 검사
  function validateNickname(nickname) {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{3,12}$/.test(nickname);
    setIsNicknameValid(nicknameRegex);
  }

  // 비밀번호 유효성 검사
  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(
        password,
      );
    setIsPasswordValid(passwordRegex);
  }

  // 이메일 중복확인
  function handleCheckUsername() {
    if (!isUsernameValid) return; // 이메일 유효성 검사를 통과한 경우에만 요청
    axios
      .get(`/api/member/check?username=${username}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 이메일입니다.",
          position: "top",
          duration: 3000,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 이메일입니다.",
            position: "top",
            duration: 3000,
          });
          setIsUsernameConfirmed(true); // 이메일 확인 상태 업데이트
        }
      })
      .finally();
  }

  // 닉네임 중복확인
  function handleCheckNickname() {
    if (!isNicknameValid) return; // 닉네임 유효성 검사를 통과한 경우에만 요청
    axios
      .get(`/api/member/check?nickname=${nickname}`)
      .then((res) => {
        toast({
          status: "warning",
          description: "사용할 수 없는 닉네임입니다.",
          position: "top",
          duration: 3000,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast({
            status: "info",
            description: "사용할 수 있는 닉네임입니다.",
            position: "top",
            duration: 3000,
          });
          setIsNicknameConfirmed(true); // 닉네임 확인 상태 업데이트
        }
      })
      .finally();
  }

  // 이메일 재입력
  function handleReenterUsername() {
    setUsername(""); // 이메일 입력란 초기화
    setIsUsernameConfirmed(false); // 이메일 확인 상태 초기화
    setIsUsernameValid(false); // 이메일 유효성 초기화
  }

  // 닉네임 재입력
  function handleReenterNickname() {
    setNickname(""); // 닉네임 입력란 초기화
    setIsNicknameConfirmed(false); // 닉네임 확인 상태 초기화
    setIsNicknameValid(false); // 닉네임 유효성 초기화
  }

  // 비밀번호 보기/숨기기
  function handleClickPassword() {
    setShowPassword(!showPassword);
  }

  // 제출
  function handleClickSubmit() {
    const signupData = {
      username: username,
      nickname: nickname,
      password: password,
    };
    console.log("signupData:", signupData);

    axios
      .post("/api/member/signup", signupData)
      .then((res) => {
        Swal.fire({
          title: "회원가입이 완료되었습니다.",
          text: "로그인 페이지로 이동합니다.",
          icon: "success",
          confirmButtonText: "확인",
        }).then(() => {
          navigate("/member/login");
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "회원가입에 실패하였습니다.",
          text: "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
          icon: "error",
          confirmButtonText: "확인",
        });
      });
  }

  return (
    <Center mt={5}>
      <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Box mb={10} fontSize="2xl" fontWeight="bold" textAlign="center">
          회원가입
        </Box>
        <FormControl isRequired mb={4}>
          <InputGroup>
            <Input
              placeholder={"이메일"}
              value={username}
              readOnly={isUsernameConfirmed} // 이메일 확인 후 readOnly 설정
              onChange={(e) => {
                setUsername(e.target.value.trim());
                validateUsername(e.target.value.trim());
              }}
              backgroundColor={isUsernameConfirmed ? "gray.200" : "white"}
            />
            <InputRightElement w={"100px"} mr={1}>
              {isUsernameConfirmed ? (
                <Button
                  size={"sm"}
                  variant="ghost"
                  onClick={handleReenterUsername}
                  _hover={{ color: "red.500 " }}
                >
                  <FontAwesomeIcon icon={faHammer} />
                </Button>
              ) : (
                <Button
                  size={"sm"}
                  onClick={handleCheckUsername}
                  isDisabled={!isUsernameValid}
                  cursor={!isUsernameValid ? "not-allowed" : "pointer"}
                  _hover={
                    !isUsernameValid
                      ? { bgColor: "gray.100" }
                      : { bgColor: "purple.500 ", color: "white" }
                  }
                >
                  중복확인
                </Button>
              )}
            </InputRightElement>
          </InputGroup>
          {!isUsernameValid && username && (
            <Alert status="error" mt={2}>
              <AlertIcon />
              올바르지 않은 이메일 형식입니다.
            </Alert>
          )}
        </FormControl>
        <FormControl isRequired mb={4}>
          <InputGroup>
            <Input
              placeholder={"닉네임"}
              value={nickname}
              readOnly={isNicknameConfirmed} // 닉네임 확인 후 readOnly 설정
              onChange={(e) => {
                setNickname(e.target.value.trim());
                validateNickname(e.target.value.trim());
              }}
              backgroundColor={isNicknameConfirmed ? "gray.200" : "white"}
            />
            <InputRightElement w={"100px"} mr={1}>
              {isNicknameConfirmed ? (
                <Button
                  size={"sm"}
                  variant="ghost"
                  onClick={handleReenterNickname}
                  _hover={{ color: "red.500 " }}
                >
                  <FontAwesomeIcon icon={faHammer} />
                </Button>
              ) : (
                <Button
                  size={"sm"}
                  onClick={handleCheckNickname}
                  isDisabled={!isNicknameValid}
                  cursor={!isNicknameValid ? "not-allowed" : "pointer"}
                  _hover={
                    !isNicknameValid
                      ? { bgColor: "gray.100" }
                      : { bgColor: "purple.500 ", color: "white" }
                  }
                >
                  중복확인
                </Button>
              )}
            </InputRightElement>
          </InputGroup>
          {!isNicknameValid && nickname && (
            <Alert status="error" mt={2}>
              <AlertIcon />
              닉네임은 3~12자 사이의 한글, 영문, 숫자로 구성되어야 합니다.
            </Alert>
          )}
        </FormControl>
        <FormControl isRequired mb={4}>
          <InputGroup>
            <Input
              placeholder="비밀번호"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value.trim());
                validatePassword(e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              {password && (
                <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                  {showPassword ? "숨기기" : "보기"}
                </Button>
              )}
            </InputRightElement>
          </InputGroup>
          {!isPasswordValid && password && (
            <Alert status="error" mt={2}>
              <AlertIcon />
              비밀번호는 최소 8자에서 최대 16자 사이
              <br />
              영문 대소문자, 숫자, 특수문자를 포함해야 합니다.
            </Alert>
          )}
        </FormControl>
        <FormControl isRequired mb={4}>
          <InputGroup>
            {password && (
              <Input
                placeholder="비밀번호 확인"
                value={confirmPassword}
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  setConfirmPassword(e.target.value.trim());
                }}
              />
            )}
          </InputGroup>
          {confirmPassword && (
            <Alert status={isPasswordRight ? "success" : "error"} mt={2}>
              <AlertIcon />
              {isPasswordRight
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."}
            </Alert>
          )}
        </FormControl>
        <Button
          mt={5}
          width={"100%"}
          isDisabled={!isFormValid}
          cursor={!isFormValid ? "not-allowed" : "pointer"}
          colorScheme="blue"
          _hover={
            !isFormValid ? {} : { bgColor: "blue.600 ", color: "yellow.400" }
          }
          onClick={handleClickSubmit}
        >
          제출
        </Button>
      </Box>
    </Center>
  );
}
