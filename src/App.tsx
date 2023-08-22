import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "components/SignUpForm"; 
import LoginForm from "components/LoginForm"; 
import Feed from "components/Feed";
import ROUTES from "constants/routes";
import Record from "types/record";
import "./App.css";



const App: React.FC = () => {
  const [users, setUsers] = useState<Record[]>([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path= {ROUTES.root}
          element={<SignUpForm records={users} setRecords={setUsers} />}
        />
        <Route path={ROUTES.Login_Form} element={<LoginForm records={users} />} />
        <Route path={ROUTES.Feed} element={<Feed />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


