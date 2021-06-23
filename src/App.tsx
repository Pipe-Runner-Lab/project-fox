import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import Settings from 'pages/settings';
import Canvas from 'pages/canvas';
import Auth from 'pages/auth';
import AuthProvider from 'provider/auth';
import AppShell from './components/app-shell';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route element={<Auth />} path="/login" />
        <Route element={<AppShell />} path="/">
          <Route element={<Canvas />} path="/canvas" />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Settings />} path="/settings" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
