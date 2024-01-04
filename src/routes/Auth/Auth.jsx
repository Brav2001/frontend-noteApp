import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./Login/Login";
import Register from "./Register/Register";

const Auth = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Auth;
