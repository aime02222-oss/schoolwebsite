import React, { useState, useEffect } from 'react';
import { 
  FaImages, 
  FaUserGraduate, 
  FaSchool, 
  FaVideo, 
  FaTrophy,
  FaPlus,
  FaEdit,
  FaTrash,
  FaUpload,
  FaEye,
  FaSearch,
  FaFilter,
  FaSort,
  FaDownload,
  FaSync,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaLayerGroup,
  FaRegImage,
  FaRegUser,
  FaRegFileVideo,
  FaAward
} from 'react-icons/fa';

const ContentManagementTab = ({ type }) => {
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  const contentTypes = {
    slides: {
      title: 'Hero Slides Management',
      description: 'Manage homepage hero slides and banners',
      icon: FaImages,
      columns: ['Preview', 'Title', 'Status', 'Order', 'Created', 'Actions'],
      sampleData: [
        {
          id: 1,
          title: 'Welcome to Apaer Institute',
          image: '/images/slide1.jpg',
          status: 'active',
          order: 1,
          created: '2024-01-15',
          description: 'Main welcome slide for homepage'
        },
        {
          id: 2,
          title: 'Excellence in Education',
          image: '/images/slide2.jpg',
          status: 'active',
          order: 2,
          created: '2024-01-10',
          description: 'Highlighting academic achievements'
        }
      ]
    },
    testimonials: {
      title: 'Testimonials Management',
      description: 'Manage student and alumni testimonials',
      icon: FaUserGraduate,
      columns: ['Student', 'Program', 'Rating', 'Status', 'Date', 'Actions'],
      sampleData: [
        {
          id: 1,
          name: 'Alice Uwase',
          program: 'O-Level Science',
          rating: 5,
          status: 'published',
          date: '2024-01-12',
          text: 'Excellent learning environment...'
        }
      ]
    },
    'school-life': {
      title: 'School Life Content',
      description: 'Manage school gallery and life images',
      icon: FaSchool,
      columns: ['Image', 'Title', 'Category', 'Status', 'Featured', 'Actions'],
      sampleData: [
        {
          id: 1,
          title: 'Science Lab Session',
          image: '/images/lab.jpg',
          category: 'academic',
          status: 'published',
          featured: true,
          description: 'Students in laboratory'
        }
      ]
    },
    videos: {
      title: 'Video Content Management',
      description: 'Manage school videos and media content',
      icon: FaVideo,
      columns: ['Thumbnail', 'Title', 'Type', 'Views', 'Status', 'Actions'],
      sampleData: [
        {
          id: 1,
          title: 'Campus Tour 2024',
          thumbnail: '/images/video1.jpg',
          type: 'campus',
          views: 1247,
          status: 'published',
          duration: '3:45'
        }
      ]
    },
    achievements: {
      title: 'Achievements Management',
      description: 'Manage student and school achievements',
      icon: FaTrophy,
      columns: ['Achievement', 'Student', 'Category', 'Date', 'Status', 'Actions'],
      sampleData: [
        {
          id: 1,
          title: 'Science Fair Winner',
          student: 'John Mugisha',
          category: 'academic',
          date: '2024-01-08',
          status: 'published',
          description: 'National science competition'
        }
      ]
    }
  };

  const currentType = contentTypes[type] || contentTypes.slides;

  useEffect(() => {
    loadContent();
  }, [type]);

  useEffect(() => {
    filterContent();
  }, [content, searchTerm, statusFilter]);

  const loadContent = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setContent(currentType.sampleData);
      setLoading(false);
    }, 1000);
  };

  const filterContent = () => {
    let filtered = [...content];

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredContent(filtered);
  };

  const handleStatusChange = (id, newStatus) => {
    setContent(prev => prev.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setContent(prev => prev.filter(item => item.id !== id));
      setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    }
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Delete ${selectedItems.length} items?`)) {
          setContent(prev => prev.filter(item => !selectedItems.includes(item.id)));
          setSelectedItems([]);
        }
        break;
      case 'publish':
        setContent(prev => prev.map(item =>
          selectedItems.includes(item.id) ? { ...item, status: 'published' } : item
        ));
        setSelectedItems([]);
        break;
      case 'draft':
        setContent(prev => prev.map(item =>
          selectedItems.includes(item.id) ? { ...item, status: 'draft' } : item
        ));
        setSelectedItems([]);
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'green', label: 'Active' },
      published: { color: 'green', label: 'Published' },
      draft: { color: 'gray', label: 'Draft' },
      archived: { color: 'orange', label: 'Archived' }
    };
    
    const config = statusConfig[status] || { color: 'gray', label: status };
    return (
      <span className={`status-badge ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="content-loading">
        <div className="loading-spinner"></div>
        <p>Loading {currentType.title}...</p>
      </div>
    );
  }

  return (
    <div className="content-management-tab">
      <div className="tab-header">
        <div className="header-content">
          <div className="header-icon">
            <currentType.icon />
          </div>
          <div>
            <h2>{currentType.title}</h2>
            <p>{currentType.description}</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FaPlus />
            Add New
          </button>
          <button className="btn btn-outline">
            <FaSync />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="content-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaLayerGroup />
          </div>
          <div className="stat-content">
            <h3>{content.length}</h3>
            <p>Total Items</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon published">
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <h3>{content.filter(item => item.status === 'published' || item.status === 'active').length}</h3>
            <p>Published</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon draft">
            <FaClock />
          </div>
          <div className="stat-content">
            <h3>{content.filter(item => item.status === 'draft').length}</h3>
            <p>Draft</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon featured">
            <FaAward />
          </div>
          <div className="stat-content">
            <h3>{content.filter(item => item.featured).length}</h3>
            <p>Featured</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="content-controls">
        <div className="search-filter">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder={`Search ${type}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <button className="btn btn-outline">
            <FaFilter />
            More Filters
          </button>
        </div>

        {selectedItems.length > 0 && (
          <div className="bulk-actions">
            <span className="selected-count">
              {selectedItems.length} selected
            </span>
            <select 
              onChange={(e) => handleBulkAction(e.target.value)}
              className="bulk-select"
            >
              <option value="">Bulk Actions</option>
              <option value="publish">Publish</option>
              <option value="draft">Move to Draft</option>
              <option value="delete">Delete</option>
            </select>
          </div>
        )}
      </div>

      {/* Content Table */}
      <div className="content-table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedItems.length === filteredContent.length && filteredContent.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedItems(filteredContent.map(item => item.id));
                    } else {
                      setSelectedItems([]);
                    }
                  }}
                />
              </th>
              {currentType.columns.map((column, index) => (
                <th key={index}>
                  <button className="column-header">
                    {column}
                    <FaSort />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredContent.length === 0 ? (
              <tr>
                <td colSpan={currentType.columns.length + 1} className="empty-state">
                  <div className="empty-icon">
                    <currentType.icon />
                  </div>
                  <h4>No content found</h4>
                  <p>Try adjusting your search or filters</p>
                  <button className="btn btn-primary">
                    <FaPlus />
                    Add New Content
                  </button>
                </td>
              </tr>
            ) : (
              filteredContent.map((item) => (
                <tr key={item.id} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(prev => [...prev, item.id]);
                        } else {
                          setSelectedItems(prev => prev.filter(id => id !== item.id));
                        }
                      }}
                    />
                  </td>
                  
                  {/* Dynamic columns based on content type */}
                  {type === 'slides' && (
                    <>
                      <td>
                        <div className="image-preview">
                          <img src={item.image} alt={item.title} />
                        </div>
                      </td>
                      <td>
                        <div className="item-title">
                          <strong>{item.title}</strong>
                          <span className="item-description">{item.description}</span>
                        </div>
                      </td>
                      <td>{getStatusBadge(item.status)}</td>
                      <td>{item.order}</td>
                      <td>{item.created}</td>
                    </>
                  )}

                  {type === 'testimonials' && (
                    <>
                      <td>
                        <div className="student-info">
                          <strong>{item.name}</strong>
                          <span>{item.program}</span>
                        </div>
                      </td>
                      <td>{item.program}</td>
                      <td>
                        <div className="rating">
                          {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                        </div>
                      </td>
                      <td>{getStatusBadge(item.status)}</td>
                      <td>{item.date}</td>
                    </>
                  )}

                  {type === 'school-life' && (
                    <>
                      <td>
                        <div className="image-preview small">
                          <img src={item.image} alt={item.title} />
                        </div>
                      </td>
                      <td>
                        <div className="item-title">
                          <strong>{item.title}</strong>
                          <span className="item-description">{item.description}</span>
                        </div>
                      </td>
                      <td>
                        <span className="category-tag">{item.category}</span>
                      </td>
                      <td>{getStatusBadge(item.status)}</td>
                      <td>
                        {item.featured ? (
                          <span className="featured-badge">Featured</span>
                        ) : (
                          <span className="text-muted">No</span>
                        )}
                      </td>
                    </>
                  )}

                  {type === 'videos' && (
                    <>
                      <td>
                        <div className="video-thumbnail">
                          <img src={item.thumbnail} alt={item.title} />
                          <div className="video-duration">{item.duration}</div>
                        </div>
                      </td>
                      <td>
                        <div className="item-title">
                          <strong>{item.title}</strong>
                          <span className="item-type">{item.type}</span>
                        </div>
                      </td>
                      <td>
                        <span className="content-type">{item.type}</span>
                      </td>
                      <td>{item.views.toLocaleString()} views</td>
                      <td>{getStatusBadge(item.status)}</td>
                    </>
                  )}

                  {type === 'achievements' && (
                    <>
                      <td>
                        <div className="achievement-title">
                          <strong>{item.title}</strong>
                          <span className="achievement-desc">{item.description}</span>
                        </div>
                      </td>
                      <td>{item.student}</td>
                      <td>
                        <span className="category-tag">{item.category}</span>
                      </td>
                      <td>{item.date}</td>
                      <td>{getStatusBadge(item.status)}</td>
                    </>
                  )}

                  {/* Actions Column */}
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon view"
                        title="Preview"
                      >
                        <FaEye />
                      </button>
                      <button 
                        className="btn-icon edit"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="btn-icon delete"
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredContent.length > 0 && (
        <div className="table-footer">
          <div className="pagination-info">
            Showing 1-{filteredContent.length} of {content.length} items
          </div>
          <div className="pagination-controls">
            <button className="btn btn-outline" disabled>Previous</button>
            <button className="btn btn-outline">Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManagementTab;