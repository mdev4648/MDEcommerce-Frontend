import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import PersistLogin from "./features/auth/PersistLogin";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import Checkout from "./pages/Checkout";
// import Orders from "./pages/Orders";
// import Profile from "./pages/Profile";
// import Wishlist from "./pages/Wishlist";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <ThemeProvider>

      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        {/* PRODUCT */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* PROTECTED */}
        {/* <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        /> */}

      </Routes>

    </ThemeProvider>
  );
}

export default App;