import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useState } from 'react';
import { loginUser } from 'renderer';

const Home = () => {
  const [token, setToken] = useState('');
  const [disable, setDisable] = useState(false);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  // const [monitorMessage, setMonitorMessage] = useState('');

  const handelLogin = async () => {
    if (token && !disable) {
      setDisable(true);
      const res: any = await loginUser(token);
      if (res?.login) {
        setUserName(res?.username);
      } else {
        setError(res?.message);
      }
      setDisable(false);
    }
  };

  return (
    <div className="home">
      <input
        placeholder="Enter discord token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handelLogin}>Login User</button>
      {userName && <div>Logged in as {userName}</div>}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
