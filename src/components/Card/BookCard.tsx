/* eslint-disable @typescript-eslint/no-explicit-any */

import { PiBookOpenText } from "react-icons/pi";
import { Link } from "react-router";

const BookCard = ({ book }: any) => {
    return (
        <div>
            <div className="card bg-base-100 w-fit shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt={`${book.title}`}
                    />
                </figure>

                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div
                                data-tooltip="author-2"
                                className="bg-red-300 break-words rounded py-1 px-3 font-sans text-sm font-medium focus:outline-none">
                                {book.genre}
                            </div>
                        </div>
                    </div>
                    <p className="text-lg font-medium">{book.title.length > 30 ? `${book.title.slice(0, 30)}...` : book.title}</p>
                    <p className="font-medium">{book.author}</p>
                    <span className="absolute top-3 right-3 text-xs font-semibold text-white bg-cyan-600/90 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        {book.available ? "Available" : "Unavailable"}
                    </span>
                    <div className="flex justify-between">
                        <Link to={`books/${book._id}`} className="btn btn-primary w-3/4">View Details</Link>
                        <Link to={`/borrow/${book?._id}`} className="px-2 py-1 flex items-center rounded text-white bg-[#E59285]">
                            <PiBookOpenText className="font-bold text-2xl" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;