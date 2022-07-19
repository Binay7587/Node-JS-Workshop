import React, { useEffect, useState } from 'react';
import api from "../api/config.js";

const HomePage = () => {
  const [bookList, setBookList] = useState([]);
  const [tempBookList, setTempBookList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function getBooks() {
      const books =  await api.get("/books");
      // console.log(books.data);
      setBookList(books.data);
      setTempBookList(books.data);
    }

    getBooks();
  }, []);

  useEffect(() => {
    async function searchBooks() {
      const book =  await api.get(`/books/search?q=${searchText}`);
      // console.log(book.data);
      if(book.data){
        setBookList(book.data);
      }
    }

    if(searchText) searchBooks();
    else setBookList(tempBookList);
  }, [searchText]);

  return (
    <>
      <center>
        <input 
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search Books..."
          style={{ width: "55%", margin:"20px", padding:"10px" }} 
        />
      </center>
      <div style={{ display:"flex", flexWrap:"wrap", alignItems:'center', justifyContent:'center' }}>
      {bookList.length>0 ? bookList.map((book, index) =>{
          return <div key={index} style={{ display: "flex", flexDirection: "column", padding: "20px", boxShadow: "0px 0px 5px #ccc", marginLeft: "20px", marginTop:'20px' }}>
            <img src={book.image} alt="book" style={{height: "250px", width: "250px", objectFit:"content"}} />
            <h3>{book.name}</h3>
            <p>{book.description}</p>
            </div>
        }) : "No Books Found!"}
      </div>
    </>
  );
};

export default HomePage