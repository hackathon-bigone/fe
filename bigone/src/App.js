import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import GlobalStyle from "./pages/GlobalStyles";
import Main from "./pages/Main";
import My from "./pages/My";
import Home from "./pages/Home.";
import Purchase from "./pages/Purchase";
import Recipe from "./pages/Recipe";
import Refri from "./pages/Refri";
import Wrote from "./pages/Wrote";
import PurHistory from "./pages/PurHistory";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/my" element={<My />} />
        <Route path="/home" element={<Home />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/refrigerator" element={<Refri />} />
        <Route path="/my/wrote/recipe" element={<Wrote />} />
        <Route path="/my/wrote/purchase" element={<PurHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
