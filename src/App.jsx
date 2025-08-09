import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './assets/navbar/Navbar';
import Footer from "./assets/footer/Footer"
import Header from './assets/header/Header';
import Home from "./components/home/Home"
import Hqs from './components/hqs/Hqs';

function App() {
  return (
    <Router className='body'>
      <Header />
      <main>
        <Navbar />
        <Routes>

          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/HQs" element={<Hqs />} />

        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;