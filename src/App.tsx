import React from 'react';
import AppRoutes from './routes';
import './index.css';

const App: React.FC = () => {
  return (
    <div dir="rtl" className="font-cairo">
      <AppRoutes />
    </div>
  );
};

export default App;
