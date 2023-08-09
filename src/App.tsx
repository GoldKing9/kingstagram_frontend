import './components/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';
import Myprofile from './pages/Myprofile';

function App() {

    return (
        <Router>
                <Routes>
                    <Route path= "/feed" element={<Feed />} />
                    <Route path= "/myprofile" element={<Myprofile />} />
                </Routes>
        </Router>
    )
}

export default App;
