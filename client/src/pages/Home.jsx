import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { Sprout, Droplets, FlaskConical, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Natural Resource Utilization System
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2.5rem' }}
        >
          Empowering farmers with data-driven insights to optimize water, soil, and climate usage for a sustainable and more productive future.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
        >
          <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Get Started Now</Link>
          <a href="#about" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Learn More</a>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="benefits" style={{ background: '#fff', padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Maximize Your Yield</h2>
            <p style={{ color: 'var(--text-muted)' }}>Proven benefits of smart agricultural resource management</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <BenefitCard 
              icon={<Sprout size={40} color="var(--primary)" />}
              title="Smart Crop Selection"
              description="Know exactly which crop fits your soil type and current climate conditions for maximum success."
            />
            <BenefitCard 
              icon={<Droplets size={40} color="var(--primary)" />}
              title="Water Saving"
              description="Get precision irrigation advice to reduce water waste while keeping your crops healthy."
            />
            <BenefitCard 
              icon={<FlaskConical size={40} color="var(--primary)" />}
              title="Fertilizer Optimization"
              description="Receive tailored fertilizer suggestions to improve soil health and reduce chemical overuse."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container" style={{ padding: '5rem 1.5rem' }}>
        <div className="glass-card" style={{ padding: '4rem', display: 'flex', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About the System</h2>
            <p style={{ marginBottom: '1rem' }}>
              Our Natural Resource Utilization System is designed to bridge the gap between traditional farming and modern data science. By analyzing soil composition, temperature, and local weather patterns, we provide farmers with actionable recommendations.
            </p>
            <p style={{ marginBottom: '2rem' }}>
              Whether you are a small-scale farmer or managing large agricultural lands, Agro.io scales to your needs, ensuring you make the most of every drop of water and every inch of soil.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck color="var(--primary)" />
                <span>Secure Data</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap color="var(--primary)" />
                <span>Instant Results</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart3 color="var(--primary)" />
                <span>Historical Insights</span>
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
             {/* Placeholder for an image or graphic */}
             <div style={{ width: '100%', height: '300px', background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)', borderRadius: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sprout size={100} color="var(--primary-dark)" opacity={0.3} />
             </div>
          </div>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '3rem', borderTop: '1px solid #e2e8f0', marginTop: '4rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>&copy; 2026 Agro.io. All rights reserved.</p>
      </footer>
    </div>
  );
};

const BenefitCard = ({ icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card" 
    style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
  >
    <div style={{ width: '60px', height: '60px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
    <h3 style={{ fontSize: '1.5rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{description}</p>
  </motion.div>
);

export default Home;
