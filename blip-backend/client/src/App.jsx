import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Registration from './components/Registration'
import FileUpload from './components/FileUpload'
const App = () => {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Registration />} />
    <Route path="/upload" element={<FileUpload />} />

    </Routes>
    </Router>
  );
};

export default App;
