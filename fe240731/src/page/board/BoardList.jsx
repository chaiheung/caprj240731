import { Box, Center, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/board/list").then((res) => setBoardList(res.data));
  }, []);

  return (
    <Center mt={5}>
      <Box w={800} p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>TITLE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList.map((board) => (
              <Tr
                key={board.id}
                _hover={{ bgColor: "gray.100", cursor: "pointer" }}
                onClick={() => navigate(`/board/${board.id}`)}
              >
                <Td>{board.title}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Center>
  );
}
