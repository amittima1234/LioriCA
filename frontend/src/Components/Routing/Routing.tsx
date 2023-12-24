import AllCertificates from '../AllCertificates/AllCertificates';
import Certificates from '../Certificates/Certificates';
import Login from '../Login/Login';
import NewCertificate from '../NewCertificate/NewCertificate';
import Register from '../Register/Register';

const { Navigate, Routes, Route } = require('react-router-dom');
const { default: HomePage } = require('../HomePage/HomePage');

const Routing = () => {
    return (
        <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/certificates/new" element={<NewCertificate />} />
            <Route path="/certificates/all" element={<AllCertificates />} />
            <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
    );
};

export default Routing;
