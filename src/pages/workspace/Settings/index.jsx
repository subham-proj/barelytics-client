import React, { useState } from 'react';
import AccountSettings from './components/AccountSettings';
import ProjectSettings from './components/ProjectSettings';
import NotificationSettings from './components/NotificationSettings';
import ApiKeys from './components/ApiKeys';
import BillingSection from './components/BillingSection';
import DataPrivacySection from './components/DataPrivacySection';
import DangerZone from './components/DangerZone';
import { API_KEYS, PLAN, RETENTION_OPTIONS, SAMPLING_OPTIONS, DEFAULT_DATA_RETENTION, DEFAULT_SAMPLING } from './constants';

// Default values for local state
const DEFAULT_DOMAINS = [];
const DEFAULT_NOTIFICATIONS = {
  emailReports: true,
  weeklyDigest: true,
  alerts: true,
  marketing: false,
};

export default function SettingsPage(props) {
  // Local state for project and notification settings
  const [domains, setDomains] = useState(DEFAULT_DOMAINS);
  const [notifications, setNotifications] = useState(DEFAULT_NOTIFICATIONS);
  const [isProjectEditing, setIsProjectEditing] = useState(false);
  const [isNotificationsEditing, setIsNotificationsEditing] = useState(false);
  const [originalDomains, setOriginalDomains] = useState(DEFAULT_DOMAINS);
  const [originalNotifications, setOriginalNotifications] = useState(DEFAULT_NOTIFICATIONS);

  // Change detection
  const hasProjectChanges = JSON.stringify(domains) !== JSON.stringify(originalDomains);
  const hasNotificationChanges = JSON.stringify(notifications) !== JSON.stringify(originalNotifications);

  // Handlers
  const handleSaveProject = () => {
    setOriginalDomains([...domains]);
    setIsProjectEditing(false);
  };
  const handleCancelProject = () => {
    setDomains([...originalDomains]);
    setIsProjectEditing(false);
  };
  const handleSaveNotifications = () => {
    setOriginalNotifications({ ...notifications });
    setIsNotificationsEditing(false);
  };
  const handleCancelNotifications = () => {
    setNotifications({ ...originalNotifications });
    setIsNotificationsEditing(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-10">
      <AccountSettings />
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Settings</h1>
      <p className="text-muted-foreground text-base mb-8">Manage your account, projects, and preferences</p>
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
} 