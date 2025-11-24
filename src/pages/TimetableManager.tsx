// src/pages/TimetableManager.js
import React, { useState, useEffect } from 'react';
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaCopy,
  FaCalendarAlt,
  FaHistory,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaUpload
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './TimetableManager.css';

const TimetableManager = () => {
  const [timetables, setTimetables] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTimetables();
  }, []);

  const loadTimetables = () => {
    const storedTimetables = JSON.parse(localStorage.getItem('apaer_timetables') || '[]');
    setTimetables(storedTimetables);
  };

  const deleteTimetable = (id) => {
    if (window.confirm('Are you sure you want to delete this timetable?')) {
      const updatedTimetables = timetables.filter(t => t.id !== id);
      setTimetables(updatedTimetables);
      localStorage.setItem('apaer_timetables', JSON.stringify(updatedTimetables));
    }
  };

  const duplicateTimetable = (timetable) => {
    const newTimetable = {
      ...timetable,
      id: Date.now(),
      name: `${timetable.name} (Copy)`,
      generatedAt: new Date().toISOString(),
      status: 'draft'
    };
    
    const updatedTimetables = [newTimetable, ...timetables];
    setTimetables(updatedTimetables);
    localStorage.setItem('apaer_timetables', JSON.stringify(updatedTimetables));
  };

  const filteredTimetables = timetables.filter(t => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div className="timetable-manager">
      <div className="manager-header">
        <div className="header-content">
          <FaHistory className="header-icon" />
          <div className="header-text">
            <h1>Timetable Manager</h1>
            <p>Manage and view all generated timetables</p>
          </div>
        </div>
        
        <Link to="/admin/timetable/generate" className="btn btn-primary">
          <FaCalendarAlt />
          Generate New
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Timetables
        </button>
        <button 
          className={`filter-tab ${filter === 'published' ? 'active' : ''}`}
          onClick={() => setFilter('published')}
        >
          Published
        </button>
        <button 
          className={`filter-tab ${filter === 'draft' ? 'active' : ''}`}
          onClick={() => setFilter('draft')}
        >
          Drafts
        </button>
      </div>

      {/* Timetables Grid */}
      <div className="timetables-grid">
        {filteredTimetables.length === 0 ? (
          <div className="empty-state">
            <FaCalendarAlt />
            <h3>No timetables found</h3>
            <p>Generate your first timetable to get started</p>
            <Link to="/admin/timetable/generate" className="btn btn-primary">
              Generate Timetable
            </Link>
          </div>
        ) : (
          filteredTimetables.map(timetable => (
            <TimetableCard 
              key={timetable.id}
              timetable={timetable}
              onDelete={deleteTimetable}
              onDuplicate={duplicateTimetable}
            />
          ))
        )}
      </div>
    </div>
  );
};

const TimetableCard = ({ timetable, onDelete, onDuplicate }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: '#4CAF50', label: 'Published', icon: FaCheckCircle },
      draft: { color: '#FF9800', label: 'Draft', icon: FaClock }
    };
    
    const config = statusConfig[status] || { color: '#666', label: status, icon: FaClock };
    const IconComponent = config.icon;
    
    return (
      <span 
        className="status-badge"
        style={{ backgroundColor: config.color }}
      >
        <IconComponent />
        {config.label}
      </span>
    );
  };

  return (
    <div className="timetable-card">
      <div className="card-header">
        <h3>{timetable.name}</h3>
        {getStatusBadge(timetable.status)}
      </div>
      
      <div className="card-content">
        <div className="card-info">
          <div className="info-item">
            <strong>Generated:</strong>
            <span>{new Date(timetable.generatedAt).toLocaleDateString()}</span>
          </div>
          {timetable.publishedAt && (
            <div className="info-item">
              <strong>Published:</strong>
              <span>{new Date(timetable.publishedAt).toLocaleDateString()}</span>
            </div>
          )}
          <div className="info-item">
            <strong>Type:</strong>
            <span>{timetable.type || 'Auto-generated'}</span>
          </div>
          <div className="info-item">
            <strong>O-Level Classes:</strong>
            <span>{timetable.data.oLevel.length}</span>
          </div>
          <div className="info-item">
            <strong>TVET Programs:</strong>
            <span>{timetable.data.tvet.length}</span>
          </div>
        </div>
      </div>
      
      <div className="card-actions">
        <button className="btn-action view">
          <FaEye />
          View
        </button>
        <button className="btn-action edit">
          <FaEdit />
          Edit
        </button>
        <button 
          className="btn-action duplicate"
          onClick={() => onDuplicate(timetable)}
        >
          <FaCopy />
          Duplicate
        </button>
        <button 
          className="btn-action delete"
          onClick={() => onDelete(timetable.id)}
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TimetableManager;