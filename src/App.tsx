import './components/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Myprofile from './pages/Myprofile';


function App() {

    return (
        <Router>
                <Routes>
                    <Route path="/myprofile" element={<Myprofile />} />
                </Routes>
        </Router>
    )
}

export default App;
