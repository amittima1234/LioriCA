import Login from '../Login/Login';
import Register from '../Register/Register';

const { Navigate, Routes, Route } = require('react-router-dom');
const { default: HomePage } = require('../HomePage/HomePage');

const Routing = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
    );
};

export default Routing;
