import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Uploud from './upload';
import Navbar from './navbar';
import './app.css';

export default function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Uploud />} />
        </Routes>
      </Router>
    </div>
  );
}
