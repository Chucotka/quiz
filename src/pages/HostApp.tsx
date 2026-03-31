import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HostAppFlow from './host/HostAppFlow';

const HostApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<HostAppFlow />} />
    </Routes>
  );
};

export default HostApp;
