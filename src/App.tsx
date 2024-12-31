import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      {/* Add more routes here */}
    </Routes>
  );
};

export default App;
