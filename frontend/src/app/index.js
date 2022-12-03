import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Uploud from "../pages/upload";
import Navbar from "../components/navbar";
import styles from "./index.module.css";

export default function App() {
  return (
    <div className={styles.app}>
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
