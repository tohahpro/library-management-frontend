import { Outlet } from "react-router";
import Navbar from "./Layout/navbar";


const App = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-5 xl:p-0">
      <Navbar/>
      <Outlet/>
    </div>
  );
};

export default App;