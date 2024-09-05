import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ManageProducts from "./pages/ManageProducts";
import ManageUsers from "./pages/ManageUsers";
import NewProduct from "./pages/NewProduct";
import RoleManagement from "./pages/RoleManagement";
import axios from "axios";

function App() {
  const fetchENV = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/env`);
      if (response.status === 200) {
        sessionStorage.setItem("ENV", JSON.stringify(response.data));
      }
      console.log("ENV files:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchENV();
  }, []);
  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-10 lg:px-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roles" element={<RoleManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manage-users" element={<ManageUsers />} />

          <Route path="/manage-products" element={<ManageProducts />} />
          <Route path="/manage-products/new" element={<NewProduct />} />
          <Route path="/manage-products/:id" element={<NewProduct />} />
          <Route path="/manage-products/:id/edit" element={<NewProduct />} />
        </Routes>
      </div>
    </>
  );
}
//commiting ok
export default App;
