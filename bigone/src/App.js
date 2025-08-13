import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import GlobalStyle from "./pages/GlobalStyles";
import Main from "./pages/Main";
import My from "./pages/My";
import Home from "./pages/Home.";
import Purchase from "./pages/Purchase";
import P_Detail from "./pages/PurDetail";
import PurWrite from "./pages/PurWrite";
import Recipe from "./pages/Recipe";
import R_Detail from "./pages/ReDetail";
import ReWrite from "./pages/ReWrite";
import Refri from "./pages/Refri";
import Wrote from "./pages/Wrote";
import PurHistory from "./pages/PurHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Menu from "./pages/Menu";
import Edit from "./pages/Edit";
import Nick from "./pages/NickEdit";
import Password from "./pages/Password";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my" element={<My />} />
        <Route path="/home" element={<Home />} />
        <Route path="/purchase/detail" element={<P_Detail />} />
        <Route path="/purchase/write" element={<PurWrite />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/recipe/detail" element={<R_Detail />} />
        <Route path="/recipe/write" element={<ReWrite />} />
        <Route path="/refrigerator" element={<Refri />} />
        <Route path="/my/wrote/recipe" element={<Wrote />} />
        <Route path="/my/wrote/purchase" element={<PurHistory />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/my/edit" element={<Edit />} />
        <Route path="/my/edit/nickname" element={<Nick />} />
        <Route path="/my/edit/password" element={<Password />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
