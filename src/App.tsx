import './components/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from "./pages/NotFound.tsx";

function App() {

    return (
        <Router>
                <Routes>
                    {/*<Route path="/" element={<SampleParents />} /> */}
                    <Route path="/feed" element={<Feed />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
        </Router>
    )
}

export default App;
