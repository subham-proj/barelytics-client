import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, Lock } from 'lucide-react';

const ApiKeys = ({ apiKeys }) => {
  return (
    <Card className="mb-6 opacity-60">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Key className="w-6 h-6 text-muted-foreground" />
          <CardTitle className="text-xl md:text-2xl font-bold text-muted-foreground">API Keys</CardTitle>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              <Lock className="w-3 h-3" />
              Coming Soon
            </span>
          </div>
        </div>
        <CardDescription className="mb-6 text-muted-foreground">Manage API keys for integrations and custom implementations</CardDescription>
        
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="font-semibold text-muted-foreground">Public API Key</div>
              <div className="text-muted-foreground text-sm">Used for client-side tracking</div>
              <div className="mt-1 font-mono bg-gray-100 rounded px-2 py-1 inline-block">{apiKeys.public}</div>
            </div>
            <Button variant="outline" className="w-full md:w-auto mt-2 md:mt-0" disabled>Copy</Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="font-semibold text-muted-foreground">Secret API Key</div>
              <div className="text-muted-foreground text-sm">Used for server-side operations</div>
              <div className="mt-1 font-mono bg-gray-100 rounded px-2 py-1 inline-block">{apiKeys.secret}</div>
            </div>
            <Button variant="outline" className="w-full md:w-auto mt-2 md:mt-0" disabled>Copy</Button>
          </div>
        </div>
        <Button variant="secondary" className="w-full md:w-auto" disabled>+ Generate New Key</Button>
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> API key management will be available in a future update.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeys; 