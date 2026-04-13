import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Settings, Plus, Play, Save, Trash2, Code, X } from 'lucide-react';
import { ruleAPI } from '../services/api';

const RulesManager = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRule, setNewRule] = useState({ name: '', condition: '', action: '' });

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      const { data } = await ruleAPI.getRules();
      setRules(data);
    } catch (error) {
      console.error('Error fetching rules:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRule = async (e) => {
    e.preventDefault();
    try {
      await ruleAPI.addRule(newRule);
      fetchRules();
      setNewRule({ name: '', condition: '', action: '' });
      setShowAddModal(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add rule');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      try {
        await ruleAPI.deleteRule(id);
        fetchRules();
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
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Rules Manager</h1>
            <p style={{ color: 'var(--text-muted)' }}>Configure the logic behind the recommendation system dynamically.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Play size={18} />
              Test Engine
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={20} />
              New Rule
            </button>
          </div>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {rules.length === 0 && !loading && (
             <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Code size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
                <p>No custom rules defined yet. Create your first rule to override engine logic.</p>
             </div>
          )}
          {rules.map((rule) => (
            <motion.div 
              key={rule._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card" 
              style={{ padding: '2rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Code size={20} color="var(--primary)" />
                  <h3 style={{ fontSize: '1.2rem' }}>{rule.name}</h3>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button onClick={() => handleDelete(rule._id)} style={{ padding: '0.5rem', borderRadius: '0.5rem', background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ background: '#f1f5f9', padding: '1.5rem', borderRadius: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>If Condition</p>
                  <code style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', fontWeight: '600' }}>{rule.condition}</code>
                </div>
                <div style={{ background: '#ecfdf5', padding: '1.5rem', borderRadius: '1rem' }}>
                  <p style={{ fontSize: '0.8rem', color: '#065f46', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Then Action</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: '600', color: '#064e3b' }}>{rule.action}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <div style={{ marginTop: '3.5rem', padding: '2rem', borderRadius: '1rem', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', gap: '1.5rem' }}>
           <Settings size={32} color="var(--text-muted)" />
           <div>
             <h4 style={{ marginBottom: '0.5rem' }}>Engine Logic Info</h4>
             <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
               Custom rules are processed in priority. These allow admins to override the standard soil/crop matching logic for special climate events or regional requirements.
             </p>
           </div>
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                   <h3>Add Custom Logic Rule</h3>
                   <X style={{ cursor: 'pointer' }} onClick={() => setShowAddModal(false)} />
                </div>
                <form onSubmit={handleAddRule} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <input type="text" placeholder="Rule Name (e.g. Drought Warning)" required className="glass-card" style={{ padding: '1rem' }} value={newRule.name} onChange={e => setNewRule({...newRule, name: e.target.value})} />
                   <input type="text" placeholder="Condition (e.g. Temp > 40°C)" required className="glass-card" style={{ padding: '1rem' }} value={newRule.condition} onChange={e => setNewRule({...newRule, condition: e.target.value})} />
                   <textarea placeholder="Recommended Action" rows="3" required className="glass-card" style={{ padding: '1rem', resize: 'none' }} value={newRule.action} onChange={e => setNewRule({...newRule, action: e.target.value})} />
                   <button type="submit" className="btn btn-primary" style={{ padding: '1rem' }}>Create Rule</button>
                </form>
             </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default RulesManager;
