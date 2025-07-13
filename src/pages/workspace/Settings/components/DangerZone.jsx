import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const DangerZone = () => {
  return (
    <Card className="mb-10 border-red-300">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Trash2 className="w-6 h-6 text-red-500" />
          <CardTitle className="text-xl md:text-2xl font-bold text-red-600">Danger Zone</CardTitle>
        </div>
        <CardDescription className="mb-6 text-red-500">Irreversible and destructive actions</CardDescription>
        
        <div className="divide-y divide-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-2">
            <div>
              <div className="font-semibold">Delete Project</div>
              <div className="text-muted-foreground text-sm">Permanently delete this project and all associated data</div>
            </div>
            <Button variant="destructive" className="w-full md:w-auto">Delete Project</Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-2">
            <div>
              <div className="font-semibold">Delete Account</div>
              <div className="text-muted-foreground text-sm">Permanently delete your account and all projects</div>
            </div>
            <Button variant="destructive" className="w-full md:w-auto">Delete Account</Button>
          </div>
        </div>
        
        <div className="flex justify-end mt-6 gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DangerZone; 