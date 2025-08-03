import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import GlobalStyle from "./pages/GlobalStyles";
import Main from "./pages/Main";
import My from "./pages/My";
import Home from "./pages/Home.";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/my" element={<My />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
