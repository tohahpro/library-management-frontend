import { createBrowserRouter } from "react-router";
import App from "../App";
import AddBook from "../Pages/AddBook";
import Home from "@/Pages/Home";
import bookDetails from "@/Pages/bookDetails";
import borrowBooks from "@/Pages/borrowBooks";
import AllBooks from "@/Pages/AllBooks";
import BookUpdate from "@/components/Book/BookUpdate";
import borrowBookForm from "@/Pages/borrowBookForm";


const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children:[
            {
                path: '/',
                Component: Home
            },
            {
                path: 'books',
                Component: AllBooks
            },
            {
                path: 'create-book',
                Component: AddBook
            },
            {
                path: 'books/:id',
                Component: bookDetails
            },
            {
                path: 'edit-book/:id',
                Component: BookUpdate
            },
            {
                path: 'borrow/:bookId',
                Component: borrowBookForm
            },
            {
                path: 'borrow-summary',
                Component: borrowBooks
            },
        ]
    },
]);

export default router