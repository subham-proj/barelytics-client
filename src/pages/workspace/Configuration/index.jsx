import React, { useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Simple Switch component using input[type=checkbox] and Tailwind
const Switch = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => !disabled && onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 border border-input
      ${checked ? 'bg-black' : 'bg-gray-200'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200
        ${checked ? 'translate-x-5' : 'translate-x-1'}`}
    />
  </button>
);

const Configuration = () => {
  // Example state for toggles and inputs
  const [tracking, setTracking] = useState({
    pageViews: true,
    clickTracking: true,
    scrollDepth: false,
    userTiming: false,
  });
  const [privacy, setPrivacy] = useState({
    dnt: true,
    cookieConsent: false,
  });
  const [data, setData] = useState({
    retention: '90',
    sampling: '100',
  });

  const retentionOptions = [
    { label: '30 days', value: '30' },
    { label: '90 days', value: '90' },
    { label: '180 days', value: '180' },
    { label: '1 year', value: '365' },
  ];
  const samplingOptions = [
    { label: '25%', value: '25' },
    { label: '50%', value: '50' },
    { label: '75%', value: '75' },
    { label: '100%', value: '100' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Configuration</h1>
      <p className="text-muted-foreground text-base mb-8">Customize your tracking settings and preferences</p>
      {/* Tracking Options */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <CardTitle className="text-xl md:text-2xl font-bold mb-1">Tracking Options</CardTitle>
          <CardDescription className="mb-6">Configure what data to collect from your visitors</CardDescription>
          <div className="divide-y divide-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Page Views</div>
                <div className="text-muted-foreground text-sm">Track when users visit pages</div>
              </div>
              <Switch checked={tracking.pageViews} onChange={v => setTracking(t => ({ ...t, pageViews: v }))} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Click Tracking</div>
                <div className="text-muted-foreground text-sm">Monitor button and link clicks</div>
              </div>
              <Switch checked={tracking.clickTracking} onChange={v => setTracking(t => ({ ...t, clickTracking: v }))} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Scroll Depth</div>
                <div className="text-muted-foreground text-sm">Track how far users scroll on pages</div>
              </div>
              <Switch checked={tracking.scrollDepth} onChange={v => setTracking(t => ({ ...t, scrollDepth: v }))} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">User Timing</div>
                <div className="text-muted-foreground text-sm">Measure page load and performance metrics</div>
              </div>
              <Switch checked={tracking.userTiming} onChange={v => setTracking(t => ({ ...t, userTiming: v }))} />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Privacy Settings */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <CardTitle className="text-xl md:text-2xl font-bold mb-1">Privacy Settings</CardTitle>
          <CardDescription className="mb-6">Configure privacy and compliance options</CardDescription>
          <div className="divide-y divide-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Respect Do Not Track</div>
                <div className="text-muted-foreground text-sm">Honor browser DNT settings</div>
              </div>
              <Switch checked={privacy.dnt} onChange={v => setPrivacy(p => ({ ...p, dnt: v }))} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Cookie Consent</div>
                <div className="text-muted-foreground text-sm">Require consent before tracking</div>
              </div>
              <Switch checked={privacy.cookieConsent} onChange={v => setPrivacy(p => ({ ...p, cookieConsent: v }))} />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Data Management */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <CardTitle className="text-xl md:text-2xl font-bold mb-1">Data Management</CardTitle>
          <CardDescription className="mb-6">Control data retention and sampling</CardDescription>
          <div className="flex flex-col gap-6">
            <div>
              <label className="block font-semibold mb-1" htmlFor="retention">Data Retention (days)</label>
              <select
                id="retention"
                value={data.retention}
                onChange={e => setData(d => ({ ...d, retention: e.target.value }))}
                className="max-w-xs w-full border border-input rounded-md px-3 py-2 text-base shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/50 bg-background"
              >
                {retentionOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1" htmlFor="sampling">Sampling Rate (%)</label>
              <select
                id="sampling"
                value={data.sampling}
                onChange={e => setData(d => ({ ...d, sampling: e.target.value }))}
                className="max-w-xs w-full border border-input rounded-md px-3 py-2 text-base shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/50 bg-background"
              >
                {samplingOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end mt-6">
        <Button className="px-6 py-2 text-base font-semibold">Save Configuration</Button>
      </div>
    </div>
  );
};

export default Configuration; 