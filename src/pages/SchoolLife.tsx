import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaImage, FaVideo, FaTrophy, FaArrowRight, FaUsers, FaSchool,
  FaAward, FaStar, FaMedal, FaGraduationCap, FaChartLine, FaPlay,
  FaExpand, FaUserCheck, FaBook, FaHeart, FaMusic, FaFutbol,
  FaPalette, FaMicroscope, FaLaptop, FaPlus, FaEdit, FaTrash,
  FaUpload, FaCog, FaFilter, FaSearch, FaCrown, FaUserFriends,
  FaBrain, FaLightbulb, FaCalendar, FaClock, FaEye, FaTimes,
  FaCheck, FaExclamationTriangle, FaUser, FaUserTie, FaHandsHelping,
  FaLock, FaShieldAlt, FaTag, FaShare, FaDownload, FaRegHeart,
  FaRegComment, FaRegBookmark, FaChevronLeft, FaChevronRight,
  FaCamera, FaFilm, FaNewspaper, FaPodcast, FaBroadcastTower,
  FaVenus, FaMars, FaFire, FaRocket, FaBullhorn, FaChartBar,
  FaTachometerAlt, FaUserGraduate, FaSeedling, FaGem, FaImages,
  FaPhotoVideo, FaSave, FaUndo, FaCloudUploadAlt
} from 'react-icons/fa';

// Import local images from assets
// Note: Make sure these image files exist in your assets/images folder
// For now, I'll comment them out and use placeholder names. You can uncomment when you have the actual images.

 import sportsDayImage from '../assets/images/sports-day.jpg';
 import scienceFairImage from '../assets/images/science-fair.jpg';
 import culturalFestivalImage from '../assets/images/cultural-festival.jpg';
 import schoolCampusImage from '../assets/images/school-campus.jpg';
 import scienceLabImage from '../assets/images/science-lab.jpg';
 import libraryImage from '../assets/images/library.jpg';
 import basketballCourtImage from '../assets/images/basketball-court.jpg';
 import student1Image from '../assets/images/student1.jpg';
 import student2Image from '../assets/images/student2.jpg';
 import student3Image from '../assets/images/student3.jpg';
 import student4Image from '../assets/images/student4.jpg';
 import student5Image from '../assets/images/student5.jpg';
 import student6Image from '../assets/images/student6.jpg';
 import student7Image from '../assets/images/student7.jpg';
 import student8Image from '../assets/images/student8.jpg';
 import student9Image from '../assets/images/student9.jpg';
 import student10Image from '../assets/images/student10.jpg';

import './SchoolLife.css';

// Custom hooks
const useAdminAuth = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('apaer_current_user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      setIsAdmin(userObj.role === 'admin');
    }
  }, []);

  return { user, isAdmin };
};

// Sample data generators with Rwandan names
const generateSampleGallery = () => [
  {
    id: 1,
    type: 'image',
    title: 'Annual Sports Day 2024',
    description: 'Students participating in various sports activities during our annual sports day',
    category: 'sports',
    date: '2024-01-15',
    uploadedBy: 'Sports Department'
  },
  {
    id: 2,
    type: 'video',
    title: 'Science Fair Highlights',
    description: 'Watch the amazing projects from our young scientists',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'academic',
    date: '2024-01-10',
    uploadedBy: 'Science Department'
  },
  {
    id: 3,
    type: 'image',
    title: 'Cultural Festival',
    description: 'Colorful performances from our cultural festival celebration',
    category: 'cultural',
    date: '2024-01-08',
    uploadedBy: 'Cultural Committee'
  }
];

const generateSampleSchoolImages = () => [
  {
    id: 1,
    title: 'School Campus Overview',
    description: 'Beautiful view of our main campus building and surroundings',
    category: 'campus',
    date: '2024-01-20',
    featured: true
  },
  {
    id: 2,
    title: 'Modern Science Lab',
    description: 'Our state-of-the-art science laboratory for practical learning',
    category: 'facilities',
    date: '2024-01-18',
    featured: true
  },
  {
    id: 3,
    title: 'Library Interior',
    description: 'Peaceful reading environment in our school library',
    category: 'facilities',
    date: '2024-01-16',
    featured: false
  },
  {
    id: 4,
    title: 'Basketball Court',
    description: 'Professional-grade basketball court for sports activities',
    category: 'sports',
    date: '2024-01-14',
    featured: true
  }
];

const generateSampleBestPerformance = () => [
  {
    id: 1,
    name: 'Keza Uwase',
    class: 'Grade 12A',
    grade: 'A+',
    average: 96.5,
    achievements: ['Top Mathematics', 'Science Olympiad Winner', 'Best Research Paper'],
    subjects: { math: 98, science: 95, english: 96, history: 97 }
  },
  {
    id: 2,
    name: 'Mugisha Niyonzima',
    class: 'Grade 11B',
    grade: 'A',
    average: 94.2,
    achievements: ['Debate Champion', 'Programming Excellence', 'Math Competition Winner'],
    subjects: { math: 97, science: 92, english: 93, programming: 98 }
  },
  {
    id: 3,
    name: 'Ineza Mutesi',
    class: 'Grade 10C',
    grade: 'A+',
    average: 95.8,
    achievements: ['Art Competition Winner', 'Creative Writing Award', 'Community Service'],
    subjects: { art: 99, english: 96, history: 95, music: 98 }
  }
];

const generateSampleStarStudents = () => [
  {
    id: 1,
    name: 'Mutesi Keza',
    class: 'Grade 10A',
    category: 'star',
    gender: 'female',
    achievements: ['Community Service Leader', 'Sports Captain', 'Student Council'],
    description: 'Outstanding leadership and community engagement with exceptional organizational skills'
  },
  {
    id: 2,
    name: 'Nkundimana Patrick',
    class: 'Grade 12C',
    category: 'star',
    gender: 'male',
    achievements: ['Student Council President', 'Volunteer of the Year', 'Event Organizer'],
    description: 'Exemplary student leadership and initiative in school activities'
  }
];

const generateSampleSmartStudents = () => [
  {
    id: 1,
    name: 'Uwimana Ange',
    class: 'Grade 11A',
    category: 'smart',
    gender: 'female',
    iqScore: 145,
    achievements: ['International Math Olympiad', 'Research Paper Published', 'Science Fair National Winner'],
    description: 'Exceptional analytical and research capabilities with innovative thinking'
  },
  {
    id: 2,
    name: 'Hakizimana David',
    class: 'Grade 12B',
    category: 'smart',
    gender: 'male',
    iqScore: 142,
    achievements: ['Science Fair National Winner', 'AI Project Recognition', 'Programming Champion'],
    description: 'Innovative thinking and scientific excellence in technology fields'
  }
];

const generateSamplePromisedTalents = () => [
  {
    id: 1,
    name: 'Ishimwe Alexandre',
    class: 'Grade 9B',
    talent: 'Musical Prodigy',
    achievements: ['National Piano Competition Winner', 'School Orchestra Lead'],
    potential: 'Professional musician and composer',
    rank: 1
  },
  {
    id: 2,
    name: 'Mukamana Grace',
    class: 'Grade 10C',
    talent: 'Young Scientist',

    achievements: ['Young Innovator Award', 'Science Research Grant'],
    potential: 'Research scientist in biotechnology',
    rank: 2
  },
  {
    id: 3,
    name: 'Twahirwa Jean',
    class: 'Grade 8A',
    talent: 'Sports Phenom',
    achievements: ['State Basketball MVP', 'Athlete of the Year'],
    potential: 'Professional athlete',
    rank: 3
  },
  {
    id: 4,
    name: 'Uwase Marie',
    class: 'Grade 11A',
    talent: 'Tech Innovator',
    achievements: ['App Development Competition Winner', 'Tech Innovation Grant'],
    potential: 'Tech entrepreneur',
    rank: 4
  },
  {
    id: 5,
    name: 'Ndayisaba Eric',
    class: 'Grade 9C',
    talent: 'Literary Genius',
    achievements: ['National Writing Competition', 'Young Author Award'],
    potential: 'Published author',
    rank: 5
  }
];

const generateSampleSchoolNews = () => [
  {
    id: 1,
    title: 'Annual Science Fair 2024 Showcases Student Innovation',
    content: 'Students from all grades presented groundbreaking research projects in our annual science fair, with several projects receiving national recognition.',
    date: '2024-01-15',
    category: 'academic',
    author: 'Science Department',
    views: 1247
  },
  {
    id: 2,
    title: 'Basketball Team Wins National Championship',
    content: 'Our school basketball team brought home the district championship trophy after an exciting undefeated season and thrilling final game.',
    date: '2024-01-10',
    category: 'sports',
    author: 'Sports Department',
    views: 892
  },
  {
    id: 3,
    title: 'New STEM Multimedia studio',
    content: 'The school inaugurated the new state-of-the-art STEM studio equipped with modern technology for advanced modern  studio tools.',
    date: '2024-01-08',
    category: 'facilities',
    author: 'Administration',
    views: 567
  }
];

const useSchoolLifeData = () => {
  const [data, setData] = useState({
    schoolGallery: [],
    schoolImages: [],
    bestPerformance: [],
    mediaClub: [],
    starStudents: [],
    smartStudents: [],
    promisedTalents: [],
    schoolNews: [],
    loading: true
  });

  const loadData = useCallback(() => {
    try {
      // Load existing data
      const storedGallery = JSON.parse(localStorage.getItem('apaer_school_gallery') || '[]');
      const storedSchoolImages = JSON.parse(localStorage.getItem('apaer_school_images') || '[]');
      const storedMediaClub = JSON.parse(localStorage.getItem('apaer_media_club') || '[]');
      
      // Load new data with sample data if empty
      const storedBestPerformance = JSON.parse(localStorage.getItem('apaer_best_performance') || '[]');
      const storedStarStudents = JSON.parse(localStorage.getItem('apaer_star_students') || '[]');
      const storedSmartStudents = JSON.parse(localStorage.getItem('apaer_smart_students') || '[]');
      const storedPromisedTalents = JSON.parse(localStorage.getItem('apaer_promised_talents') || '[]');
      const storedSchoolNews = JSON.parse(localStorage.getItem('apaer_school_news') || '[]');

      setData({
        schoolGallery: storedGallery.length > 0 ? storedGallery : generateSampleGallery(),
        schoolImages: storedSchoolImages.length > 0 ? storedSchoolImages : generateSampleSchoolImages(),
        mediaClub: storedMediaClub,
        bestPerformance: storedBestPerformance.length > 0 ? storedBestPerformance : generateSampleBestPerformance(),
        starStudents: storedStarStudents.length > 0 ? storedStarStudents : generateSampleStarStudents(),
        smartStudents: storedSmartStudents.length > 0 ? storedSmartStudents : generateSampleSmartStudents(),
        promisedTalents: storedPromisedTalents.length > 0 ? storedPromisedTalents : generateSamplePromisedTalents(),
        schoolNews: storedSchoolNews.length > 0 ? storedSchoolNews : generateSampleSchoolNews(),
        loading: false
      });
    } catch (error) {
      console.error('Error loading school life data:', error);
      setData(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const saveData = useCallback((key, newData) => {
    try {
      localStorage.setItem(key, JSON.stringify(newData));
      loadData(); // Refresh data after save
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }, [loadData]);

  const addItem = useCallback((section, newItem) => {
    const key = `apaer_${section}`;
    const currentData = JSON.parse(localStorage.getItem(key) || '[]');
    const itemWithId = {
      ...newItem,
      id: Date.now(), // Simple ID generation
      createdAt: new Date().toISOString()
    };
    const updatedData = [...currentData, itemWithId];
    return saveData(key, updatedData);
  }, [saveData]);

  const updateItem = useCallback((section, itemId, updatedItem) => {
    const key = `apaer_${section}`;
    const currentData = JSON.parse(localStorage.getItem(key) || '[]');
    const updatedData = currentData.map(item => 
      item.id === itemId ? { ...item, ...updatedItem, updatedAt: new Date().toISOString() } : item
    );
    return saveData(key, updatedData);
  }, [saveData]);

  const deleteItem = useCallback((section, itemId) => {
    const key = `apaer_${section}`;
    const currentData = JSON.parse(localStorage.getItem(key) || '[]');
    const updatedData = currentData.filter(item => item.id !== itemId);
    return saveData(key, updatedData);
  }, [saveData]);

  useEffect(() => {
    loadData();

    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleStorageChange);
    };
  }, [loadData]);

  return { 
    ...data, 
    refreshData: loadData,
    addItem,
    updateItem,
    deleteItem
  };
};

const useMediaManagement = (user, refreshData) => {
  const [managementMode, setManagementMode] = useState({
    gallery: false,
    images: false,
    performance: false,
    mediaClub: false
  });

  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentSection, setCurrentSection] = useState('');

  const convertToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }, []);

  const extractYouTubeId = useCallback((url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }, []);

  const toggleManagementMode = useCallback((section) => {
    setManagementMode(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const startEditing = useCallback((item, section) => {
    setEditingItem(item);
    setCurrentSection(section);
    setShowAddModal(true);
  }, []);

  const startAdding = useCallback((section) => {
    setEditingItem(null);
    setCurrentSection(section);
    setShowAddModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowAddModal(false);
    setEditingItem(null);
    setCurrentSection('');
  }, []);

  return {
    managementMode,
    toggleManagementMode,
    convertToBase64,
    extractYouTubeId,
    editingItem,
    showAddModal,
    currentSection,
    startEditing,
    startAdding,
    closeModal
  };
};

// Navigation Sidebar Component
const NavigationSidebar = ({ 
  isAdmin, 
  user, 
  onScrollTo, 
  stats, 
  searchTerm, 
  onSearchChange, 
  activeCategory, 
  onCategoryChange,
  onToggleManagement,
  managementMode,
  onAdminAccess 
}) => {
  const navItems = [
    { key: 'gallery', icon: FaPhotoVideo, label: 'School Gallery', count: stats.gallery, color: '#3B82F6' },
    { key: 'images', icon: FaImages, label: 'School Images', count: stats.images, color: '#10B981' },
    { key: 'performance', icon: FaTrophy, label: 'Best Performance', count: stats.performance, color: '#F59E0B' },
    { key: 'mediaClub', icon: FaBroadcastTower, label: 'Media Club', count: stats.mediaClub, color: '#8B5CF6' }
  ];

  return (
    <nav className="school-life-nav">
      <div className="nav-header">
        <div className="school-logo">
          <FaSchool className="logo-icon" />
          <span>Apaer Institute</span>
        </div>
        <h2>School Life</h2>
        {isAdmin && (
          <div className="admin-badge">
            <FaShieldAlt />
            <span>Administrator</span>
          </div>
        )}
      </div>
      
      <div className="nav-stats">
        {navItems.map(({ key, icon: Icon, label, count, color }) => (
          <div key={key} className="nav-stat-item" onClick={() => onScrollTo(key)}>
            <div className="stat-icon" style={{ backgroundColor: color }}>
              <Icon />
            </div>
            <div className="stat-info">
              <span className="stat-count">{count}</span>
              <span className="stat-label">{label}</span>
            </div>
          </div>
        ))}
      </div>

      <ul className="nav-menu">
        {navItems.map(({ key, icon: Icon, label, count }) => (
          <li key={key} onClick={() => onScrollTo(key)} className="nav-menu-item">
            <Icon className="nav-icon" />
            <span>{label}</span>
            {count > 0 && <span className="nav-count">{count}</span>}
          </li>
        ))}
      </ul>

      <div className="nav-search">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => onSearchChange('')}>
              <FaTimes />
            </button>
          )}
        </div>
        
        <div className="category-filter">
          <label>Filter by Category:</label>
          <select value={activeCategory} onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="academic">Academic</option>
            <option value="sports">Sports</option>
            <option value="cultural">Cultural</option>
            <option value="events">Events</option>
            <option value="campus">Campus</option>
            <option value="facilities">Facilities</option>
          </select>
        </div>
      </div>

      {isAdmin && (
        <div className="nav-footer">
          <div className="admin-section">
            <h4>Content Management</h4>
            <div className="management-toggle">
              {['gallery', 'images', 'performance', 'mediaClub'].map(section => (
                <button
                  key={section}
                  className={`toggle-btn ${managementMode[section] ? 'active' : ''}`}
                  onClick={() => onToggleManagement(section)}
                >
                  {section === 'gallery' && <FaPhotoVideo />}
                  {section === 'images' && <FaImages />}
                  {section === 'performance' && <FaTrophy />}
                  {section === 'mediaClub' && <FaBroadcastTower />}
                  <span>Manage {section}</span>
                </button>
              ))}
            </div>
          </div>
          
          <button className="admin-action-btn" onClick={onAdminAccess}>
            <FaCog />
            <span>Admin Dashboard</span>
          </button>
        </div>
      )}

      {!isAdmin && user && (
        <div className="user-info">
          <div className="user-avatar">
            <FaUser />
          </div>
          <div className="user-details">
            <span className="user-name">{user.fullName}</span>
            <span className="user-role">Student</span>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section Component
const HeroSection = ({ stats, onExplore, isAdmin }) => (
  <section className="school-life-hero">
    <div className="hero-background">
      <div className="hero-overlay"></div>
    </div>
    <div className="hero-content">
      <div className="hero-text">
        <h1>Celebrating Excellence at Apaer</h1>
        <p>Where academic achievement meets extraordinary talent, creating tomorrow's leaders today</p>
        
        {isAdmin && (
          <div className="admin-welcome-banner">
            <FaShieldAlt className="admin-icon" />
            <div className="admin-welcome-text">
              <h3>Welcome, Administrator</h3>
              <p>You have full access to manage all school life content</p>
            </div>
          </div>
        )}

        <div className="hero-stats">
          {[
            { value: stats.gallery, label: 'Gallery Items', icon: FaPhotoVideo },
            { value: stats.images, label: 'School Images', icon: FaImages },
            { value: stats.performance, label: 'Top Students', icon: FaTrophy },
            { value: stats.mediaClub, label: 'Media Projects', icon: FaFilm },
            { value: stats.starStudents, label: 'Star Students', icon: FaStar },
            { value: stats.total, label: 'Total Assets', icon: FaChartLine }
          ].map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <stat.icon />
              </div>
              <div className="stat-content">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-actions">
          <button onClick={() => onExplore('gallery')} className="cta-button primary">
            <FaPhotoVideo /> View Gallery
          </button>
          <button onClick={() => onExplore('images')} className="cta-button secondary">
            <FaImages /> School Images
          </button>
          <button onClick={() => onExplore('performance')} className="cta-button tertiary">
            <FaTrophy /> Top Performers
          </button>
        </div>
      </div>
    </div>
  </section>
);

// School Gallery Section (Images and Videos)
const SchoolGallerySection = ({ 
  ref, 
  data, 
  filteredData, 
  isAdmin, 
  managementMode, 
  onToggleManagement, 
  onOpenMedia,
  onEditItem,
  onAddItem,
  onDeleteItem 
}) => {
  const images = filteredData.filter(item => item.type === 'image');
  const videos = filteredData.filter(item => item.type === 'video');

  const handleEdit = (item) => {
    onEditItem(item, 'gallery');
  };

  const handleDelete = (itemId) => {
    onDeleteItem('gallery', itemId);
  };

  return (
    <section ref={ref} className="gallery-section">
      <div className="section-header">
        <div className="section-title">
          <FaPhotoVideo className="section-icon" />
          <div>
            <h2>School Gallery</h2>
            <p>Explore our collection of images and videos showcasing school life and events</p>
          </div>
        </div>
        <div className="section-actions">
          <div className="media-breakdown">
            <span className="image-count">{images.length} images</span>
            <span className="video-count">{videos.length} videos</span>
          </div>
          {isAdmin && (
            <div className="admin-actions">
              <button 
                className={`management-toggle-btn ${managementMode ? 'active' : ''}`}
                onClick={() => onToggleManagement('gallery')}
              >
                {managementMode ? <FaEye /> : <FaEdit />}
                <span>
                  {managementMode ? 'View Mode' : 'Manage Gallery'}
                </span>
              </button>
              {managementMode && (
                <button 
                  className="add-content-btn primary"
                  onClick={() => onAddItem('gallery')}
                >
                  <FaPlus /> Add Item
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="gallery-content">
        {filteredData.length === 0 ? (
          <div className="empty-state">
            <FaPhotoVideo className="empty-icon" />
            <h3>No gallery items found</h3>
            <p>Try adjusting your search terms or category filter</p>
            {isAdmin && managementMode && (
              <button 
                className="add-content-btn primary"
                onClick={() => onAddItem('gallery')}
              >
                <FaPlus /> Add Gallery Item
              </button>
            )}
          </div>
        ) : (
          <div className="mixed-gallery">
            {/* Images Grid */}
            {images.length > 0 && (
              <div className="gallery-subsection">
                <h3 className="subsection-title">
                  <FaImage /> Photos ({images.length})
                </h3>
                <div className="masonry-grid">
                  {images.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={`masonry-item ${managementMode ? 'management-mode' : ''}`}
                      onClick={() => !managementMode && onOpenMedia(item, 'image', index)}
                    >
                      <img src={item.image} alt={item.title} />
                      <div className="image-overlay">
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <span className="item-category">{item.category}</span>
                      </div>
                      {managementMode && (
                        <div className="management-actions">
                          <button 
                            className="edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(item);
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item.id);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos Grid */}
            {videos.length > 0 && (
              <div className="gallery-subsection">
                <h3 className="subsection-title">
                  <FaVideo /> Videos ({videos.length})
                </h3>
                <div className="video-grid">
                  {videos.map((video, index) => (
                    <div 
                      key={video.id} 
                      className={`video-card ${managementMode ? 'management-mode' : ''}`}
                      onClick={() => !managementMode && onOpenMedia(video, 'video', index)}
                    >
                      <div className="video-thumbnail">
                        <img src={video.thumbnail} alt={video.title} />
                        <div className="video-overlay">
                          <FaPlay />
                        </div>
                        <div className="video-duration">3:45</div>
                      </div>
                      <div className="video-info">
                        <h4>{video.title}</h4>
                        <p>{video.description}</p>
                        <div className="video-meta">
                          <span className="category">{video.category}</span>
                          <span className="date">{new Date(video.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {managementMode && (
                        <div className="management-actions">
                          <button 
                            className="edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(video);
                            }}
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(video.id);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// School Images Section (Only Images)
const SchoolImagesSection = ({ 
  ref, 
  data, 
  filteredData, 
  isAdmin, 
  managementMode, 
  onToggleManagement, 
  onOpenMedia,
  onEditItem,
  onAddItem,
  onDeleteItem 
}) => {
  const handleEdit = (item) => {
    onEditItem(item, 'images');
  };

  const handleDelete = (itemId) => {
    onDeleteItem('images', itemId);
  };

  return (
    <section ref={ref} className="images-section">
      <div className="section-header">
        <div className="section-title">
          <FaImages className="section-icon" />
          <div>
            <h2>School Images</h2>
            <p>Featured images of our campus, facilities, and school environment</p>
          </div>
        </div>
        <div className="section-actions">
          <span className="media-count">
            {filteredData.length} of {data.length} images
          </span>
          {isAdmin && (
            <div className="admin-actions">
              <button 
                className={`management-toggle-btn ${managementMode ? 'active' : ''}`}
                onClick={() => onToggleManagement('images')}
              >
                {managementMode ? <FaEye /> : <FaEdit />}
                <span>
                  {managementMode ? 'View Mode' : 'Manage Images'}
                </span>
              </button>
              {managementMode && (
                <button 
                  className="add-content-btn primary"
                  onClick={() => onAddItem('images')}
                >
                  <FaPlus /> Add Image
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="images-content">
        {filteredData.length === 0 ? (
          <div className="empty-state">
            <FaImages className="empty-icon" />
            <h3>No school images found</h3>
            <p>Try adjusting your search terms or category filter</p>
            {isAdmin && managementMode && (
              <button 
                className="add-content-btn primary"
                onClick={() => onAddItem('images')}
              >
                <FaPlus /> Add School Image
              </button>
            )}
          </div>
        ) : (
          <div className="featured-images-grid">
            {filteredData.map((image, index) => (
              <div 
                key={image.id} 
                className={`image-card ${image.featured ? 'featured' : ''} ${managementMode ? 'management-mode' : ''}`}
                onClick={() => !managementMode && onOpenMedia(image, 'image', index)}
              >
                <div className="card-image">
                  <img src={image.image} alt={image.title} />
                  {image.featured && (
                    <div className="featured-badge">
                      <FaStar /> Featured
                    </div>
                  )}
                  <div className="image-overlay">
                    <h4>{image.title}</h4>
                    <p>{image.description}</p>
                  </div>
                </div>
                <div className="card-content">
                  <div className="image-meta">
                    <span className="category-tag">{image.category}</span>
                    <span className="date">{new Date(image.date).toLocaleDateString()}</span>
                  </div>
                  {managementMode && (
                    <div className="management-actions">
                      <button 
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(image);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button className="feature-btn">
                        {image.featured ? <FaStar /> : <FaRegBookmark />}
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(image.id);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Best Performance Section
const BestPerformanceSection = ({ 
  ref, 
  data, 
  isAdmin, 
  managementMode, 
  onToggleManagement,
  onEditItem,
  onAddItem,
  onDeleteItem 
}) => {
  const handleEdit = (student) => {
    onEditItem(student, 'performance');
  };

  const handleDelete = (studentId) => {
    onDeleteItem('performance', studentId);
  };

  return (
    <section ref={ref} className="performance-section">
      <div className="section-header">
        <div className="section-title">
          <FaTrophy className="section-icon" />
          <div>
            <h2>Best Performance Students of the Term</h2>
            <p>Celebrating academic excellence and outstanding achievements across all grades</p>
          </div>
        </div>
        <div className="section-actions">
          <span className="media-count">{data.length} top performers</span>
          {isAdmin && (
            <div className="admin-actions">
              <button 
                className={`management-toggle-btn ${managementMode ? 'active' : ''}`}
                onClick={() => onToggleManagement('performance')}
              >
                {managementMode ? <FaEye /> : <FaEdit />}
                <span>
                  {managementMode ? 'View Mode' : 'Manage Students'}
                </span>
              </button>
              {managementMode && (
                <button 
                  className="add-content-btn primary"
                  onClick={() => onAddItem('performance')}
                >
                  <FaPlus /> Add Student
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="performance-content">
        {data.length === 0 ? (
          <div className="empty-state">
            <FaTrophy className="empty-icon" />
            <h3>No performance data available</h3>
            <p>Student performance records will be displayed here</p>
            {isAdmin && managementMode && (
              <button 
                className="add-content-btn primary"
                onClick={() => onAddItem('performance')}
              >
                <FaPlus /> Add Student Record
              </button>
            )}
          </div>
        ) : (
          <div className="performance-grid">
            {data.map((student, index) => (
              <div key={student.id} className={`performance-card ${index === 0 ? 'top-performer' : ''}`}>
                <div className="performance-rank">
                  <div className="rank-badge">#{index + 1}</div>
                  {index === 0 && <FaCrown className="crown-icon" />}
                </div>
                
                <div className="student-image">
                  <img src={student.image} alt={student.name} />
                  <div className="grade-badge">
                    <span>{student.grade}</span>
                  </div>
                </div>
                
                <div className="student-info">
                  <h3>{student.name}</h3>
                  <p className="student-class">{student.class}</p>
                  <div className="performance-stats">
                    <div className="stat">
                      <span className="stat-value">{student.average}%</span>
                      <span className="stat-label">Average</span>
                    </div>
                    <div className="stat">
                      <span className="stat-value">{student.achievements.length}</span>
                      <span className="stat-label">Achievements</span>
                    </div>
                  </div>
                  
                  <div className="subject-scores">
                    {Object.entries(student.subjects).map(([subject, score]) => (
                      <div key={subject} className="subject-score">
                        <span className="subject-name">{subject}</span>
                        <div className="score-bar">
                          <div 
                            className="score-fill" 
                            style={{ width: `${score}%` }}
                          ></div>
                          <span className="score-value">{score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="achievements-list">
                    {student.achievements.map((achievement, idx) => (
                      <span key={idx} className="achievement-tag">
                        <FaAward /> {achievement}
                      </span>
                    ))}
                  </div>
                </div>
                
                {managementMode && (
                  <div className="management-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(student)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(student.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// Media Club Section with all sub-sections
const MediaClubSection = ({ 
  ref, 
  data, 
  starStudents, 
  smartStudents, 
  promisedTalents, 
  schoolNews,
  isAdmin, 
  managementMode, 
  onToggleManagement,
  onOpenMedia,
  onEditItem,
  onAddItem,
  onDeleteItem 
}) => {
  const handleEdit = (item, section = 'mediaClub') => {
    onEditItem(item, section);
  };

  const handleDelete = (itemId, section = 'mediaClub') => {
    onDeleteItem(section, itemId);
  };

  return (
    <section ref={ref} className="media-club-section">
      <div className="section-header">
        <div className="section-title">
          <FaBroadcastTower className="section-icon" />
          <div>
            <h2>Media Club & Student Recognition</h2>
            <p>Showcasing exceptional talents, achievements, and the latest school news</p>
          </div>
        </div>
        <div className="section-actions">
          <span className="media-count">
            {data.length + starStudents.length + smartStudents.length + promisedTalents.length + schoolNews.length} items
          </span>
          {isAdmin && (
            <div className="admin-actions">
              <button 
                className={`management-toggle-btn ${managementMode ? 'active' : ''}`}
                onClick={() => onToggleManagement('mediaClub')}
              >
                {managementMode ? <FaEye /> : <FaEdit />}
                <span>
                  {managementMode ? 'View Mode' : 'Manage Content'}
                </span>
              </button>
              {managementMode && (
                <button 
                  className="add-content-btn primary"
                  onClick={() => onAddItem('mediaClub')}
                >
                  <FaPlus /> Add Content
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="media-club-content">
        {/* Star Students of the Term */}
        <div className="recognition-subsection">
          <div className="subsection-header">
            <FaStar className="subsection-icon" style={{ color: '#F59E0B' }} />
            <h3>Star Boy & Girl of the Term</h3>
            <span className="subsection-count">{starStudents.length} students</span>
          </div>
          
          <div className="students-grid">
            {starStudents.map((student) => (
              <div key={student.id} className="student-card star-student">
                <div className="student-image">
                  <img src={student.image} alt={student.name} />
                  <div className="gender-icon">
                    {student.gender === 'female' ? <FaVenus /> : <FaMars />}
                  </div>
                  <div className="student-badge">
                    <FaStar />
                  </div>
                </div>
                
                <div className="student-details">
                  <h4>{student.name}</h4>
                  <p className="student-class">{student.class}</p>
                  <p className="student-description">{student.description}</p>
                  
                  <div className="achievements">
                    {student.achievements.map((achievement, idx) => (
                      <span key={idx} className="achievement">
                        <FaCheck /> {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Students of the Term */}
        <div className="recognition-subsection">
          <div className="subsection-header">
            <FaBrain className="subsection-icon" style={{ color: '#3B82F6' }} />
            <h3>Smart Boy & Girl of the Term</h3>
            <span className="subsection-count">{smartStudents.length} students</span>
          </div>
          
          <div className="students-grid">
            {smartStudents.map((student) => (
              <div key={student.id} className="student-card smart-student">
                <div className="student-image">
                  <img src={student.image} alt={student.name} />
                  <div className="gender-icon">
                    {student.gender === 'female' ? <FaVenus /> : <FaMars />}
                  </div>
                  <div className="iq-score">
                    <span>IQ {student.iqScore}</span>
                  </div>
                </div>
                
                <div className="student-details">
                  <h4>{student.name}</h4>
                  <p className="student-class">{student.class}</p>
                  <p className="student-description">{student.description}</p>
                  
                  <div className="achievements">
                    {student.achievements.map((achievement, idx) => (
                      <span key={idx} className="achievement">
                        <FaCheck /> {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Promised Talents */}
        <div className="recognition-subsection">
          <div className="subsection-header">
            <FaGem className="subsection-icon" style={{ color: '#8B5CF6' }} />
            <h3>Top 5 Promised Talents of the Term</h3>
            <span className="subsection-count">{promisedTalents.length} talents</span>
          </div>
          
          <div className="talents-grid">
            {promisedTalents.sort((a, b) => a.rank - b.rank).map((talent) => (
              <div key={talent.id} className="talent-card">
                <div className="talent-rank">
                  <span>#{talent.rank}</span>
                </div>
                
                <div className="talent-image">
                  <img src={talent.image} alt={talent.name} />
                  <div className="talent-fire">
                    <FaFire />
                  </div>
                </div>
                
                <div className="talent-details">
                  <h4>{talent.name}</h4>
                  <p className="talent-class">{talent.class}</p>
                  <div className="talent-specialty">
                    <FaRocket />
                    <span>{talent.talent}</span>
                  </div>
                  
                  <div className="talent-achievements">
                    {talent.achievements.map((achievement, idx) => (
                      <span key={idx} className="achievement">
                        {achievement}
                      </span>
                    ))}
                  </div>
                  
                  <div className="talent-potential">
                    <FaLightbulb />
                    <span>{talent.potential}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* School News */}
        <div className="recognition-subsection">
          <div className="subsection-header">
            <FaNewspaper className="subsection-icon" style={{ color: '#EF4444' }} />
            <h3>School News & Updates</h3>
            <span className="subsection-count">{schoolNews.length} news items</span>
          </div>
          
          <div className="news-grid">
            {schoolNews.map((news) => (
              <div key={news.id} className="news-card">
                <div className="news-image">
                  <img src={news.image} alt={news.title} />
                  <div className="news-category">
                    {news.category}
                  </div>
                  <div className="news-views">
                    <FaEye /> {news.views}
                  </div>
                </div>
                
                <div className="news-content">
                  <h4>{news.title}</h4>
                  <p>{news.content}</p>
                  
                  <div className="news-meta">
                    <span className="news-date">
                      <FaCalendar />
                      {new Date(news.date).toLocaleDateString()}
                    </span>
                    <span className="news-author">
                      <FaUser />
                      {news.author}
                    </span>
                  </div>
                  
                  <button className="read-more-btn">
                    <FaArrowRight />
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Original Media Club Content */}
        <div className="recognition-subsection">
          <div className="subsection-header">
            <FaFilm className="subsection-icon" style={{ color: '#10B981' }} />
            <h3>Media Productions</h3>
            <span className="subsection-count">{data.length} media projects</span>
          </div>
          
          {data.length === 0 ? (
            <div className="empty-state">
              <FaFilm className="empty-icon" />
              <h3>No media projects found</h3>
              <p>Media club projects will be displayed here</p>
              {isAdmin && managementMode && (
                <button 
                  className="add-content-btn primary"
                  onClick={() => onAddItem('mediaClub')}
                >
                  <FaPlus /> Create Project
                </button>
              )}
            </div>
          ) : (
            <div className="media-grid">
              {data.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`media-card ${managementMode ? 'management-mode' : ''}`}
                  onClick={() => !managementMode && onOpenMedia(item, item.type, index)}
                >
                  <div className="media-thumbnail">
                    {item.type === 'video' ? (
                      <>
                        <img src={item.thumbnail} alt={item.title} />
                        <div className="play-overlay">
                          <FaPlay />
                        </div>
                      </>
                    ) : (
                      <img src={item.image} alt={item.title} />
                    )}
                    <div className="media-type-badge">
                      {item.type === 'video' ? <FaVideo /> : 
                      item.type === 'article' ? <FaNewspaper /> : 
                      item.type === 'podcast' ? <FaPodcast /> : 
                      <FaImage />}
                      <span>{item.type}</span>
                    </div>
                  </div>
                  <div className="media-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <div className="media-meta">
                      <span className="category">{item.category}</span>
                      <span className="author">By {item.author}</span>
                      <span className="date">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    {managementMode && (
                      <div className="management-actions">
                        <button 
                          className="edit-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(item);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Media Modal Component
const MediaModal = ({ 
  media, 
  type, 
  onClose, 
  onNavigate,
  currentIndex,
  totalItems,
  isAdmin 
}) => {
  if (!media) return null;

  return (
    <div className="media-modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        
        {type === 'image' && (
          <>
            <button className="modal-nav prev" onClick={() => onNavigate('prev')}>
              <FaChevronLeft />
            </button>
            <button className="modal-nav next" onClick={() => onNavigate('next')}>
              <FaChevronRight />
            </button>
            <div className="modal-image-container">
              <img src={media.image} alt={media.title} />
            </div>
            <div className="modal-counter">
              {currentIndex + 1} / {totalItems}
            </div>
          </>
        )}
        
        {type === 'video' && (
          <div className="video-container">
            <iframe
              src={media.url}
              title={media.title}
              allowFullScreen
            ></iframe>
          </div>
        )}
        
        <div className="modal-info">
          <h3>{media.title}</h3>
          <p>{media.description}</p>
          <div className="modal-meta">
            <span className="modal-category">
              <FaTag /> {media.category || 'General'}
            </span>
            <span className="modal-date">
              <FaCalendar /> {new Date(media.uploadedAt || media.date).toLocaleDateString()}
            </span>
            {isAdmin && (
              <span className="modal-uploader">
                <FaUser /> {media.uploadedBy || 'System'}
              </span>
            )}
          </div>
          
          <div className="modal-actions">
            <button className="action-btn">
              <FaRegHeart /> Like
            </button>
            <button className="action-btn">
              <FaRegComment /> Comment
            </button>
            <button className="action-btn">
              <FaShare /> Share
            </button>
            <button className="action-btn">
              <FaDownload /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Modal Component
const AdminModal = ({ 
  isOpen, 
  onClose, 
  section, 
  editingItem, 
  onSave, 
  onDelete,
  convertToBase64 
}) => {
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      // Initialize empty form based on section
      const baseForm = {
        title: '',
        description: '',
        category: 'academic',
        date: new Date().toISOString().split('T')[0]
      };

      switch (section) {
        case 'gallery':
          setFormData({ ...baseForm, type: 'image', image: '' });
          break;
        case 'images':
          setFormData({ ...baseForm, featured: false });
          break;
        case 'performance':
          setFormData({ 
            name: '', 
            class: '', 
            grade: 'A', 
            average: 0,
            image: '',
            achievements: [],
            subjects: {}
          });
          break;
        case 'mediaClub':
          setFormData({ ...baseForm, type: 'image', author: 'Admin' });
          break;
        default:
          setFormData(baseForm);
      }
    }
  }, [editingItem, section]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }

      setUploading(true);
      try {
        const base64 = await convertToBase64(file);
        setFormData(prev => ({ ...prev, image: base64 }));
      } catch (error) {
        setErrors(prev => ({ ...prev, image: 'Failed to upload image' }));
      } finally {
        setUploading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    
    if (section === 'gallery' || section === 'images') {
      if (!formData.image) newErrors.image = 'Image is required';
    }
    
    if (section === 'performance') {
      if (!formData.name?.trim()) newErrors.name = 'Student name is required';
      if (!formData.class?.trim()) newErrors.class = 'Class is required';
      if (formData.average < 0 || formData.average > 100) newErrors.average = 'Average must be between 0-100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    onSave(formData);
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete();
      onClose();
    }
  };

  if (!isOpen) return null;

  const getSectionTitle = () => {
    const sections = {
      gallery: 'Gallery Item',
      images: 'School Image',
      performance: 'Student Performance',
      mediaClub: 'Media Club Content'
    };
    return `${editingItem ? 'Edit' : 'Add New'} ${sections[section]}`;
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{getSectionTitle()}</h2>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-content">
          {/* Common Fields */}
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="3"
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category || 'academic'}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="academic">Academic</option>
              <option value="sports">Sports</option>
              <option value="cultural">Cultural</option>
              <option value="events">Events</option>
              <option value="campus">Campus</option>
              <option value="facilities">Facilities</option>
            </select>
          </div>

          {/* Section-specific fields */}
          {['gallery', 'images'].includes(section) && (
            <div className="form-group">
              <label>Image *</label>
              <div className="image-upload-area">
                {formData.image ? (
                  <div className="image-preview">
                    <img src={formData.image} alt="Preview" />
                    <button 
                      type="button" 
                      className="change-image-btn"
                      onClick={() => handleInputChange('image', '')}
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <label className="upload-label">
                    <FaCloudUploadAlt className="upload-icon" />
                    <span>Click to upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    {uploading && <div className="uploading-overlay">Uploading...</div>}
                  </label>
                )}
                {errors.image && <span className="error-text">{errors.image}</span>}
              </div>
            </div>
          )}

          {section === 'gallery' && (
            <div className="form-group">
              <label>Type</label>
              <select
                value={formData.type || 'image'}
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
          )}

          {section === 'performance' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Student Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label>Class *</label>
                  <input
                    type="text"
                    value={formData.class || ''}
                    onChange={(e) => handleInputChange('class', e.target.value)}
                    className={errors.class ? 'error' : ''}
                  />
                  {errors.class && <span className="error-text">{errors.class}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Grade</label>
                  <select
                    value={formData.grade || 'A'}
                    onChange={(e) => handleInputChange('grade', e.target.value)}
                  >
                    <option value="A+">A+</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Average Score *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.average || 0}
                    onChange={(e) => handleInputChange('average', parseFloat(e.target.value))}
                    className={errors.average ? 'error' : ''}
                  />
                  {errors.average && <span className="error-text">{errors.average}</span>}
                </div>
              </div>
            </>
          )}

          {section === 'images' && (
            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                />
                <span className="checkmark"></span>
                Featured Image
              </label>
            </div>
          )}
        </div>

        <div className="modal-actions">
          {editingItem && (
            <button className="btn-danger" onClick={handleDelete}>
              <FaTrash /> Delete
            </button>
          )}
          <div className="action-group">
            <button className="btn-secondary" onClick={onClose}>
              <FaTimes /> Cancel
            </button>
            <button className="btn-primary" onClick={handleSave}>
              <FaSave /> {editingItem ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const SchoolLife = () => {
  const galleryRef = useRef(null);
  const imagesRef = useRef(null);
  const performanceRef = useRef(null);
  const mediaClubRef = useRef(null);
  
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const navigate = useNavigate();
  const { user, isAdmin } = useAdminAuth();
  const schoolData = useSchoolLifeData();
  const mediaManager = useMediaManagement(user, schoolData.refreshData);

  const refs = useMemo(() => ({
    gallery: galleryRef,
    images: imagesRef,
    performance: performanceRef,
    mediaClub: mediaClubRef
  }), []);

  const scrollTo = useCallback((key) => {
    const ref = refs[key];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [refs]);

  const openMediaModal = useCallback((media, type, index = 0) => {
    setSelectedMedia(media);
    setMediaType(type);
    setCurrentImageIndex(index);
  }, []);

  const closeMediaModal = useCallback(() => {
    setSelectedMedia(null);
    setMediaType('');
    setCurrentImageIndex(0);
  }, []);

  const navigateImage = useCallback((direction) => {
    if (mediaType !== 'image') return;
    
    let filteredData;
    if (selectedMedia && schoolData.schoolImages.includes(selectedMedia)) {
      filteredData = getFilteredData(schoolData.schoolImages);
    } else {
      filteredData = getFilteredData(schoolData.schoolGallery.filter(item => item.type === 'image'));
    }
    
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentImageIndex + 1) % filteredData.length;
    } else {
      newIndex = (currentImageIndex - 1 + filteredData.length) % filteredData.length;
    }
    
    setCurrentImageIndex(newIndex);
    setSelectedMedia(filteredData[newIndex]);
  }, [mediaType, currentImageIndex, selectedMedia, schoolData, activeCategory, searchTerm]);

  const handleAdminAccess = useCallback(() => {
    if (!isAdmin) {
      alert('Access Denied: This feature is available to administrators only.');
      return;
    }
    navigate('/admin-dashboard');
  }, [isAdmin, navigate]);

  // Filter functions
  const getFilteredData = useCallback((data) => {
    let filtered = data || [];
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filtered;
  }, [activeCategory, searchTerm]);

  const filteredGallery = getFilteredData(schoolData.schoolGallery);
  const filteredImages = getFilteredData(schoolData.schoolImages);

  const stats = useMemo(() => ({
    gallery: schoolData.schoolGallery.length,
    images: schoolData.schoolImages.length,
    performance: schoolData.bestPerformance.length,
    mediaClub: schoolData.mediaClub.length,
    starStudents: schoolData.starStudents.length,
    smartStudents: schoolData.smartStudents.length,
    promisedTalents: schoolData.promisedTalents.length,
    schoolNews: schoolData.schoolNews.length,
    total: schoolData.schoolGallery.length + schoolData.schoolImages.length + 
           schoolData.mediaClub.length + schoolData.bestPerformance.length +
           schoolData.starStudents.length + schoolData.smartStudents.length +
           schoolData.promisedTalents.length + schoolData.schoolNews.length
  }), [schoolData]);

  const handleEditItem = useCallback((item, section) => {
    mediaManager.startEditing(item, section);
  }, [mediaManager]);

  const handleAddItem = useCallback((section) => {
    mediaManager.startAdding(section);
  }, [mediaManager]);

  const handleDeleteItem = useCallback((section, itemId) => {
    schoolData.deleteItem(section, itemId);
  }, [schoolData]);

  const handleSaveItem = useCallback((itemData) => {
    const section = mediaManager.currentSection;
    if (mediaManager.editingItem) {
      // Update existing item
      schoolData.updateItem(section, mediaManager.editingItem.id, itemData);
    } else {
      // Add new item
      schoolData.addItem(section, itemData);
    }
  }, [schoolData, mediaManager]);

  const handleDeleteItemFromModal = useCallback(() => {
    if (mediaManager.editingItem && mediaManager.currentSection) {
      schoolData.deleteItem(mediaManager.currentSection, mediaManager.editingItem.id);
    }
  }, [schoolData, mediaManager]);

  if (schoolData.loading) {
    return (
      <div className="school-life-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading School Life...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="school-life-page">
      <NavigationSidebar
        isAdmin={isAdmin}
        user={user}
        onScrollTo={scrollTo}
        stats={stats}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onToggleManagement={mediaManager.toggleManagementMode}
        managementMode={mediaManager.managementMode}
        onAdminAccess={handleAdminAccess}
      />

      <main className="school-life-content">
        <HeroSection
          stats={stats}
          onExplore={scrollTo}
          isAdmin={isAdmin}
        />

        <SchoolGallerySection
          ref={galleryRef}
          data={schoolData.schoolGallery}
          filteredData={filteredGallery}
          isAdmin={isAdmin}
          managementMode={mediaManager.managementMode.gallery}
          onToggleManagement={mediaManager.toggleManagementMode}
          onOpenMedia={openMediaModal}
          onEditItem={handleEditItem}
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
        />

        <SchoolImagesSection
          ref={imagesRef}
          data={schoolData.schoolImages}
          filteredData={filteredImages}
          isAdmin={isAdmin}
          managementMode={mediaManager.managementMode.images}
          onToggleManagement={mediaManager.toggleManagementMode}
          onOpenMedia={openMediaModal}
          onEditItem={handleEditItem}
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
        />

        <BestPerformanceSection
          ref={performanceRef}
          data={schoolData.bestPerformance}
          isAdmin={isAdmin}
          managementMode={mediaManager.managementMode.performance}
          onToggleManagement={mediaManager.toggleManagementMode}
          onEditItem={handleEditItem}
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
        />

        <MediaClubSection
          ref={mediaClubRef}
          data={schoolData.mediaClub}
          starStudents={schoolData.starStudents}
          smartStudents={schoolData.smartStudents}
          promisedTalents={schoolData.promisedTalents}
          schoolNews={schoolData.schoolNews}
          isAdmin={isAdmin}
          managementMode={mediaManager.managementMode.mediaClub}
          onToggleManagement={mediaManager.toggleManagementMode}
          onOpenMedia={openMediaModal}
          onEditItem={handleEditItem}
          onAddItem={handleAddItem}
          onDeleteItem={handleDeleteItem}
        />
      </main>

      <MediaModal
        media={selectedMedia}
        type={mediaType}
        onClose={closeMediaModal}
        onNavigate={navigateImage}
        currentIndex={currentImageIndex}
        totalItems={mediaType === 'image' ? 
          (selectedMedia && schoolData.schoolImages.includes(selectedMedia) ? 
            filteredImages.length : 
            filteredGallery.filter(item => item.type === 'image').length
          ) : 0
        }
        isAdmin={isAdmin}
      />

      {/* Admin Management Modal */}
      <AdminModal
        isOpen={mediaManager.showAddModal}
        onClose={mediaManager.closeModal}
        section={mediaManager.currentSection}
        editingItem={mediaManager.editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItemFromModal}
        convertToBase64={mediaManager.convertToBase64}
      />
    </div>
  );
};

export default SchoolLife;