// src/components/MediaClub/MediaClub.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  FaNewspaper, FaUserGraduate, FaStar, FaPalette, FaTrophy,
  FaCalendar, FaUser, FaShare, FaThumbsUp, FaComment, FaEye,
  FaPlus, FaEdit, FaTrash, FaUpload, FaSchool, FaAward,
  FaCrown, FaChartLine, FaUsers, FaBrain, FaLightbulb,
  FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaLink,
  FaCopy, FaCheckCircle
} from 'react-icons/fa';
import './MediaClub.css';

const MediaClub = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('news');

  // Update active tab based on URL
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('news')) setActiveTab('news');
    else if (path.includes('students')) setActiveTab('students');
    else if (path.includes('artists')) setActiveTab('artists');
    else setActiveTab('news');
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/schoollife/media-club/${tab}`);
  };

  return (
    <div className="media-club-page">
      <header className="media-club-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Media Club</h1>
            <p>Stay updated with school news, student achievements, and creative talents</p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-card">
            <FaNewspaper />
            <div>
              <span className="stat-number">0</span>
              <span className="stat-label">News Articles</span>
            </div>
          </div>
          <div className="stat-card">
            <FaUserGraduate />
            <div>
              <span className="stat-number">0</span>
              <span className="stat-label">Featured Students</span>
            </div>
          </div>
          <div className="stat-card">
            <FaPalette />
            <div>
              <span className="stat-number">0</span>
              <span className="stat-label">Top Artists</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="media-club-nav">
        <div className="nav-tabs">
          <button 
            className={`tab ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => handleTabChange('news')}
          >
            <FaNewspaper />
            School News
          </button>
          
          <button 
            className={`tab ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => handleTabChange('students')}
          >
            <FaUserGraduate />
            Student Features
          </button>
          
          <button 
            className={`tab ${activeTab === 'artists' ? 'active' : ''}`}
            onClick={() => handleTabChange('artists')}
          >
            <FaPalette />
            Top Artists
          </button>
        </div>
      </nav>

      <main className="media-club-content">
        <Routes>
          <Route index element={<NewsSection />} />
          <Route path="news" element={<NewsSection />} />
          <Route path="students" element={<StudentsSection />} />
          <Route path="artists" element={<ArtistsSection />} />
        </Routes>
      </main>
    </div>
  );
};

// Placeholder sections - you can expand these later
const NewsSection = () => (
  <div className="content-section">
    <div className="section-header">
      <h2>School News & Announcements</h2>
      <p>Latest updates and important information from our school</p>
    </div>
    <div className="empty-state">
      <FaNewspaper className="empty-icon" />
      <h3>No news articles yet</h3>
      <p>Check back later for school updates and announcements</p>
    </div>
  </div>
);

const StudentsSection = () => (
  <div className="content-section">
    <div className="section-header">
      <h2>Featured Students</h2>
      <p>Recognizing outstanding students and their achievements</p>
    </div>
    <div className="empty-state">
      <FaUserGraduate className="empty-icon" />
      <h3>No students featured yet</h3>
      <p>Student features will be displayed here soon</p>
    </div>
  </div>
);

const ArtistsSection = () => (
  <div className="content-section">
    <div className="section-header">
      <h2>Top Artists</h2>
      <p>Showcasing exceptional artistic talent and creativity</p>
    </div>
    <div className="empty-state">
      <FaPalette className="empty-icon" />
      <h3>No artists featured yet</h3>
      <p>Outstanding artists will be featured here soon</p>
    </div>
  </div>
);

export default MediaClub;