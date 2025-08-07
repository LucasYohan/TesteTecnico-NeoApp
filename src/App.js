import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './assets/navbar/Navbar';
import Footer from "./assets/footer/Footer"
import Header from './assets/header/Header';
import Home from "./components/home/Home"

function App() {
  return (
    <BrowserRouter className='body'>

      <Header />
      <main>
        <Navbar />
        <Routes>

          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;