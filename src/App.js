import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar'
import Home from './components/home'
import Leaderboard from './components/leaderboard'
import NoPage from './components/nopage'
import Footer from './components/footer'
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <div>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/leaderboard" element={<Leaderboard/>} />
            <Route path="*" element={<NoPage/>} />
          </Routes>
          <Footer/>
        </div>
    </BrowserRouter>
  )
}

export default App;
