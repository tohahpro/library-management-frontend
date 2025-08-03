import { createBrowserRouter } from "react-router";
import App from "../App";
import AddBook from "../Pages/AddBook";
import Home from "@/Pages/Home";
import bookDetails from "@/Pages/bookDetails";
import borrowBooks from "@/Pages/borrowBooks";
import AllBooks from "@/Pages/AllBooks";
import BookUpdate from "@/components/Book/BookUpdate";


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
                path: '/books',
                Component: AllBooks
            },
            {
                path: 'create-book',
                Component: AddBook
            },
            {
                path: 'book/:id',
                Component: bookDetails
            },
            {
                path: 'book-update/:id',
                Component: BookUpdate
            },
            {
                path: 'borrow',
                Component: borrowBooks
            },
        ]
    },
]);

export default router