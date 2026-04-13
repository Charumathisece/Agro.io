import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Sprout, History, ArrowRight, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { recommendationAPI } from '../services/api';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await recommendationAPI.getHistory();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching dashboard history:', error);
      }
    };
    fetchHistory();
  }, []);

  const stats = [
    { title: 'Total Recommendations', value: history.length.toString(), icon: <Sprout size={24} />, color: '#10b981' },
    { title: 'Last Crop Suggested', value: history.length > 0 ? history[0].recommendedCrop : 'None', icon: <History size={24} />, color: '#3b82f6' },
  ];

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      <Sidebar role="farmer" />
      
      <main style={{ marginLeft: '300px', padding: '3rem', flex: 1 }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>
            Welcome, {user?.name || 'Farmer'} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your farm today.</p>
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

        {/* Quick Actions */}
        <section style={{ marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <ActionCard 
              title="Get Recommendation"
              description="Analyze your soil and climate to get the best crop advice."
              path="/farmer/recommendation"
              icon={<Sprout />}
            />
            <ActionCard 
              title="View History"
              description="Track your past agricultural choices and results."
              path="/farmer/history"
              icon={<History />}
            />
          </div>
        </section>

        {/* Farming Tip */}
        <section className="glass-card" style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', background: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)', border: '1px solid #d1fae5' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Lightbulb size={24} />
          </div>
          <div>
            <h4 style={{ color: '#065f46', marginBottom: '0.25rem' }}>Today's Farming Tip</h4>
            <p style={{ color: '#047857' }}>"Rotating crops like legumes and grains can significantly improve soil nitrogen levels and reduce pest buildup."</p>
          </div>
        </section>
      </main>
    </div>
  );
};

const ActionCard = ({ title, description, path, icon }) => (
  <Link to={path} style={{ display: 'block' }}>
    <motion.div 
      whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
      className="glass-card" 
      style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <div style={{ color: 'var(--primary)' }}>{icon}</div>
      <h3 style={{ fontSize: '1.25rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', flex: 1 }}>{description}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600', marginTop: '1rem' }}>
        Start Now <ArrowRight size={18} />
      </div>
    </motion.div>
  </Link>
);

export default FarmerDashboard;
