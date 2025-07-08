import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Integration = ({ project }) => (
  <div className="max-w-4xl">
    <h1 className="text-3xl font-bold mb-6">Integration</h1>
    {project && (
      <p className="text-muted-foreground mb-4">Project: {project.name}</p>
    )}
    <Card>
      <CardContent className="p-6">
        <p className="text-muted-foreground">Integration content will be displayed here.</p>
      </CardContent>
    </Card>
  </div>
);

export default Integration; 