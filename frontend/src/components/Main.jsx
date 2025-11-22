import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx'
import StatsPage from './StatsPage.jsx'

const Main = () => {
  return (
    <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/code/:code" element={<StatsPage />} />
        </Routes>
    </main>
  )
}

export default Main