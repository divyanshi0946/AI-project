/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AIAssistant } from './components/AIAssistant';
import { MusicPlayer } from './components/MusicPlayer';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Study from './pages/Study';
import Rooms from './pages/Rooms';
import Tasks from './pages/Tasks';
import Rewards from './pages/Rewards';
import Leaderboard from './pages/Leaderboard';
import AIChat from './pages/AIChat';
import Profile from './pages/Profile';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/signup" element={<Auth type="signup" />} />
          <Route path="/onboarding" element={<Auth type="onboarding" />} />

          {/* Private Routes (Wrapped in ProtectedRoute and Layout) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                  <AIAssistant />
                  <MusicPlayer />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/study"
            element={
              <ProtectedRoute>
                <Layout>
                  <Study />
                  <AIAssistant />
                  <MusicPlayer />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <Layout>
                  <Rooms />
                  <AIAssistant />
                  <MusicPlayer />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Layout>
                  <Tasks />
                  <AIAssistant />
                  <MusicPlayer />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/rewards"
            element={
              <ProtectedRoute>
                <Layout>
                  <Rewards />
                  <AIAssistant />
                  <MusicPlayer />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Leaderboard />
                  <AIAssistant />
                  <MusicPlayer />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-assistant"
            element={
              <ProtectedRoute>
                <Layout>
                  <AIChat />
                  <AIAssistant />
                  <MusicPlayer />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                  <AIAssistant />
                  <MusicPlayer />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
