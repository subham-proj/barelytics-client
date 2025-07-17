import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConfig, updateConfig, resetConfigSuccess } from './configSlice';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

// Simple Switch component
const Switch = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 border border-border
      ${checked ? 'bg-primary' : 'bg-muted'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-background shadow transition-transform duration-200
        ${checked ? 'translate-x-5' : 'translate-x-1'}`}
    />
  </button>
);

// Tracking options configuration
const TRACKING_OPTIONS = [
  { key: 'pageViews', label: 'Page Views', description: 'Track when users visit pages', default: true },
  { key: 'sessions', label: 'Sessions', description: 'Track unique user sessions', default: true },
  { key: 'referrers', label: 'Referrers', description: 'Track where visitors came from', default: true },
  { key: 'locations', label: 'Locations', description: 'Track visitor locations (country, city, etc.)', default: true },
  { key: 'customEvents', label: 'Custom Events', description: 'Allow tracking of custom events via JS API', default: false },
  { key: 'clickTracking', label: 'Click Tracking', description: 'Monitor button and link clicks', default: false },
  { key: 'scrollDepth', label: 'Scroll Depth', description: 'Track how far users scroll on pages', default: false },
  { key: 'userTiming', label: 'User Timing', description: 'Measure page load and performance metrics', default: false },
];

// Data transformation helpers
const transformConfig = {
  // Backend snake_case to UI camelCase
  fromBackend: (backend) => ({
    pageViews: backend.page_views,
    sessions: backend.sessions,
    referrers: backend.referrers,
    locations: backend.locations,
    customEvents: backend.custom_events,
    clickTracking: backend.click_tracking,
    scrollDepth: backend.scroll_depth,
    userTiming: backend.user_timing,
  }),
  
  // UI camelCase to backend snake_case
  toBackend: (ui, original = {}) => ({
    ...original,
    page_views: ui.pageViews,
    sessions: ui.sessions,
    referrers: ui.referrers,
    locations: ui.locations,
    custom_events: ui.customEvents,
    click_tracking: ui.clickTracking,
    scroll_depth: ui.scrollDepth,
    user_timing: ui.userTiming,
  }),
};

const Configuration = ({ project }) => {
  const dispatch = useDispatch();
  const { config, loading, error, success } = useSelector(state => state.config);
  const [localConfig, setLocalConfig] = useState(null);
  const { toast } = useToast();

  // Load config when project changes
  useEffect(() => {
    if (project?.id) {
      dispatch(fetchConfig(project.id));
    }
  }, [dispatch, project?.id]);

  // Update local state when config loads
  useEffect(() => {
    if (config) {
      setLocalConfig(transformConfig.fromBackend(config));
    }
  }, [config]);

  // Auto-hide success message
  useEffect(() => {
    if (success) {
      toast({
        title: 'Saved',
        description: 'Project configuration has been updated.',
        action: <CheckCircle className="h-4 w-4 text-green-500" />,
      });
      const timer = setTimeout(() => dispatch(resetConfigSuccess()), 1500);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch, toast]);

  const handleToggle = (key) => {
    setLocalConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    if (!project?.id || !localConfig) return;
    dispatch(updateConfig({ 
      projectId: project.id, 
      config: transformConfig.toBackend(localConfig, config) 
    }));
  };

  // Loading and error states
  if (!project) return null;
  if (loading && !localConfig) return <div className="p-8 text-center text-lg">Loading configuration...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Configuration</h1>
      <p className="text-muted-foreground text-base mb-8">
        Customize your tracking settings and preferences. These options control what data is collected by your PageMetrics tracker script.
      </p>
      
      <Card className="mb-6">
        <CardContent className="p-5">
          <CardTitle className="text-xl md:text-2xl font-bold mb-1">Tracking Options</CardTitle>
          <CardDescription className="mb-6">
            Enable or disable the types of analytics you want to collect for this project.
          </CardDescription>
          
          <div className="divide-y divide-border">
            {TRACKING_OPTIONS.map(option => (
              <div key={option.key} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
                <div>
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-muted-foreground text-sm">{option.description}</div>
                </div>
                <Switch 
                  checked={!!localConfig?.[option.key]} 
                  onChange={() => handleToggle(option.key)} 
                  disabled={option.key === 'customEvents'}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-end mt-6">
        <Button 
          className="px-6 py-2 text-base font-semibold" 
          onClick={handleSave} 
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>
    </div>
  );
};

export default Configuration; 