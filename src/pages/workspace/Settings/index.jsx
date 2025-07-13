import React, { useState } from 'react';
import AccountSettings from './components/AccountSettings';
import ProjectSettings from './components/ProjectSettings';
import NotificationSettings from './components/NotificationSettings';
import ApiKeys from './components/ApiKeys';
import BillingSection from './components/BillingSection';
import DataPrivacySection from './components/DataPrivacySection';
import DangerZone from './components/DangerZone';
import { useSettingsState } from './hooks/useSettingsState';
import { API_KEYS, PLAN, RETENTION_OPTIONS, SAMPLING_OPTIONS, DEFAULT_DATA_RETENTION, DEFAULT_SAMPLING } from './constants';

const Settings = () => {
  const {
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
  } = useSettingsState();

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Settings</h1>
      <p className="text-muted-foreground text-base mb-8">Manage your account, projects, and preferences</p>

      {/* Account Settings */}
      <AccountSettings
        account={account}
        onAccountChange={setAccount}
        isEditing={isAccountEditing}
        onEdit={() => setIsAccountEditing(true)}
        onSave={handleSaveAccount}
        onCancel={handleCancelAccount}
        hasChanges={hasAccountChanges}
      />

      {/* Project Settings */}
      <ProjectSettings
        domains={domains}
        onDomainsChange={setDomains}
        isEditing={isProjectEditing}
        onEdit={() => setIsProjectEditing(true)}
        onSave={handleSaveProject}
        onCancel={handleCancelProject}
        hasChanges={hasProjectChanges}
      />

      {/* API Keys */}
      <ApiKeys apiKeys={API_KEYS} />

      {/* Notification Preferences */}
      <NotificationSettings
        notifications={notifications}
        onNotificationsChange={setNotifications}
        isEditing={isNotificationsEditing}
        onEdit={() => setIsNotificationsEditing(true)}
        onSave={handleSaveNotifications}
        onCancel={handleCancelNotifications}
        hasChanges={hasNotificationChanges}
      />

      {/* Billing & Subscription */}
      <BillingSection plan={PLAN} />

      {/* Data & Privacy */}
      <DataPrivacySection
        dataRetention={DEFAULT_DATA_RETENTION}
        sampling={DEFAULT_SAMPLING}
        retentionOptions={RETENTION_OPTIONS}
        samplingOptions={SAMPLING_OPTIONS}
      />

      {/* Danger Zone */}
      <DangerZone />
    </div>
  );
};

export default Settings; 