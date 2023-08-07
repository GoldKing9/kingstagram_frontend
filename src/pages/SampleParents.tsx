import './components/App.css'
import Feed from './pages/Feed';

const isAuth : boolean = false;

function SP() {
    if (isAuth) { // 피드
        return (
            <Feed />
        )
    }
    else {
        return (
            <Login />
        )
    }
}

export default SP;