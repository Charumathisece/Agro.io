import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Plus, Search, FlaskConical, Trash2, X, Edit2 } from 'lucide-react';
import { fertilizerAPI } from '../services/api';

const ManageFertilizers = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', soilType: '', nutrientFocus: '', usageGuide: '' });

  useEffect(() => {
    fetchFertilizers();
  }, []);

  const fetchFertilizers = async () => {
    try {
      const { data } = await fertilizerAPI.getFertilizers();
      setFertilizers(data);
    } catch (error) {
      console.error('Error fetching fertilizers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFertilizer = async (e) => {
    e.preventDefault();
    try {
      await fertilizerAPI.addFertilizer(formData);
      fetchFertilizers();
      setFormData({ name: '', soilType: '', nutrientFocus: '', usageGuide: '' });
      setShowForm(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add fertilizer');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      try {
        await fertilizerAPI.deleteFertilizer(id);
        fetchFertilizers();
      } catch (error) {
        alert(error.response?.data?.message || 'Delete failed');
      }
    }
  };

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      <Sidebar role="admin" />
      
      <main style={{ marginLeft: '300px', padding: '3rem', flex: 1 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Manage Fertilizers</h1>
            <p style={{ color: 'var(--text-muted)' }}>Control fertilizer rules based on soil and nutrient conditions.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} />
            Add New Rule
          </button>
        </header>

        {fertilizers.length === 0 && !loading ? (
          <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
             <FlaskConical size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
             <p>No fertilizer rules found. Click "Add New Rule" to begin.</p>
          </div>
        ) : (
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'rgba(16, 185, 129, 0.05)', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th style={{ padding: '1.25rem 2rem' }}>Fertilizer Name</th>
                  <th style={{ padding: '1.25rem 2rem' }}>Soil Type</th>
                  <th style={{ padding: '1.25rem 2rem' }}>Nutrient Focus</th>
                  <th style={{ padding: '1.25rem 2rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fertilizers.map((item, index) => (
                  <tr key={index} style={{ borderBottom: index === fertilizers.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1.25rem 2rem', fontWeight: '600' }}>{item.name}</td>
                    <td style={{ padding: '1.25rem 2rem' }}>{item.soilType}</td>
                    <td style={{ padding: '1.25rem 2rem' }}>{item.nutrientFocus}</td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Modal */}
        {showForm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', background: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h3>Add Fertilizer Rule</h3>
                <X style={{ cursor: 'pointer' }} onClick={() => setShowForm(false)} />
              </div>
              <form onSubmit={handleAddFertilizer} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <input type="text" placeholder="Fertilizer Name" required className="glass-card" style={{ padding: '1rem' }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="text" placeholder="Applicable Soil Type" required className="glass-card" style={{ padding: '1rem' }} value={formData.soilType} onChange={e => setFormData({...formData, soilType: e.target.value})} />
                <input type="text" placeholder="Nutrient Focus (e.g. nitrogen)" required className="glass-card" style={{ padding: '1rem' }} value={formData.nutrientFocus} onChange={e => setFormData({...formData, nutrientFocus: e.target.value})} />
                <textarea placeholder="Usage Guide / Benefits" rows="3" className="glass-card" style={{ padding: '1rem', resize: 'none' }} value={formData.usageGuide} onChange={e => setFormData({...formData, usageGuide: e.target.value})} />
                <button type="submit" className="btn btn-primary" style={{ padding: '1rem' }}>Add Rule</button>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageFertilizers;
