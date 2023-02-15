import React from "react";
import { Route, Routes } from "react-router-dom";
import PostListPage from "./pages/PostListPage";
import PostPage from "./pages/PostPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritePage from "./pages/WriterPage";
import { Helmet } from "react-helmet-async";


//exact가 필요하지 않다면 /*로 와일드카드 표시를 해준다 원래 24번쨰중 /과 :사이에 골뱅이있어야함
//724page에 유저네임에 대한 골뱅이 표시가 나온다
const App = () =>{
  return(
    <>
    <Helmet>
      <title>Y-log</title>
    </Helmet>
    <Routes>
      <Route element={<PostListPage/>} path="/:username" />
      <Route element={<PostListPage/>} path="/" />
      <Route element={<LoginPage/>} path="/login" />
      <Route element={<RegisterPage/>} path="/register" />
      <Route element={<WritePage/>} path="/write" />
      <Route element={<PostPage/>} path="/:username/:postId" />
    </Routes>
    </>
  );
};
export default App;