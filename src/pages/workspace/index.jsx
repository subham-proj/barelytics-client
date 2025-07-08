import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/pages/auth/authSlice';
import { Button } from '@/components/ui/button';
import {
  LogOut,
  User,
  Home,
  BarChart3,
  Puzzle,
  SlidersHorizontal,
  Settings as SettingsIcon
} from 'lucide-react';
import ProjectSelector from '@/pages/projects/ProjectSelector';
import Overview from './Overview';
import Integration from './Integration';
import Configuration from './Configuration';
import Settings from './Settings';
import Analytics from './Analytics';

const Dashboard = ({ project }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeMenu, setActiveMenu] = useState('overview');

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'integration', label: 'Integration', icon: Puzzle },
    { id: 'configuration', label: 'Configuration', icon: SlidersHorizontal },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return <Overview project={project} />;
      case 'analytics':
        return <Analytics project={project} />;
      case 'integration':
        return <Integration project={project} />;
      case 'configuration':
        return <Configuration project={project} />;
      case 'settings':
        return <Settings project={project} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary">Barelytics</h1>
          <div className="mt-3">
            <ProjectSelector />
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeMenu === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer with User Info */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              {user?.email ? (
                <span className="text-sm font-semibold text-primary">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.email || 'User'}
              </p>
              <p className="text-xs text-gray-500">Logged in</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 