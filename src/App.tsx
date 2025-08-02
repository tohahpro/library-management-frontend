import { Outlet } from "react-router";
import Navbar from "./Layout/navbar";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="max-w-[85rem] mx-auto px-5 xl:p-0">
      <Navbar/>
       <Toaster position="top-right" />
      <Outlet/>
    </div>
  );
};

export default App;