import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import UploudReqFrom from "../pages/uploadReqForm";
import Navbar from "../components/navbar";
import styles from "./index.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="login" element={<Login />} />
            <Route path="uploadReqForm" element={<UploudReqFrom />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
