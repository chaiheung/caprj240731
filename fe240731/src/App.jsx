import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./page/Home.jsx";
import { MainPage } from "./page/MainPage.jsx";
import { MemberSignup } from "./page/member/MemberSignup.jsx";
import { MemberLogin } from "./page/member/MemberLogin.jsx";
import { MemberPage } from "./page/member/MemberPage.jsx";
import { MemberEdit } from "./page/member/MemberEdit.jsx";
import { BoardWrite } from "./page/board/BoardWrite.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { BoardEdit } from "./page/board/BoardEdit.jsx";
import { LoginProvider } from "./component/LoginProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <MainPage /> }, // 메인페이지 렌더링
      { path: "member/signup", element: <MemberSignup /> }, // 회원 가입
      { path: "member/login", element: <MemberLogin /> }, // 회원 로그인
      { path: "member/page/:id", element: <MemberPage /> }, // 회원 페이지
      { path: "member/edit/:id", element: <MemberEdit /> }, // 회원 정보 수정 및 탈퇴
      { path: "board/write", element: <BoardWrite /> }, // 게시판 글쓰기
      { path: "board/list", element: <BoardList /> }, // 게시판 목록
      { path: "board/:id", element: <BoardView /> }, // 게시글 보기
      { path: "board/edit/:id", element: <BoardEdit /> }, // 게시글 수정
    ],
  },
]);

function App(props) {
  return (
    <LoginProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </LoginProvider>
  );
}

export default App;
