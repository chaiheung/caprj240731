import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function handleClickSave() {
    setLoading(true);
    axios
      .post("/api/board/create", {
        title,
        content,
      })
      .then(() => {
        toast({
          description: "새 글이 등록되었습니다.",
          status: "success",
          position: "top",
          duration: 3000,
        });
        navigate("/board/list");
      })
      .catch((e) => {
        toast({
          status: "error",
          description: "등록되지 않았습니다. 입력한 내용을 확인하세요.",
          position: "top",
          duration: 3000,
        });
      })
      .finally(() => setLoading(false));
  }

  const isFormValid = title.trim() && content.trim();

  return (
    <Center mt={5}>
      <Box w={500} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>제목</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>본문</FormLabel>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormControl>
          <Button
            mt={5}
            width={"100%"}
            isLoading={loading}
            isDisabled={!isFormValid}
            cursor={!isFormValid ? "not-allowed" : "pointer"}
            colorScheme="blue"
            _hover={
              !isFormValid ? {} : { bgColor: "blue.600 ", color: "yellow.400" }
            }
            onClick={handleClickSave}
          >
            저장
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
