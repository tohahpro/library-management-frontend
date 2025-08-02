/* eslint-disable @typescript-eslint/no-explicit-any */
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
    genre: genreFilter,
  };

  const { data, isLoading } = useGetBooksQuery(queryParam);

  const books = data?.data || [];
  const meta = data?.meta;

  const handleGenreChange = (value: string) => {
    setGenreFilter(value);
    setPage(1); // Reset to page 1 when filter changes
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Library Books</h1>

      {/* Filter Dropdown */}
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

      {/* Books */}
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
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <span className="text-lg font-semibold">
            Page {meta.currentPage} of {meta.totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            disabled={page >= meta.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
