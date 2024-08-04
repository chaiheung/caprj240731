import React, { useContext, useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function MemberEdit(props) {
  const { memberInfo, setMemberInfo } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [isNicknameConfirmed, setIsNicknameConfirmed] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { id } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordRight = password === confirmPassword;
  const isFormValid = isNicknameValid && isPasswordValid && isPasswordRight;

  useEffect(() => {
    console.log(id);
    if (!memberInfo || (memberInfo.id !== "1" && memberInfo.id !== id)) {
      navigate("/unauthorized"); // 접근 권한이 없을 때 리디렉션할 페이지
      return;
    }

    async function fetchMemberData() {
      try {
        const res = await axios.get(`/api/member/${id}`);
        console.log(res.data);
        const memberData = res.data;
        setUsername(memberData.username);
        setNickname(memberData.nickname);

        // 유효성 검사 초기화
        setIsNicknameValid(true);
      } catch (err) {
        Swal.fire({
          title: "회원 정보를 불러오는 데 실패했습니다.",
          text: "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    }

    fetchMemberData();
  }, [id]);

  function validateNickname(nickname) {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{3,12}$/.test(nickname);
    setIsNicknameValid(nicknameRegex);
  }

  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(
        password,
      );
    setIsPasswordValid(passwordRegex);
  }

  function handleClickPassword() {
    setShowPassword(!showPassword);
  }

  function handleReenterNickname() {
    setNickname(""); // 닉네임 입력란 초기화
    setIsNicknameConfirmed(false); // 닉네임 확인 상태 초기화
    setIsNicknameValid(false); // 닉네임 유효성 초기화
  }

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

  function handleSubmit(event) {
    event.preventDefault();

    const updatedData = {
      nickname: nickname,
      password: password,
    };

    axios
      .put(`/api/member/edit/${id}`, updatedData)
      .then((res) => {
        // Context와 LocalStorage 업데이트
        setMemberInfo((prev) => ({ ...prev, nickname }));
        Swal.fire({
          title: "회원 정보가 업데이트되었습니다.",
          text: "마이페이지로 이동합니다.",
          icon: "success",
          confirmButtonText: "확인",
        }).then(() => {
          navigate(`/member/page/${id}`);
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "회원 정보 업데이트에 실패하였습니다.",
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
          회원 정보 수정
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <InputGroup>
              <Input
                mb={2}
                placeholder={"이메일"}
                value={username}
                readOnly
                backgroundColor={"gray.200"}
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <InputGroup>
              <Input
                mb={2}
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
                        : { bgColor: "blue.600", color: "yellow.400" }
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
          <FormControl>
            <InputGroup>
              <Input
                mb={2}
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
          </FormControl>
          <FormControl>
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
            {!isPasswordValid && password && (
              <Alert status="error" mt={2}>
                <AlertIcon />
                비밀번호는 최소 8자에서 최대 16자 사이
                <br />
                영문 대소문자, 숫자, 특수문자를 포함해야 합니다.
              </Alert>
            )}
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
            type="submit" // 제출 버튼을 폼의 제출 버튼으로 설정
            isDisabled={!isFormValid}
            cursor={!isFormValid ? "not-allowed" : "pointer"}
            _hover={
              !isFormValid
                ? { bgColor: "gray.100" }
                : { bgColor: "blue.600", color: "yellow.400" }
            }
          >
            수정
          </Button>
        </form>
      </Box>
    </Center>
  );
}
