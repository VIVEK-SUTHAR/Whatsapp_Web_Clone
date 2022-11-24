import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Chat from './Chat';
import Login from './Login';
import Sidebar from './Sidebar';
import { useStateValue } from './StateProvider';
function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <Router>
      <div className="App">
        {user ? (
          <Login />
        ) : (<div className="app__body">
          <Sidebar />
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat />} />
            <Route path="/" element={<Chat></Chat>}></Route>
          </Routes>
        </div>)}

      </div>
    </Router>
  );
}

export default App;
