import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './pages/Background';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Donation from './pages/Donation';
import MyDrug from './pages/MyDrug';

function App() {
  let [username, setUsername] = useState(false);

  return (
    <div className="App">
      <Header
        username={username}
        setUsername={setUsername}
      />
      <div className="background">


        <Routes>
          <Route path="/" element={<Background />} />
          <Route path="/login" element={<LoginPage
            setUsername={setUsername} 
            />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/myDrug" element={<MyDrug />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
