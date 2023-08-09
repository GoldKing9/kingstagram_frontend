import './components/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';

function App() {

    return (
        <Router>
                <Routes>
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/" element={<Login />} />
                </Routes>
        </Router>
    )
}

export default App;
