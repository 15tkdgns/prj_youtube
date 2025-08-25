import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import ScrapbookPage from "./pages/ScrapbookPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="bg-red-500 text-white px-4 py-3 flex items-center gap-4">
          <h1 className="font-bold text-xl flex-1">
            <Link to="/" className="hover:opacity-90">
              유튜브 스크랩북
            </Link>
          </h1>
          <nav className="flex gap-3 text-sm">
            <Link to="/">Home</Link>
            <Link to="/scrapbook">Scrapbook</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/scrapbook" element={<ScrapbookPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
