# 📚 Library Management System

A library management system that is both responsive and simple, using React, Redux Toolkit Query, TypeScript, and Tailwind CSS.  Users can effectively examine, manage, and borrow books thanks to the system's clear user interface, appropriate state management, and RESTful API connection.

# 🚀 Live Site

 [Visit Site](https://librarymanagement-jade.vercel.app)

# 🧰 Tech Stack

| Layer | Tech Used |
|----------|----------|
| Frontend   | React, TypeScript   |
| State Mgmt   |Redux Toolkit, RTK Query   |
| Styling   | Tailwind CSS   |
| Backend   | Node.js, Express.js, TypeScript   |
| Database   | 	MongoDB, Mongoose   |


# 🔑 Key Features

## ✅ Public Routes
All pages are accessible without authentication.
Clean navigation through a minimal layout.
## 📖 Book Management
List all books in a table view.
Add new books with a form.
Edit or delete existing books.
Borrow a book directly from the list.

> 📌 Business Logic:

> If a book’s copy count is 0, it’s marked as Unavailable.
> Borrow quantity cannot exceed available copies.


# 📦 Borrow Management
- Borrow books by specifying quantity and due date.
- Automatically reduces available copies.
- If copies reach 0, availability is updated.


# 📊 Borrow Summary
- Aggregated view of borrowed books.
- Displays total borrowed quantity per book.


# 📄 Page Structure

| Route             | Description                                  |
|-------------------|----------------------------------------------|
| `/books`          | Lists all books with actions (edit, delete, borrow) |
| `/create-book`    | Form to add a new book                       |
| `/books/:id`      | Detailed view of a single book               |
| `/edit-book/:id`  | Edit a book's information                    |
| `/borrow/:bookId` | Borrow form for the selected book            |
| `/borrow-summary` | Summary of all borrowed books                |

# 💻 UI Components
- Navbar: Links to All Books, Add Book, and Borrow Summary
- Book Table: Lists books with actions
- Forms: Add/Edit books, Borrow form
- Footer: Standard info section

# 🌟 Bonus Features

| Feature               | Status                          |
|-----------------------|---------------------------------|
| Responsive Layout     | ✅ Completed                   |
| Optimistic UI Updates | ✅ Implemented                 |
| Toast Notifications   | ✅ Implemented                 |
| Type-Safe Forms       | ✅ Done using React Hook Form  |


# ⚙️ How to Run Locally
## 🖥️ Frontend
```
# Clone the repo
git clone https://github.com/tohahpro/library-management-frontend.git

# Navigate into project
cd library-management-frontend

# Install dependencies
npm install

# Start development server
npm run dev

```




























