/* eslint-disable @typescript-eslint/no-explicit-any */
import { TiArrowForward, TiArrowBack } from "react-icons/ti";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetBooksQuery } from "@/redux/Api/baseApi";


const AllBooks = () => {
  
  const [page, setPage] = useState(1);
  const limit = 9;

  const queryParam: Record<string, string | number> = {
    page,
    limit,
  };


  const { data, isLoading } = useGetBooksQuery(queryParam, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  console.log(data);
  
  const books = data?.data || [];
  const meta = data?.meta;


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">List Of Books</h1>




      {isLoading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#E59285]">
              <TableRow>
                <TableHead className="text-white">No</TableHead>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white">ISBN</TableHead>
                <TableHead className="text-white">Author</TableHead>
                <TableHead className="text-white">Genre</TableHead>
                <TableHead className="text-white">Availability</TableHead>
                <TableHead className="text-white">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.length > 0 ? (
                books.map((book: any, idx: number) => (
                  <TableRow key={book._id}>
                    <TableCell>{(page - 1) * limit + idx + 1}</TableCell>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.availability ? "Available" : "Unavailable"}</TableCell>
                    <TableCell>
                        
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No books found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}



      {/* Pagination */}
      {meta && (
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            className={`px-2 py-1 bg-[#F1F1F1] rounded disabled:opacity-50 ${page > 1 ? "animate-pulse text-lg" : ""
              }`}
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            <TiArrowBack className="text-[#7a453d]" />
          </button>
          <span className="text-md font-medium font-[Montserrat]">
            Page {meta.currentPage} of {meta.totalPages}
          </span>
          <button
            className={`px-2 py-1 bg-[#F1F1F1] rounded disabled:opacity-50 ${page < meta.totalPages ? "animate-pulse text-lg" : ""
              }`}
            disabled={page >= meta.totalPages}
            onClick={() => setPage(page + 1)}
          >
            <TiArrowForward className="text-[#7a453d]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
