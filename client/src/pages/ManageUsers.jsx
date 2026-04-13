import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Users, Mail, MapPin, Trash2, Shield, User as UserIcon } from 'lucide-react';
import { userAPI } from '../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await userAPI.getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        fetchUsers();
      } catch (error) {
        alert(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      <Sidebar role="admin" />
      
      <main style={{ marginLeft: '300px', padding: '3rem', flex: 1 }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Manage Users</h1>
          <p style={{ color: 'var(--text-muted)' }}>View and manage all registered farmers and system administrators.</p>
        </header>

        {/* Users Table */}
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1.25rem 2rem' }}>User</th>
                <th style={{ padding: '1.25rem 2rem' }}>Contact</th>
                <th style={{ padding: '1.25rem 2rem' }}>Location</th>
                <th style={{ padding: '1.25rem 2rem' }}>Role</th>
                <th style={{ padding: '1.25rem 2rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1.25rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: user.role.toLowerCase() === 'admin' ? '#8b5cf615' : 'var(--primary)15', color: user.role.toLowerCase() === 'admin' ? '#8b5cf6' : 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <UserIcon size={16} />
                      </div>
                      <span style={{ fontWeight: '600' }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <Mail size={14} />
                      {user.email}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <MapPin size={14} />
                      {user.location}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 2rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '1rem', 
                      background: user.role.toLowerCase() === 'admin' ? '#ede9fe' : '#ecfdf5', 
                      color: user.role.toLowerCase() === 'admin' ? '#5b21b6' : '#065f46', 
                      fontSize: '0.8rem', 
                      fontWeight: '700',
                      textTransform: 'capitalize'
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 2rem' }}>
                    {user.role.toLowerCase() !== 'admin' && (
                      <button 
                        onClick={() => handleDelete(user._id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', transition: '0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ManageUsers;
