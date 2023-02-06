import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../screens/main/DashboardPage';

const useRoute = () => {
  return (
    <Routes>
      <Route element={<DashboardPage />} path='/' />
    </Routes>
  )
}

export default useRoute