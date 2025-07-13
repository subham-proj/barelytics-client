import React, { useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe, Save, RotateCcw } from 'lucide-react';

const ProjectSettings = ({ 
  domains, 
  onDomainsChange,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  hasChanges 
}) => {
  const [newDomain, setNewDomain] = useState('');

  const handleUpdateDomain = () => {
    if (newDomain.trim()) {
      onDomainsChange([newDomain.trim()]);
      setNewDomain('');
    }
  };

  const handleRemoveDomain = () => {
    onDomainsChange([]);
  };

  const handleCancel = () => {
    onCancel();
    setNewDomain('');
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6" />
            <CardTitle className="text-xl md:text-2xl font-bold">Project Settings</CardTitle>
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
        <CardDescription className="mb-6">Configure your project and domain settings</CardDescription>
        
        <div className="mb-6">
          <label className="block font-semibold mb-1">Project Name</label>
          <Input value="My Website" readOnly />
        </div>
        
        <div>
          <label className="block font-semibold mb-1">Allowed Domain</label>
          <div className="space-y-2 mb-2">
            {domains.length > 0 ? (
              <div className="flex items-center gap-2">
                <Input 
                  value={domains[0]} 
                  readOnly 
                  className="flex-1" 
                  disabled={!isEditing}
                />
                {isEditing && (
                  <Button variant="outline" size="icon" onClick={handleRemoveDomain}>
                    ×
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  value={newDomain}
                  onChange={e => setNewDomain(e.target.value)}
                  placeholder="Enter your domain (e.g., example.com)"
                  className="flex-1"
                  disabled={!isEditing}
                />
                {isEditing && (
                  <Button variant="outline" size="icon" onClick={handleUpdateDomain}>+</Button>
                )}
              </div>
            )}
          </div>
          <div className="text-muted-foreground text-sm">Only this domain will be allowed to send analytics data</div>
        </div>
        
        {/* Save/Cancel buttons */}
        {isEditing && (
          <div className="flex gap-2 mt-6 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={handleCancel}
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

export default ProjectSettings; 