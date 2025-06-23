import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Maritda</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/editor">Editor</Link>
        </nav>
      </header>
      <hr />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<EditorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App; 