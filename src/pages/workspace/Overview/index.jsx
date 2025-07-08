import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Overview = ({ project }) => (
  <div className="max-w-4xl">
    <div className="mb-6">
      <h1 className="text-3xl font-bold">Overview</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-muted-foreground">View your analytics data</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Reports</h3>
          <p className="text-muted-foreground">Generate and view reports</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <p className="text-muted-foreground">Manage your account settings</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Overview; 