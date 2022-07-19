const API_URL =  process.env.API_URL ?? "http://localhost:8000";

export default{
    BOOK_IMG_PATH_URL: `${API_URL}/uploads/books/`,
    ASSETS_PATH_URL: `${API_URL}/assets/`,
};