import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home.page";
import Dashboard from "./pages/dashboard.page";
import BooksList from "./pages/books.page";
import CreateBook from "./pages/books.create.page";
import "./assets/sass/main.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books">
          <Route index element={<BooksList />} />
          <Route path="create" element={<CreateBook />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
