import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Try importing just the HomePage to test
import HomePage from '../../pages/HomePage';

export default function MinimalAppRouter() {
  console.log('🔧 MinimalAppRouter rendering...');
  
  try {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={
            <div style={{ 
              padding: '40px 20px', 
              backgroundColor: '#f8d7da', 
              minHeight: '100vh',
              fontFamily: 'Arial, sans-serif',
              textAlign: 'center'
            }}>
              <h1 style={{ color: '#721c24', marginBottom: '20px' }}>
                404 - Page Not Found
              </h1>
              <p style={{ color: '#721c24', marginBottom: '20px' }}>
                The page "{window.location.pathname}" does not exist.
              </p>
              <a href="/" style={{ 
                padding: '12px 24px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Go Home
              </a>
            </div>
          } />
        </Routes>
      </Router>
    );
  } catch (error) {
    console.error('❌ Error in MinimalAppRouter:', error);
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#f8d7da', 
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ color: '#721c24', marginBottom: '20px' }}>
          ❌ Router Error
        </h1>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f5c6cb', 
          border: '1px solid #f1b0b7',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#721c24', margin: '0 0 10px 0' }}>Error Details:</h3>
          <p style={{ color: '#721c24', margin: '5px 0' }}>
            {error instanceof Error ? error.message : 'Unknown error occurred'}
          </p>
        </div>
      </div>
    );
  }
}
