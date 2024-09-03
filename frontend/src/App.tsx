import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RoleManagement from "./pages/RoleManagement";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ManageUsers from "./pages/ManageUsers";
import ManageProducts from "./pages/ManageProducts";
import ProductForm from "./components/ProductForm";
import NewProduct from "./pages/NewProduct";

function App() {
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
        </Routes>
      </div>
    </>
  );
}
//commiting ok
export default App;
