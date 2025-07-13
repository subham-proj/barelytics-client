import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key } from 'lucide-react';

const ApiKeys = ({ apiKeys }) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Key className="w-6 h-6" />
          <CardTitle className="text-xl md:text-2xl font-bold">API Keys</CardTitle>
        </div>
        <CardDescription className="mb-6">Manage API keys for integrations and custom implementations</CardDescription>
        
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="font-semibold">Public API Key</div>
              <div className="text-muted-foreground text-sm">Used for client-side tracking</div>
              <div className="mt-1 font-mono bg-gray-100 rounded px-2 py-1 inline-block">{apiKeys.public}</div>
            </div>
            <Button variant="outline" className="w-full md:w-auto mt-2 md:mt-0">Copy</Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="font-semibold">Secret API Key</div>
              <div className="text-muted-foreground text-sm">Used for server-side operations</div>
              <div className="mt-1 font-mono bg-gray-100 rounded px-2 py-1 inline-block">{apiKeys.secret}</div>
            </div>
            <Button variant="outline" className="w-full md:w-auto mt-2 md:mt-0">Copy</Button>
          </div>
        </div>
        <Button variant="secondary" className="w-full md:w-auto">+ Generate New Key</Button>
      </CardContent>
    </Card>
  );
};

export default ApiKeys; 