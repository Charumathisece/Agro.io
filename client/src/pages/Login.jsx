import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const { login } = useAuth();
  const [role, setRole] = useState('farmer');
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await authAPI.login({
        email: formData.email,
        password: formData.password
      });

      login(data, data.token);

      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/farmer/dashboard');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #f0fdf4, #f8fafc)' }}>
      <Link to="/" style={{ position: 'absolute', top: '2rem', left: '2rem', fontWeight: 'bold', color: 'var(--primary-dark)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        Agro.io
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)' }}>Login to manage your agricultural resources</p>
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

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
              <input 
                type="email" 
                placeholder="you@example.com"
                required
                style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#fff' }}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
              <input 
                type="password" 
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#fff' }}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
            <LogIn size={20} />
            Login as {role === 'farmer' ? 'Farmer' : 'Admin'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>Register here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
