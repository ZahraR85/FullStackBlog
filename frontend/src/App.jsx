import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import UpdatePost from './pages/UpdatePost';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/edit/:id" element={<UpdatePost />} />
            </Routes>
        </Router>
    );
}

export default App;
