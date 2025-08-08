/* eslint-disable react-hooks/rules-of-hooks */

import { BorrowBookModal } from "@/components/Borrow/BorrowBookModal";
import { useGetBookByIdQuery } from "@/redux/Api/baseApi";
import { useParams } from "react-router";


const bookDetails = () => {

    const { id } = useParams()

    const { data } = useGetBookByIdQuery(id)

    console.log(data);

    return (
        <>
            <div className="flex justify-between">
                <div className="flex-1">
                    <img className="w-4/6 mx-auto" src={data?.imageURL} alt="" />
                </div>
                <div className="flex-1 font-[Montserrat]">
                    <div className="space-y-2 font-medium">
                        <p className="font-semibold text-2xl py-8">{data?.title}</p>
                        <hr />
                        <p className="text-sm py-4">{data?.description}</p>
                        <p className="text-sm"><span>Author : </span>{data?.author}</p>
                        <p className="text-sm"><span>Availability : </span><span className="text-[#c97263] pl-2">{data?.available ? 'Available' : 'Unavailable'}</span></p>
                        <p className="text-sm"><span>Book Copies : </span>{data?.copies}</p>
                        <p className="text-sm"><span>Book Genres : </span><span className="text-[#c97263] font-semibold">{data?.genre}</span></p>
                        <BorrowBookModal data={data} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default bookDetails;