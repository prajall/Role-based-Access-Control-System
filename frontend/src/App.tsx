import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RoleManagement from "./pages/RoleManagement";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roles" element={<RoleManagement />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
