import React from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Shield, LogOut, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';
import { X, Lock } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [showModal, setShowModal] = React.useState(false);
  const [passData, setPassData] = React.useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [updating, setUpdating] = React.useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passData.newPassword !== passData.confirmPassword) {
      return alert('New passwords do not match');
    }
    setUpdating(true);
    try {
      await userAPI.updatePassword({
        oldPassword: passData.oldPassword,
        newPassword: passData.newPassword
      });
      alert('Password updated successfully!');
      setShowModal(false);
      setPassData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  if (!user) {
    return (
      <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
        <Sidebar role="farmer" />
        <main style={{ marginLeft: '300px', padding: '3rem', flex: 1 }}>
          <h1>Please log in to view your profile.</h1>
          <button onClick={() => navigate('/login')} className="btn btn-primary">Go to Login</button>
        </main>
      </div>
    );
  }

  const roleLabel = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      <Sidebar role={user.role} />
      
      <main style={{ marginLeft: '300px', padding: '3rem', flex: 1 }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>User Profile</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your personal information and account security.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Profile Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card" 
            style={{ padding: '3rem', textAlign: 'center' }}
          >
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 2rem' }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <User size={60} />
              </div>
              <button onClick={() => setShowModal(true)} style={{ position: 'absolute', bottom: '0', right: '0', background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', boxShadow: 'var(--shadow-md)' }}>
                <Lock size={16} color="var(--primary)" />
              </button>
            </div>
            
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{user.name}</h2>
            <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '1.5rem' }}>{roleLabel}</p>
            
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button 
                onClick={handleLogout}
                className="btn" 
                style={{ width: '100%', border: '1px solid #ef4444', color: '#ef4444', gap: '0.75rem' }}
              >
                <LogOut size={18} />
                Logout Account
              </button>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card" 
            style={{ padding: '3rem' }}
          >
            <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={20} color="var(--primary)" />
              Account Information
            </h3>

            <div style={{ display: 'grid', gap: '2rem' }}>
              <InfoItem icon={<User size={20} />} label="Full Name" value={user.name} />
              <InfoItem icon={<Mail size={20} />} label="Email Address" value={user.email} />
              <InfoItem icon={<MapPin size={20} />} label="Location" value={user.location || 'Not Specified'} />
              
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '2rem', marginTop: '1rem' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Security</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#f8fafc', borderRadius: '0.75rem' }}>
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>Password</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Status: Active</p>
                  </div>
                  <button onClick={() => setShowModal(true)} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Update</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Password Update Modal */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
            <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               className="glass-card" 
               style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', background: 'white' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Update Account Password</h3>
                <X style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setShowModal(false)} />
              </div>

              <form onSubmit={handleUpdatePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Current Password</label>
                  <input 
                    type="password" 
                    required 
                    style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} 
                    value={passData.oldPassword} 
                    onChange={e => setPassData({...passData, oldPassword: e.target.value})} 
                  />
                </div>

                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>New Password</label>
                  <input 
                    type="password" 
                    required 
                    style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} 
                    value={passData.newPassword} 
                    onChange={e => setPassData({...passData, newPassword: e.target.value})} 
                  />
                </div>

                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600' }}>Confirm New Password</label>
                  <input 
                    type="password" 
                    required 
                    style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} 
                    value={passData.confirmPassword} 
                    onChange={e => setPassData({...passData, confirmPassword: e.target.value})} 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={updating}
                  className="btn btn-primary" 
                  style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}
                >
                  {updating ? 'Updating...' : 'Confirm Password Change'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div style={{ display: 'flex', gap: '1.5rem' }}>
    <div style={{ color: 'var(--text-muted)' }}>{icon}</div>
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label}</p>
      <p style={{ fontWeight: '600', fontSize: '1.1rem' }}>{value}</p>
    </div>
  </div>
);

export default Profile;
