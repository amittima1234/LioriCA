import './HomePage.css';
import { NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <header className="header">
            <div className="text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary-main">Liori-CA</span>
                    <span className="heading-primary-sub">
                        פה מקבלים תעודות
                    </span>
                </h1>
                <NavLink to="/login">
                    <button className="btn btn-white btn-animated">
                        התחברות
                    </button>
                </NavLink>
            </div>
        </header>
    );
};

export default HomePage;
