import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function BoardEdit() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios.get(`/api/board/${id}`).then((res) => setBoard(res.data));
  }, [id]);

  function handleClickSave() {
    axios
      .put(`/api/board/edit`, board)
      .then(() => {
        toast({
          status: "success",
          description: `${board.id}번 게시물이 수정되었습니다.`,
          position: "top",
          duration: 3000,
        });
        navigate(`/board/${board.id}`);
      })
      .catch((err) => {
        toast({
          status: "error",
          description: `게시물이 수정되지 않았습니다. 작성한 내용을 확인해주세요.`,
          position: "top",
          duration: 3000,
        });
      })
      .finally(() => onClose());
  }

  if (board === null) {
    return (
      <Center mt={5}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Center mt={5}>
      <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input
              value={board.title}
              onChange={(e) => setBoard({ ...board, title: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>본문</FormLabel>
            <Textarea
              value={board.content}
              onChange={(e) => setBoard({ ...board, content: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>작성자</FormLabel>
            <Input
              value={board.writer}
              onChange={(e) => setBoard({ ...board, writer: e.target.value })}
            />
          </FormControl>
          <Button colorScheme="blue" onClick={onOpen} width="100%">
            저장
          </Button>
        </VStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>게시물 수정</ModalHeader>
          <ModalBody>변경된 내용을 저장하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleClickSave} colorScheme="blue" ml={3}>
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
