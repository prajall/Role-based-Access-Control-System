import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RoleManagement from "./pages/RoleManagement";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-10 lg:px-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
