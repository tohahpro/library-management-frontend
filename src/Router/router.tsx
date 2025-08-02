import { createBrowserRouter } from "react-router";
import App from "../App";
import AddBook from "../Pages/AddBook";
import Home from "@/Pages/Home";
import bookDetails from "@/Pages/bookDetails";


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
                path: 'create-book',
                Component: AddBook
            },
            {
                path: 'book/:id',
                Component: bookDetails
            },
        ]
    },
]);

export default router