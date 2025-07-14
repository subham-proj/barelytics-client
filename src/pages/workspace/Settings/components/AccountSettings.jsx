import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Save, RotateCcw, Lock, CheckCircle, AlertTriangle } from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal';
import { useToast } from '@/hooks/use-toast';
import useSettingsState from '../hooks/useSettingsState';
import {ListCardShimmer} from '@/components/ui/shimmer';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../settingsSlice';

const AccountSettings = () => {
  const {
    fields,
    setFields,
    editMode,
    handleEdit,
    handleCancel,
    handleChange,
    handleSave,
    hasChanges,
    loading,
    error,
    success,
    email,
    fetched,
  } = useSettingsState();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const settings = useSelector((state) => state.settings);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
        icon: <AlertTriangle className="text-red-500 w-5 h-5 mr-2" />,
      });
    }
    if (success) {
      toast({
        title: 'Success',
        description: success,
        icon: <CheckCircle className="text-green-600 w-5 h-5 mr-2" />,
      });
    }
  }, [error, success, toast]);

  // Password change handler
  const handlePasswordChange = async (passwordData) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'User not found in session.',
        variant: 'destructive',
      });
      return;
    }
    const payload = {
      user_id: user.id || user.user_id || user.uuid,
      email: user.email,
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword,
    };
    const result = await dispatch(changePassword(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      toast({
        title: 'Success',
        description: 'Password changed successfully!',
        icon: <CheckCircle className="text-green-600 w-5 h-5 mr-2" />,
      });
      setIsPasswordModalOpen(false);
    } else {
      toast({
        title: 'Error',
        description: result.payload || 'Password change failed',
        variant: 'destructive',
        icon: <AlertTriangle className="text-red-500 w-5 h-5 mr-2" />,
      });
    }
  };

  if (loading && !fetched) {
    return <div className="p-6"><ListCardShimmer className="h-40 w-full rounded-xl" /></div>;
  }

  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <User className="w-6 h-6" />
              <CardTitle className="text-xl md:text-2xl font-bold">Account Settings</CardTitle>
            </div>
            {!editMode && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEdit}
                disabled={loading}
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
                name="full_name"
                value={fields.full_name}
                onChange={handleChange}
                disabled={!editMode || loading}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <Input 
                name="email"
                value={email || ''}
                disabled
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Company</label>
              <Input 
                name="company"
                value={fields.company}
                onChange={handleChange}
                disabled={!editMode || loading}
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
          {editMode && (
            <div className="flex gap-2 mt-6 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="flex items-center gap-2"
                disabled={loading}
              >
                <RotateCcw className="w-4 h-4" />
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!hasChanges || loading}
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