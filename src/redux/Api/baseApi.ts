
import type { Book, Borrow, BorrowSummary } from '@/type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// 1st step 
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api` }),
    tagTypes: ["books", 'borrows'],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: (params) => {
                const queryParams = new URLSearchParams();

                if (params?.genre && params.genre !== "ALL") {
                    queryParams.append("filter", params.genre);
                }

                if (params?.page) {
                    queryParams.append("page", String(params.page));
                }
                if (params?.limit) {
                    queryParams.append("limit", String(params.limit));
                }

                return `/books?${queryParams.toString()}`;
            },
            providesTags: ["books"],
        }),
        getBookById: builder.query({
            query: (bookId) => `/books/${bookId}`,
            transformResponse: (response: { success: boolean; message: string; data: Book }) => response.data,
            providesTags: ["books"]
        }),
        createBook: builder.mutation({
            query: (body) => ({
                url: "books",
                method: "POST",
                body
            }),
            invalidatesTags: ["books"]
        }),
        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `books/${id}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ["books"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["books"]
        }),
        borrowBook: builder.mutation<Borrow, { book: string; quantity: number; dueDate: string }>({
            query: (body) => ({
                url: 'borrow',
                method: 'POST',
                body
            }),
            invalidatesTags: ['borrows', 'books']
        }),
        getBorrow: builder.query<BorrowSummary[], void>({
            query: () => '/borrow',
            transformResponse: (response: { success: boolean; message: string; data: BorrowSummary[] }) =>
                response.data,
            providesTags: ['borrows'],
        })
    })
});

// 2nd step 
export const { useGetBooksQuery, useCreateBookMutation, useGetBookByIdQuery, useUpdateBookMutation, useDeleteBookMutation, useBorrowBookMutation, useGetBorrowQuery } = baseApi;
