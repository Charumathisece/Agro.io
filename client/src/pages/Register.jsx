import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User as UserIcon, MapPin } from 'lucide-react';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const [role, setRole] = useState('farmer');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', location: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role,
        location: formData.location
      });

      login(data, data.token);

      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/farmer/dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f0fdf4, #f8fafc)', padding: '2rem' }}>
      <Link to="/" style={{ position: 'absolute', top: '2rem', left: '2rem', fontWeight: 'bold', color: 'var(--primary-dark)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        Agro.io
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '500px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Join Agro.io</h2>
          <p style={{ color: 'var(--text-muted)' }}>Start optimizing your natural resources today</p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', padding: '0.25rem', background: '#f1f5f9', borderRadius: '0.75rem' }}>
          <button 
            onClick={() => setRole('farmer')}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', transition: '0.3s', background: role === 'farmer' ? 'white' : 'transparent', color: role === 'farmer' ? 'var(--primary)' : 'var(--text-muted)', boxShadow: role === 'farmer' ? 'var(--shadow-sm)' : 'none' }}
          >
            Farmer
          </button>
          <button 
            onClick={() => setRole('admin')}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', fontWeight: '600', transition: '0.3s', background: role === 'admin' ? 'white' : 'transparent', color: role === 'admin' ? 'var(--primary)' : 'var(--text-muted)', boxShadow: role === 'admin' ? 'var(--shadow-sm)' : 'none' }}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <UserIcon style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
              <input 
                type="text" 
                placeholder="John Doe"
                required
                style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
              <input 
                type="email" 
                placeholder="you@example.com"
                required
                style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {role === 'farmer' && (
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Location</label>
              <div style={{ position: 'relative' }}>
                <MapPin style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                <input 
                  type="text" 
                  placeholder="City, Country"
                  required
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
              <input 
                type="password" 
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
            <UserPlus size={20} />
            Create {role === 'farmer' ? 'Farmer' : 'Admin'} Account
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
