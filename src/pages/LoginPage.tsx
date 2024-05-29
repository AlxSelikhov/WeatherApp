import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/LoginPage.scss';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<{ email?: string; password?: string; general?: string }>({});
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setError((prev) => ({ ...prev, email: 'Введите корректный email' }));
    } else {
      setError((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setError((prev) => ({ ...prev, password: 'Пароль должен содержать не менее 6 символов' }));
    } else {
      setError((prev) => ({ ...prev, password: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let errorObj: { email?: string; password?: string; general?: string } = {};

    if (!validateEmail(email)) {
      errorObj.email = 'Введите корректный email';
      valid = false;
    }

    if (!validatePassword(password)) {
      errorObj.password = 'Пароль должен содержать не менее 6 символов';
      valid = false;
    }

    if (!email || !password) {
      errorObj.general = 'Пожалуйста, заполните все поля';
      valid = false;
    }

    if (valid) {
      login(email);
      navigate('/');
    } else {
      setError(errorObj);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Вход</h1>
        <p>Привет, Добро пожаловать! 👋</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Например, test@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              className={error.email ? 'input-error' : ''}
            />
            {error.email && <div className="error">{error.email}</div>}
          </div>
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              placeholder="Введите ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={handlePasswordBlur}
              className={error.password ? 'input-error' : ''}
            />
            {error.password && <div className="error">{error.password}</div>}
          </div>
          {error.general && <div className="error general-error">{error.general}</div>}
          {/* <div className="actions">
            <div>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Запомнить меня</label>
            </div>
          </div> */}
          <button type="submit" className="login-button">Войти</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
