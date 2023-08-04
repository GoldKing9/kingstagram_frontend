import './components/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Feed from './pages/Feed';



function App() {

    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/feed" element={<Feed />} />
                </Routes>
        </Router>
    )
}

export default App
