import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home.page";
import Explore from "./pages/explore.page";
import Dashboard from "./pages/dashboard.page";
import BooksList from "./pages/books.page";
import CreateBook from "./pages/books.create.page";
import "./assets/sass/main.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/books">
          <Route index element={<BooksList />} />
          <Route path="create" element={<CreateBook />} />
        </Route>
        <Route path="*" element={<b>404 | Page not found!</b>} />
      </Routes>
    </Router>
  );
}

export default App;
