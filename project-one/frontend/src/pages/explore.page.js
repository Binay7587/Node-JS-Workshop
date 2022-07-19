import React from 'react'
import { useLocation } from 'react-router-dom'

const Explore = () => {
  const book = useLocation().state.book;
//   console.log(book);

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "20px", boxShadow: "0px 0px 5px #ccc", marginLeft: "20px", marginTop: '20px', cursor: "pointer" }}>
      <img src={book.image} alt="book" style={{ height: "250px", width: "250px", objectFit: "content" }} />
      <h3>{book.name}</h3>
      <small><b>Author:</b> {book.author}</small>
      <small><b>Genre:</b> {book.genre}</small>
      <small><b>Description:</b> {book.description}</small>
    </div>
  )
}

export default Explore