import React from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';

const DataPrivacySection = ({ dataRetention, sampling, retentionOptions, samplingOptions }) => {
  return (
    <Card className="mb-6 opacity-60">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-6 h-6 text-muted-foreground" />
          <CardTitle className="text-xl md:text-2xl font-bold text-muted-foreground">Data & Privacy</CardTitle>
          <div className="ml-auto">
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              <Lock className="w-3 h-3" />
              Coming Soon
            </span>
          </div>
        </div>
        <CardDescription className="mb-6 text-muted-foreground">Control your data and privacy settings</CardDescription>
        
        <div className="divide-y divide-border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-2">
            <div>
              <div className="font-semibold text-muted-foreground">Data Export</div>
              <div className="text-muted-foreground text-sm">Download all your analytics data</div>
            </div>
            <Button variant="outline" className="w-full md:w-auto" disabled>Export Data</Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-2">
            <div>
              <div className="font-semibold text-muted-foreground">Data Retention</div>
              <div className="text-muted-foreground text-sm">Currently set to {retentionOptions.find(o => o.value === dataRetention)?.label || '90 days'}</div>
            </div>
            <Button variant="outline" className="w-full md:w-auto" disabled>Configure</Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-2">
            <div>
              <div className="font-semibold text-muted-foreground">Data Sampling</div>
              <div className="text-muted-foreground text-sm">Currently set to {samplingOptions.find(o => o.value === sampling)?.label || '100%'}</div>
            </div>
            <Button variant="outline" className="w-full md:w-auto" disabled>Configure</Button>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Data export and privacy controls will be available in a future update.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataPrivacySection; 