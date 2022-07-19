import React, { useState } from 'react'
import "../assets/sass/form.scss";
import api from '../api/config.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBook = () => {
  const [formData, setFormData] = useState({});
  const [imageData, setImageData] = useState({});

  const handleChange = (e) => {
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const storeBook = async (e) => {
    e.preventDefault();
    try{
      const response = await api.post('/books', {
        ...formData,
        image: imageData
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      if(response.data.id){
        // console.log(response);
        e.target.reset();
        setFormData({});
        setImageData();
        
        toast.success("Added new book successfully.");
      }else{
        toast.error(response.data.message);
        // console.log(response.data.message);
      }
    }catch(err){
      toast.error(err.message);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <ToastContainer />
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