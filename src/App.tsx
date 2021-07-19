import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from 'components/protected-route';
import Dashboard from 'pages/dashboard';
import Settings from 'pages/settings';
import DrawingBoard from 'pages/drawing-board';
import New from 'pages/new';
import Login from 'pages/login';
import AuthProvider from 'provider/auth';
import AppShell from './components/app-shell';

function App(): JSX.Element {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <ProtectedRoute element={<AppShell />} path="/">
            <ProtectedRoute element={<New />} path="/new" />
            {/* TODO Should redirect if drawing-board/ */}
            <ProtectedRoute element={<DrawingBoard />} path="/drawing-board/:id" />
            <ProtectedRoute element={<Dashboard />} path="/dashboard" />
            <ProtectedRoute element={<Settings />} path="/settings" />
            <ProtectedRoute element={<Navigate to="/dashboard" />} path="/" />
          </ProtectedRoute>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
