import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Registration from './components/Registration';
import FileUpload from './components/FileUpload';
import { AuthProvider } from './components/AuthContext.jsx';
import Intro from './components/Intro'
const App = () => {
  const [token, setToken ] = useState(localStorage.getItem('token') || '');
  return (
    <AuthProvider>
    <Router>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login setToken={setToken} />} />
    <Route path="/signup" element={<Registration />} />
    <Route path="/upload" element={<FileUpload token={ token }/>} />
    <Route path="/a" element={<Intro/>} />
    </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
