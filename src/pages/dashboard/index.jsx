import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/pages/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LogOut, User, BarChart3, FileText, Settings, Home, Users, Bell } from 'lucide-react';
import ProjectSelector from '@/pages/projects/ProjectSelector';

const Dashboard = ({ project }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="max-w-4xl">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Welcome back!</h1>
              {project && (
                <p className="text-muted-foreground mt-2">
                  You're viewing: <span className="font-semibold">{project.name}</span>
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                  <p className="text-muted-foreground">View your analytics data</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Reports</h3>
                  <p className="text-muted-foreground">Generate and view reports</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Settings</h3>
                  <p className="text-muted-foreground">Manage your account settings</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Analytics</h1>
            {project && (
              <p className="text-muted-foreground mb-4">Project: {project.name}</p>
            )}
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Analytics content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'reports':
        return (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Reports</h1>
            {project && (
              <p className="text-muted-foreground mb-4">Project: {project.name}</p>
            )}
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Reports content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'users':
        return (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Users</h1>
            {project && (
              <p className="text-muted-foreground mb-4">Project: {project.name}</p>
            )}
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Users management content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Notifications</h1>
            {project && (
              <p className="text-muted-foreground mb-4">Project: {project.name}</p>
            )}
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Notifications content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            {project && (
              <p className="text-muted-foreground mb-4">Project: {project.name}</p>
            )}
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Settings content will be displayed here.</p>
              </CardContent>
            </Card>
          </div>
        );
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