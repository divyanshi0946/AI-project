import React from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <Sidebar />
      <div className="flex flex-col">
        <TopBar />
        <main className="ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
