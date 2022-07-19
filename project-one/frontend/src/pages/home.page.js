import React, { useEffect, useState } from 'react';
import api from "../api/config.js";

const HomePage = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    async function getBooks() {
      const books =  await api.get("/books");
      // console.log(books.data);
      setBookList(books.data);
    }

    getBooks();
  }, []);

  return (
    <div style={{ display:"flex", flexWrap:"wrap", alignItems:'center', justifyContent:'center' }}>
      {bookList.map((book, index) =>{
        return <div key={index} style={{ display: "flex", flexDirection: "column", padding: "20px", boxShadow: "0px 0px 5px #ccc", marginLeft: "20px", marginTop:'20px' }}>
          <img src={book.image} alt="book" style={{height: "250px", width: "250px", objectFit:"content"}} />
          <h3>{book.name}</h3>
          <p>{book.description}</p>
          </div>
      })}
    </div>
  );
};

export default HomePage