import React from 'react';
import './HomePage.css';

export default function HomePage() {
  return (
    <header className="header">
        <div className="text-box">
            <h1 className="heading-primary">
                <span className="heading-primary-main">Liori-CA</span>
                <span className="heading-primary-sub">פה מקבלים תעודות</span>
            </h1>

            <a href="#" className="btn btn-white btn-animated">התחברות</a>
        </div>
    </header>
  );
}
