import { NavLink } from "react-router";
import { BiMenuAltRight, BiMenu } from "react-icons/bi";
import { useState } from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <nav className="flex lg:items-center justify-between py-10">
                {/* brand logo  */}
                <div className="flex-1">
                    <h2 className="text-2xl font-extrabold">Book</h2>
                </div>

                {/* mobile view icon  */}

                <div
                    className="flex lg:hidden justify-end text-2xl pr-2 text-slate-400 mt-4"
                    onClick={() => setOpen(!open)}
                >
                    {open === true ? (
                        <BiMenuAltRight></BiMenuAltRight>
                    ) : (
                        <BiMenu></BiMenu>
                    )}
                </div>

                {/* large view hidden and mobile view flex  */}
                <div
                    className={`absolute lg:flex mt-12 w-full py-5 bg-black lg:m-0  lg:p-0 duration-1000
                     ${open ? " " : "hidden"} lg:static lg:bg-transparent text-center space-y-2`}>                    
                    <ul className="lg:hidden lg:gap-5 space-y-2 text-white">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                            ? "text-[#E59285] underline"
                                            : ""
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                            ? "text-[#E59285] underline"
                                            : ""
                                }
                            >
                                Orders
                            </NavLink>
                        </li>

                    </ul>
                </div>

                {/* mobile view hidden  for --------- large view  */}
                <div className="hidden lg:flex items-center lg:gap-5 space-y-2">
                    <ul className="text-lg font-semibold lg:flex gap-8">
                        <li>
                            <NavLink
                                to="/books"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                            ? "text-[#E59285] underline"
                                            : ""
                                }
                            >
                                Books
                            </NavLink>
                        </li>
                        <li className="w-[6.3rem]">
                            <NavLink
                                to="/create-book"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                            ? "text-[#E59285]"
                                            : ""
                                }
                            >
                                Create Book
                            </NavLink>
                        </li>
                        <li className="w-[7.5rem]">
                            <NavLink
                                to="/borrow"
                                className={({ isActive, isPending }) =>
                                    isPending
                                        ? "pending"
                                        : isActive
                                            ? "text-[#E59285]"
                                            : ""
                                }
                            >
                                Borrow Book
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
