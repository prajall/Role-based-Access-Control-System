import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h3>Home</h3>
      <Link to={"/roles"}>Manage Roles</Link>
    </div>
  );
};

export default Home;
