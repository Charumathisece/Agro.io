import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { recommendationAPI } from '../services/api';

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await recommendationAPI.getHistory();
        setHistoryData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleFilter = () => {
    if (!searchTerm.trim()) {
      setFilteredData(historyData);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = historyData.filter(item => 
        item.soilType.toLowerCase().includes(term)
      );
      setFilteredData(filtered);
    }
  };

  const exportAsCSV = () => {
    const headers = ['Date', 'Soil Type', 'Temperature (°C)', 'Humidity (%)', 'Recommended Crop', 'Fertilizer'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(item => [
        new Date(item.createdAt).toLocaleDateString(),
        `"${item.soilType}"`,
        item.temp,
        item.humidity,
        `"${item.recommendedCrop}"`,
        `"${item.recommendedFertilizer}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'recommendation_history.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh' }}>
      <Sidebar role="farmer" />
      
      <main style={{ marginLeft: '300px', padding: '3rem', flex: 1 }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Recommendation History</h1>
            <p style={{ color: 'var(--text-muted)' }}>Review your past consultations and agricultural suggestions.</p>
          </div>
          <button onClick={exportAsCSV} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={18} />
            Export CSV
          </button>
        </header>

        {/* Filters and Search */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div className="glass-card" style={{ flex: 1, padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Search size={20} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search by soil type..." 
              style={{ width: '100%', background: 'transparent' }} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div onClick={handleFilter} className="glass-card" style={{ padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <Filter size={18} />
            <span>Filter</span>
          </div>
        </div>

        {/* History Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card" 
          style={{ overflow: 'hidden' }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(16, 185, 129, 0.05)', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1.25rem 2rem' }}>Date</th>
                <th style={{ padding: '1.25rem 2rem' }}>Soil Type</th>
                <th style={{ padding: '1.25rem 2rem' }}>Temp / Humid</th>
                <th style={{ padding: '1.25rem 2rem' }}>Recommended Crop</th>
                <th style={{ padding: '1.25rem 2rem' }}>Fertilizer</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index} style={{ borderBottom: index === filteredData.length - 1 ? 'none' : '1px solid #f1f5f9', transition: '0.2s' }} className="table-row-hover">
                  <td style={{ padding: '1.25rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Calendar size={16} color="var(--primary)" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 2rem' }}>{item.soilType}</td>
                  <td style={{ padding: '1.25rem 2rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{item.temp}°C / {item.humidity}%</span>
                  </td>
                  <td style={{ padding: '1.25rem 2rem' }}>
                    <span style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{item.recommendedCrop}</span>
                  </td>
                  <td style={{ padding: '1.25rem 2rem' }}>{item.recommendedFertilizer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>

      <style>{`
        .table-row-hover:hover {
          background: rgba(248, 250, 252, 0.8);
        }
      `}</style>
    </div>
  );
};

export default History;
