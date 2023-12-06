import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppState } from '../../Redux/AppState';
import './HomePage.css';

const HomePage = () => {
    const user = useSelector((appState: AppState) => appState.user);

    return (
        <header className="header">
            <div className="text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary-main">Liori-CA</span>
                    <span className="heading-primary-sub">
                        פה מקבלים תעודות
                    </span>
                </h1>
                {!user ? (
                    <NavLink to="/login">
                        <button className="btn btn-white btn-animated">
                            התחברות
                        </button>
                    </NavLink>
                ) : (
                    <div className="Menu">
                        <NavLink to="/certificates">
                            <button className="btn btn-white btn-animated">
                                התעודות שלי
                            </button>
                        </NavLink>
                        <NavLink to="/certificates/new">
                            <button className="btn btn-white btn-animated">
                                הנפקת תעודה
                            </button>
                        </NavLink>
                        {user?.role === 'admin' && (
                            <NavLink to="/certificates/all">
                                <button className="btn btn-white btn-animated">
                                    כל התעודות
                                </button>
                            </NavLink>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default HomePage;
