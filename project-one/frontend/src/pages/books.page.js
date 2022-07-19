import React, { useEffect, useState } from "react";
import api from "../api/config";
import { FaTrashAlt } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BooksList = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const response = await api.get("/books");

      if (response.data) {
        setBookList(response.data);
      }
    }

    getBooks();
  }, []);

  const deleteBook = async (id, idx) => {
    const data = window.confirm("Are you sure you want to Delete ?");
    if (data) {
      try {
        const response = await api.delete(`/books/${id}`);
        if (response.data.success) {
          const newBookList = bookList.filter((book, index) => index !== idx);
          setBookList(newBookList);

          toast.success("Book deleted succesfully.");
        } else {
          toast.error("Unable to delete the book.");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <center>
      <ToastContainer />
      <h1>Books List</h1>
      {bookList.length > 0
        ? bookList.map((book, index) => {
            return (
              <div
                key={index}
                style={{
                  boxShadow: "0px 0px 5px #ccc",
                  padding: "10px",
                  margin: "10px",
                  color: "green",
                  width: "45%",
                  textAlign: "start",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {book.name}
                <FaTrashAlt
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteBook(book.id, index)}
                />
              </div>
            );
          })
        : "No Books"}
    </center>
  );
};

export default BooksList