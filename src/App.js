import './App.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './pages/Background';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="background">


        <Routes>
          <Route path="/" element={<Background />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/findPW" element={<FindPWPage />} />
        <Route path="/myInfo" element={<MyInfo />} />
        <Route path="/resetPW" element={<ResetPW />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
