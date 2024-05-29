import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/authService';
import '../styles/Header.scss';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">WeatherApp</Link>
            </div>
            <nav className="nav-links">
                <Link to="/">Главная</Link>
                {isAuthenticated() && <Link to="/search">Поиск по городу</Link>}
                {isAuthenticated() ? (
                    <button onClick={handleLogout}>Выйти</button>
                ) : (
                    <Link to="/login">Войти</Link>
                )}
            </nav>
        </header>
    );
};

export default Header;
