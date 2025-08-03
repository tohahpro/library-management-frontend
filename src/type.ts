export interface Book {
    _id: string;
    title: string;
    author: string;
    image: string,
    genre: string;
    isbn: string;
    imageURL:string;
    description: string;
    copies: number;
    available: boolean;
}
export interface Borrow {
    _id: string;
    book: string;
    quantity: number;
    dueDate: string;
}
export interface BorrowSummary {
    book: {
        title: string;
        isbn: string;
    };
    totalQuantity: number;
}