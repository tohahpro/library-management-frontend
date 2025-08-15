import { Outlet } from "react-router";
import Navbar from "./Layout/navbar";
import Footer from "./Layout/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="max-w-[85rem] mx-auto min-h-screen flex flex-col px-5 xl:p-0">      
        <Navbar />
        <Toaster position="top-right" />
        <div className="grow-1">
          <Outlet />
        </div>
        <Footer />      
    </div>
  );
};

export default App;