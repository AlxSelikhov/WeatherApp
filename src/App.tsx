import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import PrivateRoute from './routers/PrivateRoute';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
