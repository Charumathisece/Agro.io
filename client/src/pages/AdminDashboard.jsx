import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Users, Sprout, FlaskConical, Settings, TrendingUp, AlertCircle } from 'lucide-react';
import { userAPI, cropAPI, fertilizerAPI } from '../services/api';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ farmers: 0, crops: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, cropsRes] = await Promise.all([
          userAPI.getUsers(),
          cropAPI.getCrops()
        ]);
        setCounts({
          farmers: usersRes.data.length,
          crops: cropsRes.data.length
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { title: 'Total Farmers', value: counts.farmers, icon: <Users size={24} />, color: '#3b82f6' },
    { title: 'Registered Crops', value: counts.crops, icon: <Sprout size={24} />, color: '#10b981' },
    { title: 'System Accuracy', value: '98.2%', icon: <TrendingUp size={24} />, color: '#8b5cf6' },
  ];

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      <Sidebar role="admin" />
      
      <main style={{ marginLeft: '300px', padding: '3rem', flex: 1 }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Overview of the Natural Resource Utilization System performance.</p>
        </header>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card" 
              style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '1rem', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{stat.title}</p>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem' }}>
          {/* Recent System Logs */}
          <section className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent System Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <LogItem message="Admin updated recommendation rules for Clay soil" time="15 mins ago" />
              <LogItem message="New crop 'Quinoa' added to the database" time="2 hours ago" />
              <LogItem message="System optimized prediction model with new humidity data" time="5 hours ago" />
              <LogItem message="50+ new farmers registered from Coimbatore region" time="1 day ago" />
            </div>
          </section>

          {/* Quick Config */}
          <section className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(135deg, var(--primary-dark), #064e3b)', color: 'white' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>System Status</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '10px', height: '10px', background: '#4ade80', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.9rem' }}>All services operational</span>
            </div>
            
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '2rem' }}>
              The recommendation engine is currently running at peak performance. Last database sync: 12 minutes ago.
            </p>
            
            <button className="btn" style={{ width: '100%', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white' }}>
              <Settings size={18} />
              System Settings
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

const LogItem = ({ message, time }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ marginTop: '0.25rem' }}>
        <AlertCircle size={16} color="var(--primary)" />
      </div>
      <p style={{ fontSize: '0.95rem' }}>{message}</p>
    </div>
    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{time}</span>
  </div>
);

export default AdminDashboard;
