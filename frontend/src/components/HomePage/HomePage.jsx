import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="text-box">
        <h1 className="heading-primary">
          <span className="heading-primary-main">Liori-CA</span>
          <span className="heading-primary-sub">פה מקבלים תעודות</span>
        </h1>

        <button className="btn btn-white btn-animated" onClick={onButtonClick}>
          התחברות
        </button>
      </div>
    </header>
  );
}
