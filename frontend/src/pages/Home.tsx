import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { AppContext } from "../contexts/Appcontext";

const Home = () => {
  const { appData, isLoadingAppData } = useContext(AppContext);
  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      <p className="text-center text-teal-950 text-5xl font-bold max-w-[600px] mx-auto ">
        Role Based Access Control System
      </p>

      <p className="text-center text-xl text-gray-600 max-w-[600px] mx-auto mt-6 ">
        This system helps you to manage your staffs and assign various roles and
        permissions they can access.
      </p>
      {!appData.user && !isLoadingAppData && (
        <Link
          to={"/login"}
          className="bg-teal-600 text-white py-2 rounded-md hover:bg-teal-500 w-fit mx-auto px-6 mt-4"
        >
          Login
        </Link>
      )}
      {appData.user && (
        <div className="flex justify-center gap-3 mt-6">
          <Button
            variant={"outline"}
            className=" border border-orange-500 text-orange-500 hover:text-orange-500 hover:bg-orange-50"
          >
            View Products
          </Button>
          <Button
            variant={"outline"}
            className=" border border-blue-500 text-blue-500 hover:text-blue-500 hover:bg-blue-50"
          >
            Manage Users
          </Button>
          <Link to="/roles">
            <Button
              variant={"outline"}
              className=" border border-emerald-500 text-emerald-500 hover:text-emerald-500 hover:bg-emerald-50"
            >
              Roles & Permissions
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
