import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, LogIn, UserPlus, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar glass-card" style={{
      position: 'sticky',
      top: '1rem',
      margin: '1rem',
      zIndex: 1000,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-dark)', fontWeight: '800', fontSize: '1.5rem' }}>
        <Sprout size={32} color="var(--primary)" />
        <span>Agro.io</span>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/" className="nav-link">Home</Link>
        <a href="#about" className="nav-link">About</a>

        {user ? (
          <>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <LogIn size={18} />
              Login
            </button>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <UserPlus size={18} />
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <LogIn size={18} />
              Login
            </Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              <UserPlus size={18} />
              Register
            </Link>
          </>
        )}
      </div>

      <style>{`
        .nav-link {
          font-weight: 500;
          color: var(--text-main);
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: var(--primary);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
