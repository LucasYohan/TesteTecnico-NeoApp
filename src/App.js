import './App.css';
import { HashRouter, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from './components/shopping_cart/CartContext';
import Footer from "./assets/footer/Footer";
import Header from './assets/header/Header';
import Home from "./components/home/Home";
import Hqs from './components/hqs/Hqs';
import HqPage from './components/hqs/HqPage';
import Shopping_cart from "./components/shopping_cart/Shopping_cart";
import User from './components/user/User';

function App() {
  return (
    <CartProvider>
      <HashRouter basename="/" className='body'>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/HQs" element={<Hqs />} />
            <Route path="/HQs/:hero" element={<Hqs />} />
            <Route path="/Carrinho" element={<Shopping_cart />} />
            <Route path="/Conta" element={<User />} />
            <Route path="/hq/:id" element={<HqPage />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </CartProvider>
  );
}

export default App;
