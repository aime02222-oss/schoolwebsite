import React, { useState, useEffect } from 'react';
import { 
  FaPhotoVideo, 
  FaImages, 
  FaTrophy, 
  FaBroadcastTower,
  FaStar,
  FaBrain,
  FaGem,
  FaNewspaper,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaSearch,
  FaFilter,
  FaSave,
  FaTimes,
  FaCloudUploadAlt,
  FaUser,
  FaSchool,
  FaAward,
  FaVenus,
  FaMars,
  FaCrown,
  FaFire,
  FaRocket,
  FaCalendar,
  FaTag
} from 'react-icons/fa';
import './SchoolLifeManager.css';

// Default stats structure to prevent undefined errors
const defaultStats = {
  gallery: 0,
  images: 0,
  performance: 0,
  mediaClub: 0,
  starStudents: 0,
  smartStudents: 0,
  promisedTalents: 0,
  schoolNews: 0
};

const SchoolLifeManager = ({ stats = defaultStats }) => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [data, setData] = useState({
    gallery: [],
    images: [],
    performance: [],
    mediaClub: [],
    starStudents: [],
    smartStudents: [],
    promisedTalents: [],
    schoolNews: []
  });
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Safe tabs configuration with fallback for undefined stats
  const tabs = [
    { id: 'gallery', label: 'School Gallery', icon: FaPhotoVideo, count: stats?.gallery || 0 },
    { id: 'images', label: 'School Images', icon: FaImages, count: stats?.images || 0 },
    { id: 'performance', label: 'Best Performance', icon: FaTrophy, count: stats?.performance || 0 },
    { id: 'starStudents', label: 'Star Students', icon: FaStar, count: stats?.starStudents || 0 },
    { id: 'smartStudents', label: 'Smart Students', icon: FaBrain, count: stats?.smartStudents || 0 },
    { id: 'promisedTalents', label: 'Promised Talents', icon: FaGem, count: stats?.promisedTalents || 0 },
    { id: 'schoolNews', label: 'School News', icon: FaNewspaper, count: stats?.schoolNews || 0 },
    { id: 'mediaClub', label: 'Media Club', icon: FaBroadcastTower, count: stats?.mediaClub || 0 }
  ];

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    try {
      const allData = {
        gallery: JSON.parse(localStorage.getItem('apaer_school_gallery') || '[]'),
        images: JSON.parse(localStorage.getItem('apaer_school_images') || '[]'),
        performance: JSON.parse(localStorage.getItem('apaer_best_performance') || '[]'),
        mediaClub: JSON.parse(localStorage.getItem('apaer_media_club') || '[]'),
        starStudents: JSON.parse(localStorage.getItem('apaer_star_students') || '[]'),
        smartStudents: JSON.parse(localStorage.getItem('apaer_smart_students') || '[]'),
        promisedTalents: JSON.parse(localStorage.getItem('apaer_promised_talents') || '[]'),
        schoolNews: JSON.parse(localStorage.getItem('apaer_school_news') || '[]')
      };
      setData(allData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading school life data:', error);
      // Initialize with empty arrays if there's an error
      setData({
        gallery: [],
        images: [],
        performance: [],
        mediaClub: [],
        starStudents: [],
        smartStudents: [],
        promisedTalents: [],
        schoolNews: []
      });
      setLoading(false);
    }
  };

  const saveData = (key, newData) => {
    try {
      localStorage.setItem(`apaer_${key}`, JSON.stringify(newData));
      loadAllData();
      // Trigger storage event to update other components
      window.dispatchEvent(new Event('storage'));
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  };

  const addItem = (section, newItem) => {
    const currentData = data[section] || [];
    const itemWithId = {
      ...newItem,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      // Add default image if none provided
      image: newItem.image || 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    };
    const updatedData = [...currentData, itemWithId];
    return saveData(section, updatedData);
  };

  const updateItem = (section, itemId, updatedItem) => {
    const currentData = data[section] || [];
    const updatedData = currentData.map(item => 
      item.id === itemId ? { 
        ...item, 
        ...updatedItem, 
        updatedAt: new Date().toISOString(),
        // Preserve image if not updated
        image: updatedItem.image || item.image
      } : item
    );
    return saveData(section, updatedData);
  };

  const deleteItem = (section, itemId) => {
    const currentData = data[section] || [];
    const updatedData = currentData.filter(item => item.id !== itemId);
    return saveData(section, updatedData);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      deleteItem(activeTab, itemId);
    }
  };

  const handleSave = (formData) => {
    if (editingItem) {
      updateItem(activeTab, editingItem.id, formData);
    } else {
      addItem(activeTab, formData);
    }
    setShowModal(false);
    setEditingItem(null);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleImageUpload = async (event, setFormData) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      try {
        const base64 = await convertToBase64(file);
        setFormData(prev => ({ ...prev, image: base64 }));
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };

  // Safe data access with fallback
  const filteredData = (data[activeTab] || []).filter(item => 
    item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.class?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.talent?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return <div className="loading-state">Loading...</div>;
    }

    switch (activeTab) {
      case 'gallery':
        return renderGallery();
      case 'images':
        return renderImages();
      case 'performance':
        return renderPerformance();
      case 'starStudents':
        return renderStarStudents();
      case 'smartStudents':
        return renderSmartStudents();
      case 'promisedTalents':
        return renderPromisedTalents();
      case 'schoolNews':
        return renderSchoolNews();
      case 'mediaClub':
        return renderMediaClub();
      default:
        return renderGallery();
    }
  };

  const renderGallery = () => (
    <div className="content-grid">
      {filteredData.map(item => (
        <div key={item.id} className="content-card">
          <div className="card-image">
            <img src={item.image || item.thumbnail} alt={item.title} />
            <div className="card-badge">{item.type}</div>
          </div>
          <div className="card-content">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <div className="card-meta">
              <span><FaTag /> {item.category}</span>
              <span><FaCalendar /> {new Date(item.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn-edit" onClick={() => handleEdit(item)}>
              <FaEdit />
            </button>
            <button className="btn-delete" onClick={() => handleDelete(item.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderImages = () => (
    <div className="content-grid">
      {filteredData.map(item => (
        <div key={item.id} className="content-card">
          <div className="card-image">
            <img src={item.image} alt={item.title} />
            {item.featured && <div className="featured-badge">Featured</div>}
          </div>
          <div className="card-content">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <div className="card-meta">
              <span><FaTag /> {item.category}</span>
              <span><FaCalendar /> {new Date(item.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn-edit" onClick={() => handleEdit(item)}>
              <FaEdit />
            </button>
            <button className="btn-delete" onClick={() => handleDelete(item.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPerformance = () => (
    <div className="performance-grid">
      {filteredData.map((student, index) => (
        <div key={student.id} className="performance-card">
          <div className="student-header">
            <div className="student-image">
              <img src={student.image} alt={student.name} />
              <div className="rank-badge">#{index + 1}</div>
            </div>
            <div className="student-info">
              <h4>{student.name}</h4>
              <p className="student-class">{student.class}</p>
              <div className="performance-stats">
                <span className="grade">{student.grade}</span>
                <span className="average">{student.average}%</span>
              </div>
            </div>
          </div>
          <div className="achievements">
            {(student.achievements || []).slice(0, 2).map((achievement, idx) => (
              <span key={idx} className="achievement-tag">
                <FaAward /> {achievement}
              </span>
            ))}
          </div>
          <div className="card-actions">
            <button className="btn-edit" onClick={() => handleEdit(student)}>
              <FaEdit />
            </button>
            <button className="btn-delete" onClick={() => handleDelete(student.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStarStudents = () => (
    <div className="students-grid">
      {filteredData.map(student => (
        <div key={student.id} className="student-card">
          <div className="student-image">
            <img src={student.image} alt={student.name} />
            <div className="gender-icon">
              {student.gender === 'female' ? <FaVenus /> : <FaMars />}
            </div>
            <div className="student-badge star">
              <FaStar />
            </div>
          </div>
          <div className="student-info">
            <h4>{student.name}</h4>
            <p className="student-class">{student.class}</p>
            <p className="student-description">{student.description}</p>
          </div>
          <div className="card-actions">
            <button className="btn-edit" onClick={() => handleEdit(student)}>
              <FaEdit />
            </button>
            <button className="btn-delete" onClick={() => handleDelete(student.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSmartStudents = () => (
    <div className="students-grid">
      {filteredData.map(student => (
        <div key={student.id} className="student-card">
          <div className="student-image">
            <img src={student.image} alt={student.name} />
            <div className="gender-icon">
              {student.gender === 'female' ? <FaVenus /> : <FaMars />}
            </div>
            <div className="iq-score">
              IQ {student.iqScore}
            </div>
          </div>
          <div className="student-info">
            <h4>{student.name}</h4>
            <p className="student-class">{student.class}</p>
            <p className="student-description">{student.description}</p>
          </div>
          <div className="card-actions">
            <button className="btn-edit" onClick={() => handleEdit(student)}>
              <FaEdit />
            </button>
            <button className="btn-delete" onClick={() => handleDelete(student.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPromisedTalents = () => (
    <div className="talents-grid">
      {filteredData.map(talent => (
        <div key={talent.id} className="talent-card">
          <div className="talent-rank">#{talent.rank}</div>
          <div className="talent-image">
            <img src={talent.image} alt={talent.name} />
            <div className="talent-fire">
              <FaFire />
            </div>
          </div>
          <div className="talent-info">
            <h4>{talent.name}</h4>
            <p className="talent-class">{talent.class}</p>
            <div className="talent-specialty">
              <FaRocket />
              <span>{talent.talent}</span>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn-edit" onClick={() => handleEdit(talent)}>
              <FaEdit />
            </button>
            <button className="btn-delete" onClick={() => handleDelete(talent.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSchoolNews = () => (
    <div className="news-grid">
      {filteredData.map(news => (
        <div key={news.id} className="news-card">
          <div className="news-image">
            <img src={news.image} alt={news.title} />
            <div className="news-category">{news.category}</div>
          </div>
          <div className="news-content">
            <h4>{news.title}</h4>
            <p>{news.content}</p>
            <div className="news-meta">
              <span><FaCalendar /> {new Date(news.date).toLocaleDateString()}</span>
              <span><FaUser /> {news.author}</span>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn-edit" onClick={() => handleEdit(news)}>
              <FaEdit />
            </button>
            <button className="btn-delete" onClick={() => handleDelete(news.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMediaClub = () => (
    <div className="content-grid">
      {filteredData.map(item => (
        <div key={item.id} className="content-card">
          <div className="card-image">
            <img src={item.image || item.thumbnail} alt={item.title} />
            <div className="card-badge">{item.type}</div>
          </div>
          <div className="card-content">
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            <div className="card-meta">
              <span><FaTag /> {item.category}</span>
              <span><FaUser /> {item.author}</span>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn-edit" onClick={() => handleEdit(item)}>
              <FaEdit />
            </button>
            <button className="btn-delete" onClick={() => handleDelete(item.id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="school-life-manager">
      <div className="manager-header">
        <div className="header-content">
          <FaSchool className="header-icon" />
          <div>
            <h1>School Life Content Manager</h1>
            <p>Manage all school gallery, student achievements, and media content</p>
          </div>
        </div>
        <button className="btn-primary" onClick={handleAddNew}>
          <FaPlus /> Add New {tabs.find(tab => tab.id === activeTab)?.label}
        </button>
      </div>

      <div className="manager-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder={`Search ${tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="tabs-navigation">
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent />
                <span>{tab.label}</span>
                {tab.count > 0 && <span className="tab-count">{tab.count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="manager-content">
        {filteredData.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              {activeTab === 'gallery' && <FaPhotoVideo />}
              {activeTab === 'images' && <FaImages />}
              {activeTab === 'performance' && <FaTrophy />}
              {activeTab === 'starStudents' && <FaStar />}
              {activeTab === 'smartStudents' && <FaBrain />}
              {activeTab === 'promisedTalents' && <FaGem />}
              {activeTab === 'schoolNews' && <FaNewspaper />}
              {activeTab === 'mediaClub' && <FaBroadcastTower />}
            </div>
            <h3>No {tabs.find(tab => tab.id === activeTab)?.label.toLowerCase()} found</h3>
            <p>Get started by adding your first item</p>
            <button className="btn-primary" onClick={handleAddNew}>
              <FaPlus /> Add New Item
            </button>
          </div>
        ) : (
          renderContent()
        )}
      </div>

      {showModal && (
        <AdminModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          section={activeTab}
          editingItem={editingItem}
          onSave={handleSave}
          onDelete={() => handleDelete(editingItem?.id)}
          onImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

// Admin Modal Component remains the same...
const AdminModal = ({ 
  isOpen, 
  onClose, 
  section, 
  editingItem, 
  onSave, 
  onDelete,
  onImageUpload 
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
          setFormData({ ...baseForm, featured: false, image: '' });
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
        case 'starStudents':
        case 'smartStudents':
          setFormData({
            name: '',
            class: '',
            image: '',
            gender: 'male',
            description: '',
            achievements: []
          });
          break;
        case 'promisedTalents':
          setFormData({
            name: '',
            class: '',
            talent: '',
            image: '',
            achievements: [],
            potential: '',
            rank: 1
          });
          break;
        case 'schoolNews':
          setFormData({
            ...baseForm,
            content: '',
            author: 'Admin',
            views: 0,
            image: ''
          });
          break;
        case 'mediaClub':
          setFormData({ ...baseForm, type: 'image', author: 'Admin', image: '' });
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true);
      try {
        await onImageUpload(event, setFormData);
      } catch (error) {
        console.error('Error handling file upload:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title?.trim() && !formData.name?.trim()) {
      newErrors.title = section === 'performance' || section.includes('Students') || section === 'promisedTalents' ? 'Name is required' : 'Title is required';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (['gallery', 'images', 'performance', 'starStudents', 'smartStudents', 'promisedTalents', 'schoolNews'].includes(section)) {
      if (!formData.image) newErrors.image = 'Image is required';
    }
    
    if (section === 'performance') {
      if (!formData.class?.trim()) newErrors.class = 'Class is required';
      if (formData.average < 0 || formData.average > 100) newErrors.average = 'Average must be between 0-100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    onSave(formData);
  };

  const handleModalDelete = () => {
    onDelete();
    onClose();
  };

  if (!isOpen) return null;

  const getSectionTitle = () => {
    const sections = {
      gallery: 'Gallery Item',
      images: 'School Image',
      performance: 'Student Performance',
      starStudents: 'Star Student',
      smartStudents: 'Smart Student',
      promisedTalents: 'Promised Talent',
      schoolNews: 'School News',
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
          {(section === 'gallery' || section === 'images' || section === 'schoolNews' || section === 'mediaClub') && (
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={errors.title ? 'error' : ''}
                placeholder="Enter title..."
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
          )}

          {(section === 'performance' || section === 'starStudents' || section === 'smartStudents' || section === 'promisedTalents') && (
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.title ? 'error' : ''}
                placeholder="Enter student name..."
              />
              {errors.title && <span className="error-text">{errors.title}</span>}
            </div>
          )}

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="3"
              className={errors.description ? 'error' : ''}
              placeholder="Enter description..."
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          {/* Image Upload for relevant sections */}
          {['gallery', 'images', 'performance', 'starStudents', 'smartStudents', 'promisedTalents', 'schoolNews'].includes(section) && (
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
                    <span>Click to upload image (Max 5MB)</span>
                    <span className="upload-subtext">JPG, PNG, GIF supported</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                    {uploading && <div className="uploading-overlay">Uploading...</div>}
                  </label>
                )}
                {errors.image && <span className="error-text">{errors.image}</span>}
              </div>
            </div>
          )}

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

          {(section === 'performance' || section === 'starStudents' || section === 'smartStudents' || section === 'promisedTalents') && (
            <div className="form-group">
              <label>Class</label>
              <input
                type="text"
                value={formData.class || ''}
                onChange={(e) => handleInputChange('class', e.target.value)}
                className={errors.class ? 'error' : ''}
                placeholder="e.g., Grade 12A"
              />
              {errors.class && <span className="error-text">{errors.class}</span>}
            </div>
          )}

          {section === 'performance' && (
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
                <label>Average Score</label>
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
          )}

          {(section === 'starStudents' || section === 'smartStudents') && (
            <div className="form-group">
              <label>Gender</label>
              <select
                value={formData.gender || 'male'}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          )}

          {section === 'smartStudents' && (
            <div className="form-group">
              <label>IQ Score</label>
              <input
                type="number"
                min="80"
                max="200"
                value={formData.iqScore || 100}
                onChange={(e) => handleInputChange('iqScore', parseInt(e.target.value))}
              />
            </div>
          )}

          {section === 'promisedTalents' && (
            <>
              <div className="form-group">
                <label>Talent/Specialty</label>
                <input
                  type="text"
                  value={formData.talent || ''}
                  onChange={(e) => handleInputChange('talent', e.target.value)}
                  placeholder="e.g., Musical Prodigy, Young Scientist"
                />
              </div>
              <div className="form-group">
                <label>Potential/Future</label>
                <input
                  type="text"
                  value={formData.potential || ''}
                  onChange={(e) => handleInputChange('potential', e.target.value)}
                  placeholder="e.g., Professional musician, Research scientist"
                />
              </div>
              <div className="form-group">
                <label>Rank (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rank || 1}
                  onChange={(e) => handleInputChange('rank', parseInt(e.target.value))}
                />
              </div>
            </>
          )}

          {section === 'schoolNews' && (
            <div className="form-group">
              <label>Content *</label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => handleInputChange('content', e.target.value)}
                rows="4"
                placeholder="Full news content..."
              />
            </div>
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
            <button className="btn-danger" onClick={handleModalDelete}>
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

export default SchoolLifeManager;