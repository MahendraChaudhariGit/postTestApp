import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import PostList from './components/PostList.tsx';
import PostView from './components/PostView.tsx';

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/home" element={<PostList />} />
            <Route path="/post/view" element={<PostView />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
