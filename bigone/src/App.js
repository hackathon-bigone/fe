import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import GlobalStyle from "./pages/GlobalStyles";
import My from "./pages/My";
import Home from "./pages/Home.";
import Purchase from "./pages/Purchase";
import P_Detail from "./pages/PurDetail";
import PurWrite from "./pages/PurWrite";
import PurEdit from "./pages/PurEdit";
import Recipe from "./pages/Recipe";
import R_Detail from "./pages/ReDetail";
import ReWrite from "./pages/ReWrite";
import ReEdit from "./pages/ReEdit";
import Refri from "./pages/Refri";
import Wrote from "./pages/Wrote";
import PurHistory from "./pages/PurHistory";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Menu from "./pages/Menu";
import Edit from "./pages/Edit";
import Nick from "./pages/NickEdit";
import Password from "./pages/Password";
import RefEv from "./pages/RefriEv";
import RefPlus from "./pages/RefriPlus";
import RefDel from "./pages/RefDel";
import Receipt from "./pages/Receipt";
import RefWrite from "./pages/RefWrite";
import Scan from "./pages/Scan";
import ScanCom from "./pages/ScanCom";
import Inform from "./pages/Information";
import Inform_Detail from "./pages/InformationD";
import QnA from "./pages/QnA";
import QnADetail from "./pages/QnADetail";
import QnAWrite from "./pages/QnAWrite";
import Scrap from "./pages/Scrap";
import ScrapPur from "./pages/ScPur";
import ScanRes from "./pages/ScanRes";
import ComW from "./pages/ComW";
import ComP from "./pages/ComP";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my" element={<My />} />
        <Route path="/" element={<Home />} />
        <Route path="/purchase/edit/:user_id" element={<PurEdit />} />
        <Route path="/purchase/detail/:user_id" element={<P_Detail />} />
        <Route path="/purchase/write" element={<PurWrite />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/recipe/detail/:id" element={<R_Detail />} />
        <Route path="/recipe/write" element={<ReWrite />} />
        <Route path="/recipe/edit/:user_id" element={<ReEdit />} />
        <Route path="/refrigerator" element={<Refri />} />
        <Route path="/my/wrote/recipe" element={<Wrote />} />
        <Route path="/my/wrote/purchase" element={<PurHistory />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/my/edit" element={<Edit />} />
        <Route path="/my/edit/nickname" element={<Nick />} />
        <Route path="/my/edit/password" element={<Password />} />
        <Route path="/my/inform" element={<Inform />} />
        <Route path="/my/inform/detail/:id" element={<Inform_Detail />} />
        <Route path="/my/question" element={<QnA />} />
        <Route path="/my/question/detail/:id" element={<QnADetail />} />
        <Route path="/my/question/write" element={<QnAWrite />} />
        <Route path="/refrigerator/ingredients" element={<RefEv />} />
        <Route path="/refrigerator/ingredients/edit" element={<RefPlus />} />
        <Route path="/refrigerator/ingredients/delete" element={<RefDel />} />
        <Route path="/refrigerator/ingredients/write" element={<RefWrite />} />
        <Route path="/refrigerator/ingredients/receipt" element={<Receipt />} />
        <Route
          path="/refrigerator/ingredients/receipt/scan"
          element={<Scan />}
        />
        <Route
          path="/refrigerator/ingredients/receipt/scan/complete"
          element={<ScanCom />}
        />
        <Route path="/my/scrap" element={<Scrap />} />
        <Route path="/my/scrap/purchase" element={<ScrapPur />} />
        <Route
          path="/refrigerator/ingredients/receipt/scan/result"
          element={<ScanRes />}
        />
        <Route path="/my/comment" element={<ComW />} />
        <Route path="/my/comment/purchase" element={<ComP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
