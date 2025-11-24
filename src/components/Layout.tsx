// src/components/Layout.js
import React from 'react';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('apaer_current_user') || 'null');
  
  return (
    <div className="layout">
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;