import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export function BoardView() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get(`/api/board/${id}`)
      .then((res) => setBoard(res.data))
      .catch((err) => {
        toast({
          status: "info",
          description: "해당 게시물이 존재하지 않습니다.",
          position: "top",
          duration: 3000,
        });
        navigate("/");
      });
  }, [id, navigate, toast]);

  function handleClickRemove() {
    axios
      .delete(`/api/board/${id}`)
      .then(() => {
        toast({
          status: "success",
          description: `해당 게시물이 삭제되었습니다.`,
          position: "top",
          duration: 3000,
        });
        navigate("/");
      })
      .catch(() => {
        toast({
          status: "error",
          description: `해당 게시물 삭제 중 오류가 발생하였습니다.`,
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
      <Box w={600} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Flex justify="space-between" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">
            {board.title}
          </Text>
          <Flex direction="column" align="flex-end">
            <Text>
              {" "}
              {new Date(board.inserted).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </Text>
          </Flex>
        </Flex>
        <Textarea value={board.content} readOnly size="sm" mb={4} />
        <Flex justify="flex-end">
          <IconButton
            icon={<FaPencilAlt />}
            onClick={() => navigate(`/board/edit/${board.id}`)}
            aria-label="Edit post"
            variant="ghost"
            size="lg"
            colorScheme="blue"
            mr={2}
          />
          <IconButton
            icon={<FaTrash />}
            onClick={onOpen}
            aria-label="Delete post"
            variant="ghost"
            size="lg"
            colorScheme="red"
          />
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>게시물 삭제</ModalHeader>
          <ModalBody>정말로 삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={handleClickRemove} colorScheme="red" ml={3}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
}
