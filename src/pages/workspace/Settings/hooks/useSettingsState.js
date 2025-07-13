import { useState } from 'react';

export const useSettingsState = () => {
  // Original state values
  const [originalAccount, setOriginalAccount] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Inc',
  });
  const [originalDomains, setOriginalDomains] = useState(['example.com']);
  const [originalNotifications, setOriginalNotifications] = useState({
    emailReports: true,
    weeklyDigest: true,
    alerts: true,
    marketing: false,
  });

  // Current state values (can be modified)
  const [account, setAccount] = useState({ ...originalAccount });
  const [domains, setDomains] = useState([...originalDomains]);
  const [notifications, setNotifications] = useState({ ...originalNotifications });

  // Edit states for each section
  const [isAccountEditing, setIsAccountEditing] = useState(false);
  const [isProjectEditing, setIsProjectEditing] = useState(false);
  const [isNotificationsEditing, setIsNotificationsEditing] = useState(false);

  // Check if any section has unsaved changes
  const hasAccountChanges = JSON.stringify(account) !== JSON.stringify(originalAccount);
  const hasProjectChanges = JSON.stringify(domains) !== JSON.stringify(originalDomains);
  const hasNotificationChanges = JSON.stringify(notifications) !== JSON.stringify(originalNotifications);

  // Save handlers for each section
  const handleSaveAccount = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update original values
      setOriginalAccount({ ...account });
      setIsAccountEditing(false);
      
      // Show success message
      alert('Account settings saved successfully!');
    } catch (error) {
      console.error('Failed to save account settings:', error);
      alert('Failed to save account settings. Please try again.');
    }
  };

  const handleSaveProject = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update original values
      setOriginalDomains([...domains]);
      setIsProjectEditing(false);
      
      // Show success message
      alert('Project settings saved successfully!');
    } catch (error) {
      console.error('Failed to save project settings:', error);
      alert('Failed to save project settings. Please try again.');
    }
  };

  const handleSaveNotifications = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update original values
      setOriginalNotifications({ ...notifications });
      setIsNotificationsEditing(false);
      
      // Show success message
      alert('Notification preferences saved successfully!');
    } catch (error) {
      console.error('Failed to save notification preferences:', error);
      alert('Failed to save notification preferences. Please try again.');
    }
  };

  // Cancel handlers for each section
  const handleCancelAccount = () => {
    setAccount({ ...originalAccount });
    setIsAccountEditing(false);
  };

  const handleCancelProject = () => {
    setDomains([...originalDomains]);
    setIsProjectEditing(false);
  };

  const handleCancelNotifications = () => {
    setNotifications({ ...originalNotifications });
    setIsNotificationsEditing(false);
  };

  return {
    // State
    account,
    domains,
    notifications,
    isAccountEditing,
    isProjectEditing,
    isNotificationsEditing,
    hasAccountChanges,
    hasProjectChanges,
    hasNotificationChanges,
    
    // Setters
    setAccount,
    setDomains,
    setNotifications,
    setIsAccountEditing,
    setIsProjectEditing,
    setIsNotificationsEditing,
    
    // Handlers
    handleSaveAccount,
    handleSaveProject,
    handleSaveNotifications,
    handleCancelAccount,
    handleCancelProject,
    handleCancelNotifications,
  };
}; 