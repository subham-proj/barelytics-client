import React, { useState } from 'react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Globe, User, Key, Bell, CreditCard, Shield, Trash2 } from 'lucide-react';

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

const Settings = () => {
  // Example state
  const [account, setAccount] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Acme Inc',
    timezone: 'Pacific Time (UTC-8)',
  });
  const [domains, setDomains] = useState(['example.com', 'www.example.com']);
  const [newDomain, setNewDomain] = useState('');
  const [apiKeys] = useState({
    public: 'pk_live_abc123...',
    secret: 'sk_live_xyz789...',
  });
  const [notifications, setNotifications] = useState({
    emailReports: true,
    weeklyDigest: true,
    alerts: true,
    marketing: false,
  });
  const [plan] = useState({
    name: 'Pro Plan',
    price: '$29/month',
    nextBilling: 'January 15, 2024',
    active: true,
  });
  const [dataRetention, setDataRetention] = useState('90');
  const [sampling, setSampling] = useState('100');
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

  // Handlers for domain add/remove
  const handleAddDomain = () => {
    if (newDomain.trim() && !domains.includes(newDomain.trim())) {
      setDomains([...domains, newDomain.trim()]);
      setNewDomain('');
    }
  };
  const handleRemoveDomain = (domain) => {
    setDomains(domains.filter(d => d !== domain));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Settings</h1>
      <p className="text-muted-foreground text-base mb-8">Manage your account, projects, and preferences</p>

      {/* Account Settings */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <User className="w-6 h-6" />
            <CardTitle className="text-xl md:text-2xl font-bold">Account Settings</CardTitle>
          </div>
          <CardDescription className="mb-6">Manage your personal account information</CardDescription>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <Input value={account.name} onChange={e => setAccount(a => ({ ...a, name: e.target.value }))} />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <Input value={account.email} onChange={e => setAccount(a => ({ ...a, email: e.target.value }))} />
            </div>
            <div>
              <label className="block font-semibold mb-1">Company</label>
              <Input value={account.company} onChange={e => setAccount(a => ({ ...a, company: e.target.value }))} />
            </div>
            <div>
              <label className="block font-semibold mb-1">Timezone</label>
              <select
                value={account.timezone}
                onChange={e => setAccount(a => ({ ...a, timezone: e.target.value }))}
                className="w-full border border-input rounded-md px-3 py-2 text-base shadow-sm focus:outline-none focus:ring-1 focus:ring-primary/50 bg-background"
              >
                <option>Pacific Time (UTC-8)</option>
                <option>Eastern Time (UTC-5)</option>
                <option>Central European Time (UTC+1)</option>
                <option>India Standard Time (UTC+5:30)</option>
              </select>
            </div>
          </div>
          <hr className="my-6" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="font-semibold">Change Password</div>
              <div className="text-muted-foreground text-sm">Update your account password</div>
            </div>
            <Button className="w-full md:w-auto">Change Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Project Settings */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-6 h-6" />
            <CardTitle className="text-xl md:text-2xl font-bold">Project Settings</CardTitle>
          </div>
          <CardDescription className="mb-6">Configure your project and domain settings</CardDescription>
          <div className="mb-6">
            <label className="block font-semibold mb-1">Project Name</label>
            <Input value="My Website" readOnly />
          </div>
          <div>
            <label className="block font-semibold mb-1">Allowed Domains</label>
            <div className="space-y-2 mb-2">
              {domains.map(domain => (
                <div key={domain} className="flex items-center gap-2">
                  <Input value={domain} readOnly className="flex-1" />
                  <Button variant="outline" size="icon" onClick={() => handleRemoveDomain(domain)}>
                    ×
                  </Button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Input
                  value={newDomain}
                  onChange={e => setNewDomain(e.target.value)}
                  placeholder="Add new domain"
                  className="flex-1"
                />
                <Button variant="outline" size="icon" onClick={handleAddDomain}>+</Button>
              </div>
            </div>
            <div className="text-muted-foreground text-sm">Only these domains will be allowed to send analytics data</div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
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

      {/* Notification Preferences */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-6 h-6" />
            <CardTitle className="text-xl md:text-2xl font-bold">Notification Preferences</CardTitle>
          </div>
          <CardDescription className="mb-6">Choose how you want to receive updates and alerts</CardDescription>
          <div className="divide-y divide-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Email Reports</div>
                <div className="text-muted-foreground text-sm">Receive monthly analytics reports</div>
              </div>
              <Switch checked={notifications.emailReports} onChange={v => setNotifications(n => ({ ...n, emailReports: v }))} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Weekly Digest</div>
                <div className="text-muted-foreground text-sm">Weekly summary of your analytics</div>
              </div>
              <Switch checked={notifications.weeklyDigest} onChange={v => setNotifications(n => ({ ...n, weeklyDigest: v }))} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Alerts</div>
                <div className="text-muted-foreground text-sm">Get notified of unusual traffic patterns</div>
              </div>
              <Switch checked={notifications.alerts} onChange={v => setNotifications(n => ({ ...n, alerts: v }))} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Marketing Emails</div>
                <div className="text-muted-foreground text-sm">Product updates and tips</div>
              </div>
              <Switch checked={notifications.marketing} onChange={v => setNotifications(n => ({ ...n, marketing: v }))} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing & Subscription */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="w-6 h-6" />
            <CardTitle className="text-xl md:text-2xl font-bold">Billing & Subscription</CardTitle>
          </div>
          <CardDescription className="mb-6">Manage your subscription and billing information</CardDescription>
          <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="font-semibold">Current Plan</div>
              <div className="text-muted-foreground text-sm">{plan.name} - {plan.price}</div>
              <div className="text-muted-foreground text-xs">Next billing: {plan.nextBilling}</div>
            </div>
            <Button variant="outline" className="w-full md:w-auto mt-2 md:mt-0">Active</Button>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <Button variant="outline" className="w-full md:w-auto">Change Plan</Button>
            <Button variant="outline" className="w-full md:w-auto">View Invoices</Button>
            <Button variant="outline" className="w-full md:w-auto">Update Payment Method</Button>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-6 h-6" />
            <CardTitle className="text-xl md:text-2xl font-bold">Data & Privacy</CardTitle>
          </div>
          <CardDescription className="mb-6">Control your data and privacy settings</CardDescription>
          <div className="divide-y divide-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Data Export</div>
                <div className="text-muted-foreground text-sm">Download all your analytics data</div>
              </div>
              <Button variant="outline" className="w-full md:w-auto">Export Data</Button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 gap-2">
              <div>
                <div className="font-semibold">Data Retention</div>
                <div className="text-muted-foreground text-sm">Currently set to {retentionOptions.find(o => o.value === dataRetention)?.label || '90 days'}</div>
              </div>
              <Button variant="outline" className="w-full md:w-auto">Configure</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
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
    </div>
  );
};

export default Settings; 