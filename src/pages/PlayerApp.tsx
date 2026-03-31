import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PlayerAppFlow from './player/PlayerAppFlow';

const PlayerApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<PlayerAppFlow />} />
    </Routes>
  );
};

export default PlayerApp;
