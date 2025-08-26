import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import ScrapbookPage from "./pages/ScrapbookPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import CategoryPage from "./pages/CategoryPage";
import PlaylistPage from "./pages/PlaylistPage";
import { useNavigation } from "./hooks/useNavigation";

function Header() {
  const { isActive } = useNavigation();
  
  return (
    <header className="bg-red-500 text-white px-4 py-3 flex items-center gap-4">
      <h1 className="font-bold text-xl flex-1">
        <Link to="/" className="hover:opacity-90">
          유튜브 스크랩북
        </Link>
      </h1>
      <nav className="flex gap-3 text-sm">
        <Link 
          to="/" 
          className={isActive("/") ? "text-yellow-300 font-bold" : ""}
        >
          Home
        </Link>
        <Link 
          to="/scrapbook" 
          className={isActive("/scrapbook") ? "text-yellow-300 font-bold" : ""}
        >
          Scrapbook
        </Link>
        <Link 
          to="/login" 
          className={isActive("/login") ? "text-yellow-300 font-bold" : ""}
        >
          Login
        </Link>
      </nav>
    </header>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <MenuPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/scrapbook"
              element={
                <ProtectedRoute>
                  <ScrapbookPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
