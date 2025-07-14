import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Save, RotateCcw } from 'lucide-react';

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

const NotificationSettings = ({ 
  notifications, 
  onNotificationsChange,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  hasChanges 
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6" />
            <CardTitle className="text-xl md:text-2xl font-bold">Notification Preferences</CardTitle>
          </div>
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
        </div>
        <CardDescription className="mb-6">Choose how you want to receive updates and alerts</CardDescription>
        
        <div className="divide-y divide-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
            <div>
              <div className="font-semibold">Email Reports</div>
              <div className="text-muted-foreground text-sm">Receive monthly analytics reports</div>
            </div>
            <Switch 
              checked={notifications.emailReports} 
              onChange={v => onNotificationsChange({ ...notifications, emailReports: v })}
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
            <div>
              <div className="font-semibold">Weekly Digest</div>
              <div className="text-muted-foreground text-sm">Weekly summary of your analytics</div>
            </div>
            <Switch 
              checked={notifications.weeklyDigest} 
              onChange={v => onNotificationsChange({ ...notifications, weeklyDigest: v })}
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
            <div>
              <div className="font-semibold">Alerts</div>
              <div className="text-muted-foreground text-sm">Get notified of unusual traffic patterns</div>
            </div>
            <Switch 
              checked={notifications.alerts} 
              onChange={v => onNotificationsChange({ ...notifications, alerts: v })}
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
            <div>
              <div className="font-semibold">Marketing Emails</div>
              <div className="text-muted-foreground text-sm">Product updates and tips</div>
            </div>
            <Switch 
              checked={notifications.marketing} 
              onChange={v => onNotificationsChange({ ...notifications, marketing: v })}
              disabled={!isEditing}
            />
          </div>
        </div>
        
        {/* Save/Cancel buttons */}
        {isEditing && (
          <div className="flex gap-2 mt-6 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Cancel
            </Button>
            <Button 
              onClick={onSave}
              disabled={!hasChanges}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationSettings; 