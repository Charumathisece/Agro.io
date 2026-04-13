import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Droplets, FlaskConical, Search, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { recommendationAPI } from '../services/api';

const Recommendation = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    soilType: '',
    temp: '',
    humidity: '',
    rainfall: '',
    location: ''
  });

  const handleGetRecommendation = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await recommendationAPI.predict(formData);
      setResult({
        crop: data.recommendedCrop,
        fertilizer: data.recommendedFertilizer,
        irrigation: data.irrigationAdvice,
        duration: data.duration,
        status: 'Success',
        confidence: data.confidence
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Error fetching recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      <Sidebar role="farmer" />

      <main style={{ marginLeft: '300px', padding: '3rem', flex: 1 }}>
        <header style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Get Recommendation</h1>
          <p style={{ color: 'var(--text-muted)' }}>Input your environmental data for precise agricultural advice.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
            style={{ padding: '2.5rem' }}
          >
            <form onSubmit={handleGetRecommendation} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Soil Type</label>
                <select
                  required
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', background: '#fff', fontSize: '1rem' }}
                  value={formData.soilType}
                  onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                >
                  <option value="">Select Soil Type</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Silty">Silty</option>
                  <option value="Alluvial">Alluvial</option>
                  <option value="Peaty">Peaty</option>
                  <option value="Chalky">Chalky</option>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Laterite Soil">Laterite Soil</option>
                  <option value="Mountain Soil">Mountain Soil</option>
                  <option value="Desert Soil">Desert Soil</option>
                  <option value="Saline Soil">Saline Soil</option>
                  <option value="Alkaline Soil">Alkaline Soil</option>
                  <option value="Acidic Soil">Acidic Soil</option>


                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Temperature (°C)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 28"
                    style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}
                    value={formData.temp}
                    onChange={(e) => setFormData({ ...formData, temp: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Humidity (%)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 70"
                    style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}
                    value={formData.humidity}
                    onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                  />
                </div>
              </div>

              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Rainfall (mm) - Optional</label>
                <input
                  type="number"
                  placeholder="e.g. 150"
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}
                  value={formData.rainfall}
                  onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                />
              </div>

              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Location - Optional</label>
                <input
                  type="text"
                  placeholder="e.g. Chennai, TN"
                  style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', marginTop: '1rem' }}
              >
                {loading ? 'Processing...' : (
                  <>
                    <Search size={20} />
                    Get Recommendation
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Output Section */}
          <div style={{ position: 'sticky', top: '3rem' }}>
            <AnimatePresence mode="wait">
              {!result && !loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card"
                  style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}
                >
                  <AlertCircle size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
                  <p>Submit the form to see your specialized agricultural recommendation here.</p>
                </motion.div>
              )}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '3rem' }}
                >
                  <div style={{ width: '50px', height: '50px', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                  <p style={{ marginTop: '1.5rem', fontWeight: '600', color: 'var(--primary)' }}>Analyzing Data...</p>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </motion.div>
              )}

              {result && !loading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card"
                  style={{ padding: '2.5rem', border: '2px solid var(--primary)' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', marginBottom: '2rem' }}>
                    <CheckCircle2 />
                    <span style={{ fontWeight: '700', fontSize: '1.25rem' }}>Recommendation Ready</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <ResultItem
                      icon={<Sprout size={24} color="var(--primary)" />}
                      label="Recommended Crop"
                      value={result.crop}
                    />
                    <ResultItem
                      icon={<FlaskConical size={24} color="#f59e0b" />}
                      label="Fertilizer Suggestion"
                      value={result.fertilizer}
                    />
                    <ResultItem
                      icon={<Droplets size={24} color="#3b82f6" />}
                      label="Irrigation Advice"
                      value={result.irrigation}
                    />
                    <ResultItem
                      icon={<Clock size={24} color="#8b5cf6" />}
                      label="Estimated Duration"
                      value={result.duration}
                    />
                  </div>

                  <div style={{ marginTop: '2.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '0.75rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.875rem', color: '#065f46' }}>Confidence Level: <strong>{result.confidence}</strong></p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

const ResultItem = ({ icon, label, value }) => (
  <div style={{ display: 'flex', gap: '1.25rem' }}>
    <div style={{ width: '48px', height: '48px', borderRadius: '0.75rem', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {icon}
    </div>
    <div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label}</p>
      <p style={{ fontWeight: '600', fontSize: '1.05rem', lineHeight: 1.4 }}>{value}</p>
    </div>
  </div>
);

export default Recommendation;
