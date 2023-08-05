import './components/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './pages/Feed';



function App() {

    return (
        <Router>
                <Routes>
                    <Route path="/feed" element={<Feed />} />
                </Routes>
        </Router>
    )
}

export default App;
