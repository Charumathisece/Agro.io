import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sprout, 
  History, 
  User, 
  LogOut, 
  Settings, 
  Users, 
  FlaskConical, 
  ClipboardList 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const farmerLinks = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/farmer/dashboard' },
    { title: 'Recommendation', icon: <Sprout size={20} />, path: '/farmer/recommendation' },
    { title: 'History', icon: <History size={20} />, path: '/farmer/history' },
    { title: 'Profile', icon: <User size={20} />, path: '/farmer/profile' },
  ];

  const adminLinks = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { title: 'Manage Crops', icon: <ClipboardList size={20} />, path: '/admin/manage-crops' },
    { title: 'Manage Users', icon: <Users size={20} />, path: '/admin/manage-users' },
  ];

  const links = role === 'admin' ? adminLinks : farmerLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="sidebar glass-card" style={{
      width: '280px',
      height: 'calc(100vh - 2rem)',
      position: 'fixed',
      left: '1rem',
      top: '1rem',
      padding: '2rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <div style={{ padding: '0 1rem' }}>
        <h2 style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.5rem' }}>Agro.io</h2>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{role === 'admin' ? 'Admin Portal' : 'Farmer Portal'}</span>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map((link) => (
          <NavLink 
            key={link.path} 
            to={link.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem',
              borderRadius: '0.75rem',
              transition: '0.3s',
              background: isActive ? 'var(--primary)' : 'transparent',
              color: isActive ? 'white' : 'var(--text-main)',
              fontWeight: isActive ? '600' : '500',
              boxShadow: isActive ? 'var(--shadow-md)' : 'none'
            })}
          >
            {link.icon}
            {link.title}
          </NavLink>
        ))}
      </nav>

      <button 
        onClick={handleLogout}
        className="btn" 
        style={{ 
          marginTop: 'auto', 
          width: '100%', 
          justifyContent: 'flex-start', 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: '#ef4444',
          gap: '1rem'
        }}
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
