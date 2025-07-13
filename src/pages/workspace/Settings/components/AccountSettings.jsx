import React, { useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Save, RotateCcw, Lock } from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal';

const AccountSettings = ({ 
  account, 
  onAccountChange, 
  onPasswordChange,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  hasChanges 
}) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handlePasswordChange = async (passwordData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an API call to change the password
      console.log('Password change data:', passwordData);
      
      // For demo purposes, we'll just show a success message
      alert('Password changed successfully!');
      setIsPasswordModalOpen(false);
    } catch (error) {
      console.error('Password change failed:', error);
      alert('Failed to change password. Please try again.');
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="w-6 h-6" />
              <CardTitle className="text-xl md:text-2xl font-bold">Account Settings</CardTitle>
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
          <CardDescription className="mb-6">Manage your personal account information</CardDescription>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <Input 
                value={account.name} 
                onChange={e => onAccountChange({ ...account, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <Input 
                value={account.email} 
                onChange={e => onAccountChange({ ...account, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Company</label>
              <Input 
                value={account.company} 
                onChange={e => onAccountChange({ ...account, company: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <hr className="my-6" />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="font-semibold">Change Password</div>
              <div className="text-muted-foreground text-sm">Update your account password</div>
            </div>
            <Button 
              className="w-full md:w-auto"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Change Password
            </Button>
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

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordChange}
      />
    </>
  );
};

export default AccountSettings; 