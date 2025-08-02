/* eslint-disable @typescript-eslint/no-explicit-any */
import { TiArrowForward, TiArrowBack } from "react-icons/ti";
import { useState } from "react";
import BookCard from "@/components/Card/BookCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBooksQuery } from "@/redux/Api/baseApi";

const genreOptions = [
  "ALL",
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

const Home = () => {
  const [genreFilter, setGenreFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const limit = 9;

  const queryParam: Record<string, string | number> = {
    page,
    limit,
  };

  if (genreFilter !== "ALL") {
    queryParam.genre = genreFilter;
  }

  const { data, isLoading } = useGetBooksQuery(queryParam, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  console.log(data);
  
  const books = data?.data || [];
  const meta = data?.meta;

  const handleGenreChange = (value: string) => {
    setGenreFilter(value);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Library Books</h1>


      <div className="flex justify-end mb-6">
        <Select value={genreFilter} onValueChange={handleGenreChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Genre" />
          </SelectTrigger>
          <SelectContent>
            {genreOptions.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>


      {isLoading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length > 0 ? (
            books.map((book: any) => (
              <BookCard key={book._id} book={book} />
            ))
          ) : (
            <p className="text-center col-span-3">No books found.</p>
          )}
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

export default Home;
