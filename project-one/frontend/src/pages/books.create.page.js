import React, { useState } from 'react'
import "../assets/sass/form.scss";
import api from '../api/config.js';

const CreateBook = () => {
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState({});

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const storeBook = async (e) => {
    e.preventDefault();
    const response = await api.post('/books', {
      ...formData,
      image: imageData
    }, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
    });
    console.log(response);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={storeBook}>
        Name
        <input type="text" name="name" onChange={handleChange} placeholder="Name" />
        Author
        <input type="text" name="author" onChange={handleChange} placeholder="Author" />
        Genre
        <input type="text" name="genre" onChange={handleChange} placeholder="Genre" />
        Description
        <textarea name="description" onChange={(handleChange)} cols="30" rows="10" placeholder="Description"></textarea>
        Image
        <input type="file" name="image" onChange={(e) => setImageData(e.target.files[0])} />

        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default CreateBook