import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Sprout, X } from 'lucide-react';
import { cropAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ManageCrops = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    idealSoil: '', 
    minTemp: '', 
    maxTemp: '', 
    humidityRange: '',
    duration: '',
    fertilizerName: '',
    fertilizerRange: '',
    irrigationSuggestion: ''
  });
  const [editingId, setEditingId] = useState(null);

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '0.75rem',
    border: '1px solid #e2e8f0',
    background: '#f8fafc',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--text-main)',
    paddingLeft: '0.25rem'
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const { data } = await cropAPI.getCrops();
      setCrops(data);
    } catch (error) {
      console.error('Error fetching crops:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await cropAPI.updateCrop(editingId, formData);
      } else {
        await cropAPI.addCrop(formData);
      }
      fetchCrops();
      resetForm();
    } catch (error) {
       alert(error.response?.data?.message || 'Failed to save crop');
    }
  };

  const resetForm = () => {
    setFormData({ 
      name: '', 
      idealSoil: '', 
      minTemp: '', 
      maxTemp: '', 
      humidityRange: '',
      duration: '',
      fertilizerName: '',
      fertilizerRange: '',
      irrigationSuggestion: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name || '',
      idealSoil: item.idealSoil || '',
      minTemp: item.minTemp || '',
      maxTemp: item.maxTemp || '',
      humidityRange: item.humidityRange || '',
      duration: item.duration || '',
      fertilizerName: item.fertilizerName || '',
      fertilizerRange: item.fertilizerRange || '',
      irrigationSuggestion: item.irrigationSuggestion || ''
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      try {
        await cropAPI.deleteCrop(id);
        fetchCrops();
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
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Manage Crops</h1>
            <p style={{ color: 'var(--text-muted)' }}>Configure crop requirements for the recommendation engine.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} />
            Add New Crop
          </button>
        </header>

        {crops.length === 0 && !loading ? (
             <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Sprout size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
                <p>No crops registered yet. Click "Add New Crop" to begin.</p>
             </div>
        ) : (
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: 'rgba(16, 185, 129, 0.05)', borderBottom: '1px solid #e2e8f0' }}>
                <tr>
                  <th style={{ padding: '1.25rem 2rem' }}>Crop Name</th>
                  <th style={{ padding: '1.25rem 2rem' }}>Ideal Soil</th>
                  <th style={{ padding: '1.25rem 2rem' }}>Temp/Humid</th>
                  <th style={{ padding: '1.25rem 2rem' }}>Fertilizer</th>
                  <th style={{ padding: '1.25rem 2rem' }}>Duration/Irrigation</th>
                  <th style={{ padding: '1.25rem 2rem' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {crops.map((item, index) => (
                  <tr key={index} style={{ borderBottom: index === crops.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1.25rem 2rem', fontWeight: '600' }}>{item.name}</td>
                    <td style={{ padding: '1.25rem 2rem' }}>{item.idealSoil}</td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ fontSize: '0.85rem' }}>{item.minTemp}°C - {item.maxTemp}°C</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.humidityRange}</div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ fontWeight: '500' }}>{item.fertilizerName}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.fertilizerRange}</div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ fontWeight: '500' }}>{item.duration}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.irrigationSuggestion}</div>
                    </td>
                    <td style={{ padding: '1.25rem 2rem' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Crop Modal */}
        {showForm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '1rem' }}>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="glass-card" 
              style={{ width: '100%', maxWidth: '650px', padding: '2.5rem', background: 'white' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem' }}>{editingId ? 'Edit Crop Entry' : 'Add New Crop Entry'}</h3>
                <X style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={resetForm} />
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Name and Soil Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="input-group">
                    <label style={labelStyle}>Crop Name</label>
                    <input type="text" placeholder="e.g. Rice" required style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label style={labelStyle}>Ideal Soil Type</label>
                    <input type="text" placeholder="e.g. Alluvial" required style={inputStyle} value={formData.idealSoil} onChange={e => setFormData({...formData, idealSoil: e.target.value})} />
                  </div>
                </div>
                
                {/* Environmental Conditions Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', gap: '1.5rem' }}>
                    <div className="input-group">
                      <label style={labelStyle}>Min Temp (°C)</label>
                      <input type="number" placeholder="20" required style={inputStyle} value={formData.minTemp} onChange={e => setFormData({...formData, minTemp: e.target.value})} />
                    </div>
                    <div className="input-group">
                      <label style={labelStyle}>Max Temp (°C)</label>
                      <input type="number" placeholder="35" required style={inputStyle} value={formData.maxTemp} onChange={e => setFormData({...formData, maxTemp: e.target.value})} />
                    </div>
                    <div className="input-group">
                      <label style={labelStyle}>Humid Range (%)</label>
                      <input type="text" placeholder="e.g. 60-80" required style={inputStyle} value={formData.humidityRange} onChange={e => setFormData({...formData, humidityRange: e.target.value})} />
                    </div>
                </div>

                {/* Fertilizer Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="input-group">
                    <label style={labelStyle}>Fertilizer Name</label>
                    <input type="text" placeholder="e.g. Urea" required style={inputStyle} value={formData.fertilizerName} onChange={e => setFormData({...formData, fertilizerName: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label style={labelStyle}>Fertilizer Range (kg/acre)</label>
                    <input type="text" placeholder="e.g. 40-50" required style={inputStyle} value={formData.fertilizerRange} onChange={e => setFormData({...formData, fertilizerRange: e.target.value})} />
                  </div>
                </div>

                {/* Duration and Irrigation Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '1.5rem' }}>
                  <div className="input-group">
                    <label style={labelStyle}>Crop Duration</label>
                    <input type="text" placeholder="e.g. 120 days" required style={inputStyle} value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label style={labelStyle}>Irrigation Suggestion</label>
                    <input type="text" placeholder="e.g. High moisture required" required style={inputStyle} value={formData.irrigationSuggestion} onChange={e => setFormData({...formData, irrigationSuggestion: e.target.value})} />
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                    {editingId ? 'Update Data Entry' : 'Create Data Entry'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageCrops;
