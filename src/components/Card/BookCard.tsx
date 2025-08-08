/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { PiBookOpenText } from "react-icons/pi";
import { Link } from "react-router";

const BookCard = ({ book }: any) => {
    console.log(book);
    
    return (
        <div className="flex-1">
            <div className="card bg-base-100 w-fit shadow-sm">
                <figure>
                    <img className="w-full"
                        src={book.imageURL}
                        alt={`${book.title}`}
                    />
                </figure>

                <div className="card-body">
                    <div className="flex items-center justify-between">
                        <div
                            data-tooltip="author-2"
                            className={cn(
                                "text-sm py-0.5 px-3 flex justify-center items-center gap-1 rounded-lg font-medium",
                                {
                                    "bg-[#D4F5DD] text-[#196435] px-4": book.genre == "FANTASY",
                                    "bg-[#f0c6c6] text-[#804d4d] px-4": book.genre == "BIOGRAPHY",
                                    "bg-[#FFE0B5] text-[#882222] px-4": book.genre == "HISTORY",
                                    "bg-[#EFF3EA] text-[#525e42] px-4": book.genre == "SCIENCE",
                                    "bg-[#FFE8CD] text-[#a03131] px-4": book.genre == "NON_FICTION",
                                    "bg-[#CAE8BD] text-[#638156] px-4": book.genre == "FICTION",
                                }
                            )}>
                            {book.genre}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="absolute top-3 right-3 items-center space-x-1">
                            <span className={cn(
                                "text-sm p-1 px-3 flex justify-center items-center gap-1 rounded-xl font-medium",
                                {

                                    "bg-[#D4F5DD] text-[#176132] px-4": book.available == true,
                                    "bg-[#f0c6c6] text-[#af2d2d] px-4": book.available == false,
                                }
                            )}>
                                <p className={cn(
                                    "p-[4px] rounded-full",
                                    {

                                        "bg-[#176132]": book.available == true,
                                        "bg-[#af2d2d]": book.available == false,
                                    }
                                )}></p>
                                {book.available ? "Available" : "Unavailable"}</span>
                        </div>
                    </div>
                        <p className="text-lg font-medium">{book.title.length > 30 ? `${book.title.slice(0, 30)}...` : book.title}</p>
                        <p className="font-light">Author: {book.author}</p>                 
                    <div className="flex justify-between gap-3">
                        <Link to={`books/${book._id}`} className="btn btn-neutral full flex-1">View Details</Link>
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