import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import Settings from 'pages/settings';
import Login from 'pages/login';
import AppShell from './components/app-shell';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<AppShell />} path="/">
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Settings />} path="/settings" />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
