import React, { useState, useEffect } from 'react';
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
  Settings as SettingsIcon,
  Menu as MenuIcon,
  X as CloseIcon,
  ChevronLeft,
  ChevronRight,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setSidebarCollapsed(true);
      } else if (window.innerWidth > 900) {
        setSidebarCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Sidebar classes
  const sidebarBase =
    'fixed z-40 top-0 left-0 h-full bg-white shadow-lg flex flex-col transition-all duration-300 md:static md:z-auto md:h-auto md:shadow-lg';
  const sidebarWidth =
    'w-64 md:w-20 md:transition-all md:duration-300';
  const sidebarCollapsedClass =
    'md:w-20';
  const sidebarExpandedClass =
    'md:w-64';

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white shadow-md flex items-center px-4 z-30 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(true)}
          className="mr-2"
          aria-label="Open sidebar"
        >
          <MenuIcon className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-bold text-primary">Barelytics</h1>
      </div>

      {/* Sidebar (mobile & desktop) */}
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}
      <div
        className={
          `${sidebarBase} ${sidebarWidth} ${sidebarCollapsed ? sidebarCollapsedClass : sidebarExpandedClass} ` +
          (sidebarOpen
            ? ' translate-x-0 md:translate-x-0'
            : ' -translate-x-full md:translate-x-0')
        }
        style={{
          transitionProperty: 'width, left, right, transform',
        }}
        tabIndex={-1}
        aria-label="Sidebar"
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-end p-4 border-b md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <CloseIcon className="w-6 h-6" />
          </Button>
        </div>
        {/* Header (desktop & mobile) */}
        <div className="p-4 border-b">
          {/* Branding */}
          {sidebarCollapsed && window.innerWidth >= 768 ? (
            <div className="hidden md:flex items-center justify-center h-10">
              <span className="text-3xl font-extrabold text-primary">B</span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-10">
              <h1 className="text-2xl font-bold text-primary transition-all duration-300">Barelytics</h1>
            </div>
          )}
          {/* ProjectSelector: show on mobile always, and on desktop only if not collapsed */}
          {(!sidebarCollapsed || window.innerWidth < 768) && (
            <div className="flex justify-center mt-3">
              <ProjectSelector />
            </div>
          )}
        </div>
        {/* Navigation Menu */}
        <div className="flex-1 p-2 md:p-2 overflow-y-auto">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setSidebarOpen(false); // close on mobile
                  }}
                  className={`w-full ${sidebarCollapsed ? 'flex justify-center items-center h-12 px-0' : 'flex items-center justify-start space-x-3 px-3'} py-2 rounded-lg text-left transition-colors duration-200
                    ${activeMenu === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                  tabIndex={0}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {/* Show label on mobile always, and on desktop only if not collapsed */}
                  {!sidebarCollapsed && (
                    <span className="font-medium transition-all duration-300 md:ml-0">{item.label}</span>
                  )}
                  {/* On mobile, always show label */}
                  <span className={`font-medium transition-all duration-300 md:hidden ml-3`}>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        {/* Footer with User Info */}
        {/* Mobile: always show full user info */}
        <div className="p-4 border-t bg-gray-50 flex items-center md:hidden">
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {user?.email ? (
                <span className="text-sm font-semibold text-primary">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User className="w-5 h-5 text-primary" />
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0 transition-all duration-300 ml-3">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.email || 'User'}
            </p>
            <p className="text-xs text-gray-500">Logged in</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-700 ml-2"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
        {/* Desktop: show only avatar when collapsed, full info when expanded */}
        <div className={`p-4 border-t bg-gray-50 items-center hidden md:flex transition-all duration-300 ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {user?.email ? (
                <span className="text-sm font-semibold text-primary">
                  {user.email.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User className="w-5 h-5 text-primary" />
              )}
            </div>
          </div>
          {!sidebarCollapsed && (
            <>
              <div className={`flex-1 min-w-0 transition-all duration-300 ml-3`}>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email || 'User'}
                </p>
                <p className="text-xs text-gray-500">Logged in</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 ml-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Desktop Sidebar Toggle Button (top right, outside sidebar, relative) */}
      <div className="hidden md:block relative z-30" style={{ minWidth: '3rem' }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="mt-4 ml-2"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-6 h-6" />
          ) : (
            <ChevronLeft className="w-6 h-6" />
          )}
        </Button>
      </div>
      {/* Main Content */}
      <div className="flex-1 pt-14 md:pt-0 p-4 md:p-8 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 