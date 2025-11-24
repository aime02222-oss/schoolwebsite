import React, { useState, useEffect } from 'react';
import {
  FaPalette,
  FaSave,
  FaUndo,
  FaEye,
  FaDesktop,
  FaMobile,
  FaTablet,
  FaCheckCircle,
  FaFont,
  FaImage,
  FaPaintBrush,
  FaCog,
  FaSchool,
  FaUserFriends,
  FaGraduationCap
} from 'react-icons/fa';
import './Customization.css';

const Customization = () => {
  const [customization, setCustomization] = useState({
    // Theme Settings
    theme: 'light',
    primaryColor: '#3498db',
    secondaryColor: '#2c3e50',
    accentColor: '#e74c3c',
    
    // Layout Settings
    sidebarStyle: 'expanded',
    headerStyle: 'fixed',
    dashboardLayout: 'grid',
    
    // Typography
    fontFamily: 'Inter',
    fontSize: 'medium',
    fontWeight: 'normal',
    
    // Branding
    schoolName: 'Apaer Institute',
    schoolLogo: '',
    favicon: '',
    
    // Custom CSS
    customCSS: '',
    
    // Features
    enableAnimations: true,
    enableSounds: false,
    enableTooltips: true
  });

  const [previewMode, setPreviewMode] = useState('desktop');
  const [activeTab, setActiveTab] = useState('theme');
  const [isSaving, setIsSaving] = useState(false);

  const themeOptions = [
    { id: 'light', label: 'Light', description: 'Clean light theme' },
    { id: 'dark', label: 'Dark', description: 'Modern dark theme' },
    { id: 'auto', label: 'Auto', description: 'Follow system preference' }
  ];

  const fontOptions = [
    { id: 'Inter', label: 'Inter', category: 'Modern' },
    { id: 'Roboto', label: 'Roboto', category: 'Google Fonts' },
    { id: 'Open Sans', label: 'Open Sans', category: 'Google Fonts' },
    { id: 'Segoe UI', label: 'Segoe UI', category: 'System' },
    { id: 'Arial', label: 'Arial', category: 'System' }
  ];

  const colorPresets = [
    { primary: '#3498db', secondary: '#2c3e50', accent: '#e74c3c', name: 'Blue' },
    { primary: '#27ae60', secondary: '#2c3e50', accent: '#e67e22', name: 'Green' },
    { primary: '#9b59b6', secondary: '#34495e', accent: '#e74c3c', name: 'Purple' },
    { primary: '#e67e22', secondary: '#d35400', accent: '#e74c3c', name: 'Orange' },
    { primary: '#e74c3c', secondary: '#c0392b', accent: '#3498db', name: 'Red' }
  ];

  useEffect(() => {
    loadCustomization();
  }, []);

  const loadCustomization = () => {
    const saved = JSON.parse(localStorage.getItem('apaer_customization') || '{}');
    setCustomization(prev => ({ ...prev, ...saved }));
  };

  const saveCustomization = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    localStorage.setItem('apaer_customization', JSON.stringify(customization));
    setIsSaving(false);
    
    // Apply customization
    applyCustomization();
    
    alert('Customization saved successfully!');
  };

  const resetCustomization = () => {
    if (window.confirm('Are you sure you want to reset all customization? This action cannot be undone.')) {
      localStorage.removeItem('apaer_customization');
      setCustomization({
        theme: 'light',
        primaryColor: '#3498db',
        secondaryColor: '#2c3e50',
        accentColor: '#e74c3c',
        sidebarStyle: 'expanded',
        headerStyle: 'fixed',
        dashboardLayout: 'grid',
        fontFamily: 'Inter',
        fontSize: 'medium',
        fontWeight: 'normal',
        schoolName: 'Apaer Institute',
        schoolLogo: '',
        favicon: '',
        customCSS: '',
        enableAnimations: true,
        enableSounds: false,
        enableTooltips: true
      });
    }
  };

  const applyCustomization = () => {
    // Apply CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary-color', customization.primaryColor);
    root.style.setProperty('--secondary-color', customization.secondaryColor);
    root.style.setProperty('--accent-color', customization.accentColor);
    root.style.setProperty('--font-family', customization.fontFamily);
    
    // Apply theme
    if (customization.theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  const handleColorChange = (type, value) => {
    setCustomization(prev => ({ ...prev, [type]: value }));
  };

  const applyColorPreset = (preset) => {
    setCustomization(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
  };

  const handleImageUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomization(prev => ({ ...prev, [type]: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'theme', label: 'Theme', icon: FaPalette },
    { id: 'layout', label: 'Layout', icon: FaDesktop },
    { id: 'typography', label: 'Typography', icon: FaFont },
    { id: 'branding', label: 'Branding', icon: FaSchool },
    { id: 'advanced', label: 'Advanced', icon: FaCog }
  ];

  const renderThemeTab = () => (
    <div className="customization-section">
      <div className="section-header">
        <h3>Color Theme</h3>
        <p>Customize the color scheme of your application</p>
      </div>

      <div className="theme-options">
        <div className="option-group">
          <label>Theme Mode</label>
          <div className="theme-mode-selector">
            {themeOptions.map(theme => (
              <div
                key={theme.id}
                className={`theme-option ${customization.theme === theme.id ? 'active' : ''}`}
                onClick={() => handleColorChange('theme', theme.id)}
              >
                <div className={`theme-preview ${theme.id}`}>
                  <div className="preview-header"></div>
                  <div className="preview-sidebar"></div>
                  <div className="preview-content"></div>
                </div>
                <div className="theme-info">
                  <strong>{theme.label}</strong>
                  <span>{theme.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="option-group">
          <label>Color Presets</label>
          <div className="color-presets">
            {colorPresets.map((preset, index) => (
              <div
                key={index}
                className="color-preset"
                onClick={() => applyColorPreset(preset)}
                title={preset.name}
              >
                <div className="preset-colors">
                  <div className="color-swatch primary" style={{ backgroundColor: preset.primary }}></div>
                  <div className="color-swatch secondary" style={{ backgroundColor: preset.secondary }}></div>
                  <div className="color-swatch accent" style={{ backgroundColor: preset.accent }}></div>
                </div>
                <span>{preset.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="option-group">
          <label>Custom Colors</label>
          <div className="custom-colors">
            <div className="color-picker-group">
              <label>Primary Color</label>
              <div className="color-input">
                <input
                  type="color"
                  value={customization.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                />
                <span>{customization.primaryColor}</span>
              </div>
            </div>
            <div className="color-picker-group">
              <label>Secondary Color</label>
              <div className="color-input">
                <input
                  type="color"
                  value={customization.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                />
                <span>{customization.secondaryColor}</span>
              </div>
            </div>
            <div className="color-picker-group">
              <label>Accent Color</label>
              <div className="color-input">
                <input
                  type="color"
                  value={customization.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                />
                <span>{customization.accentColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayoutTab = () => (
    <div className="customization-section">
      <div className="section-header">
        <h3>Layout & Appearance</h3>
        <p>Configure the layout and visual appearance of the interface</p>
      </div>

      <div className="layout-options">
        <div className="option-group">
          <label>Sidebar Style</label>
          <select
            value={customization.sidebarStyle}
            onChange={(e) => handleColorChange('sidebarStyle', e.target.value)}
          >
            <option value="expanded">Expanded</option>
            <option value="compact">Compact</option>
            <option value="icons">Icons Only</option>
            <option value="floating">Floating</option>
          </select>
        </div>

        <div className="option-group">
          <label>Header Style</label>
          <select
            value={customization.headerStyle}
            onChange={(e) => handleColorChange('headerStyle', e.target.value)}
          >
            <option value="fixed">Fixed</option>
            <option value="static">Static</option>
            <option value="hidden">Hidden on Scroll</option>
          </select>
        </div>

        <div className="option-group">
          <label>Dashboard Layout</label>
          <select
            value={customization.dashboardLayout}
            onChange={(e) => handleColorChange('dashboardLayout', e.target.value)}
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
            <option value="cards">Cards</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>

        <div className="option-group">
          <label>Interface Features</label>
          <div className="feature-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={customization.enableAnimations}
                onChange={(e) => handleColorChange('enableAnimations', e.target.checked)}
              />
              <span className="checkmark"></span>
              Enable Animations
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={customization.enableSounds}
                onChange={(e) => handleColorChange('enableSounds', e.target.checked)}
              />
              <span className="checkmark"></span>
              Enable Sound Effects
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={customization.enableTooltips}
                onChange={(e) => handleColorChange('enableTooltips', e.target.checked)}
              />
              <span className="checkmark"></span>
              Show Tooltips
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTypographyTab = () => (
    <div className="customization-section">
      <div className="section-header">
        <h3>Typography</h3>
        <p>Customize fonts and text appearance</p>
      </div>

      <div className="typography-options">
        <div className="option-group">
          <label>Font Family</label>
          <select
            value={customization.fontFamily}
            onChange={(e) => handleColorChange('fontFamily', e.target.value)}
          >
            {fontOptions.map(font => (
              <option key={font.id} value={font.id}>
                {font.label} ({font.category})
              </option>
            ))}
          </select>
        </div>

        <div className="option-group">
          <label>Font Size</label>
          <select
            value={customization.fontSize}
            onChange={(e) => handleColorChange('fontSize', e.target.value)}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xlarge">Extra Large</option>
          </select>
        </div>

        <div className="option-group">
          <label>Font Weight</label>
          <select
            value={customization.fontWeight}
            onChange={(e) => handleColorChange('fontWeight', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="bold">Bold</option>
          </select>
        </div>

        <div className="typography-preview">
          <h4>Preview</h4>
          <div 
            className="preview-text"
            style={{
              fontFamily: customization.fontFamily,
              fontSize: customization.fontSize,
              fontWeight: customization.fontWeight
            }}
          >
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <p>This is a sample paragraph showing how your text will appear with the selected typography settings. You can see the font family, size, and weight in action.</p>
            <div className="preview-meta">
              <span>Font: {customization.fontFamily}</span>
              <span>Size: {customization.fontSize}</span>
              <span>Weight: {customization.fontWeight}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrandingTab = () => (
    <div className="customization-section">
      <div className="section-header">
        <h3>Branding</h3>
        <p>Customize school branding and logos</p>
      </div>

      <div className="branding-options">
        <div className="option-group">
          <label>School Name</label>
          <input
            type="text"
            value={customization.schoolName}
            onChange={(e) => handleColorChange('schoolName', e.target.value)}
            placeholder="Enter school name"
          />
        </div>

        <div className="option-group">
          <label>School Logo</label>
          <div className="image-upload">
            {customization.schoolLogo ? (
              <div className="image-preview">
                <img src={customization.schoolLogo} alt="School Logo" />
                <button
                  className="btn-change"
                  onClick={() => handleColorChange('schoolLogo', '')}
                >
                  Change Logo
                </button>
              </div>
            ) : (
              <label className="upload-area">
                <FaImage className="upload-icon" />
                <span>Click to upload school logo</span>
                <span className="upload-hint">Recommended: 200x60px PNG</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('schoolLogo', e)}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
        </div>

        <div className="option-group">
          <label>Favicon</label>
          <div className="image-upload">
            {customization.favicon ? (
              <div className="image-preview favicon">
                <img src={customization.favicon} alt="Favicon" />
                <button
                  className="btn-change"
                  onClick={() => handleColorChange('favicon', '')}
                >
                  Change Favicon
                </button>
              </div>
            ) : (
              <label className="upload-area">
                <FaImage className="upload-icon" />
                <span>Click to upload favicon</span>
                <span className="upload-hint">Recommended: 32x32px ICO/PNG</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('favicon', e)}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdvancedTab = () => (
    <div className="customization-section">
      <div className="section-header">
        <h3>Advanced Customization</h3>
        <p>Add custom CSS for advanced styling</p>
      </div>

      <div className="advanced-options">
        <div className="option-group">
          <label>Custom CSS</label>
          <textarea
            value={customization.customCSS}
            onChange={(e) => handleColorChange('customCSS', e.target.value)}
            placeholder="Enter your custom CSS here..."
            rows="10"
            className="custom-css-editor"
          />
          <div className="css-hint">
            <FaPaintBrush />
            <span>Add custom CSS rules to override default styles</span>
          </div>
        </div>

        <div className="option-group">
          <label>CSS Variables Reference</label>
          <div className="css-variables">
            <code>--primary-color: {customization.primaryColor};</code>
            <code>--secondary-color: {customization.secondaryColor};</code>
            <code>--accent-color: {customization.accentColor};</code>
            <code>--font-family: {customization.fontFamily};</code>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'theme':
        return renderThemeTab();
      case 'layout':
        return renderLayoutTab();
      case 'typography':
        return renderTypographyTab();
      case 'branding':
        return renderBrandingTab();
      case 'advanced':
        return renderAdvancedTab();
      default:
        return renderThemeTab();
    }
  };

  return (
    <div className="customization-container">
      <div className="management-header">
        <div className="header-content">
          <FaPalette className="header-icon" />
          <div>
            <h1>Customization</h1>
            <p>Customize system appearance and behavior</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={resetCustomization}>
            <FaUndo />
            Reset to Default
          </button>
          <button 
            className={`btn-primary ${isSaving ? 'loading' : ''}`}
            onClick={saveCustomization}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <div className="spinner"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FaSave />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="customization-layout">
        <div className="customization-sidebar">
          <nav className="customization-tabs">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <IconComponent className="tab-icon" />
                  <span className="tab-label">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="customization-content">
          {renderTabContent()}
        </div>
      </div>

      <div className="preview-section">
        <div className="preview-header">
          <h3>Live Preview</h3>
          <div className="preview-controls">
            <button
              className={`preview-btn ${previewMode === 'mobile' ? 'active' : ''}`}
              onClick={() => setPreviewMode('mobile')}
            >
              <FaMobile />
            </button>
            <button
              className={`preview-btn ${previewMode === 'tablet' ? 'active' : ''}`}
              onClick={() => setPreviewMode('tablet')}
            >
              <FaTablet />
            </button>
            <button
              className={`preview-btn ${previewMode === 'desktop' ? 'active' : ''}`}
              onClick={() => setPreviewMode('desktop')}
            >
              <FaDesktop />
            </button>
          </div>
        </div>

        <div className={`preview-container ${previewMode}`}>
          <div className="preview-window">
            <div className="preview-header-bar">
              <div className="preview-logo">
                {customization.schoolLogo ? (
                  <img src={customization.schoolLogo} alt="School Logo" />
                ) : (
                  <FaSchool />
                )}
                <span>{customization.schoolName}</span>
              </div>
              <div className="preview-user">
                <FaUserFriends />
              </div>
            </div>
            <div className="preview-sidebar">
              <div className="preview-nav-item active">
                <FaGraduationCap />
                <span>Dashboard</span>
              </div>
              <div className="preview-nav-item">
                <FaUserFriends />
                <span>Students</span>
              </div>
              <div className="preview-nav-item">
                <FaSchool />
                <span>Classes</span>
              </div>
            </div>
            <div className="preview-content">
              <div className="preview-card" style={{ borderLeftColor: customization.primaryColor }}>
                <h4>Welcome to {customization.schoolName}</h4>
                <p>This is a preview of your customized interface</p>
              </div>
              <div className="preview-stats">
                <div className="preview-stat" style={{ backgroundColor: customization.primaryColor }}>
                  <span>1,247</span>
                  <span>Students</span>
                </div>
                <div className="preview-stat" style={{ backgroundColor: customization.secondaryColor }}>
                  <span>89</span>
                  <span>Teachers</span>
                </div>
                <div className="preview-stat" style={{ backgroundColor: customization.accentColor }}>
                  <span>45</span>
                  <span>Courses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;