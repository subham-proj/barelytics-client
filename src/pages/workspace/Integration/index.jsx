import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Link as LinkIcon, Info, Code, Clock, ExternalLink } from 'lucide-react';

const Integration = ({ project }) => {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  // Example script with project id
  const script = `<script async src="https://analytics.barelytics.app/tracker.js" data-project-id="${project.id}"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Dummy handler for test installation
  const handleTestInstallation = () => {
    window.open(project.website || 'https://yourwebsite.com', '_blank');
  };

  return (
    <div className="w-full px-0 md:px-8 py-2">
      <Card className="shadow-xl border-0 w-full max-w-6xl mx-auto">
        <CardHeader className="flex flex-row items-center gap-4 pb-2 border-b">
          <div className="bg-primary/10 rounded-full p-3 flex items-center justify-center">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Integration</CardTitle>
            <CardDescription>Connect Barelytics to your website</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: Project Info & Instructions */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-2">Project Information</h2>
                <div className="grid grid-cols-1 gap-y-2 text-base">
                  <div><span className="font-medium text-muted-foreground">Name:</span> <span className="font-semibold">{project.name}</span></div>
                  <div><span className="font-medium text-muted-foreground">Project ID:</span> <span className="font-mono">{project.id}</span></div>
                  {project.website && <div className="flex items-center gap-2"><LinkIcon className="w-4 h-4 text-muted-foreground" /><span className="font-medium text-muted-foreground">Website:</span> <span className="underline text-primary break-all">{project.website}</span></div>}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">How to Integrate</h2>
                <ul className="list-disc pl-5 text-muted-foreground text-base space-y-1">
                  <li>Copy the tracking script and paste it before the closing <code>&lt;/body&gt;</code> tag on every page you want to track.</li>
                  <li>Deploy your website. Data will start appearing in your dashboard within minutes.</li>
                  <li>You can add this script to any number of websites using the same project ID.</li>
                </ul>
              </div>
              {/* Verification Section */}
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-1">Verification</h2>
                <div className="text-muted-foreground mb-4">Check if tracking is working correctly</div>
                <div className="flex items-center gap-4 mb-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-700 font-medium text-sm">
                    <Clock className="w-4 h-4 mr-1.5 text-orange-500" />
                    Pending Verification
                  </span>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border"
                    onClick={handleTestInstallation}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Test Installation
                  </Button>
                </div>
                <div className="text-muted-foreground text-base text-sm">
                  Visit your website after installing the script to verify tracking is working.
                </div>
              </div>
            </div>
            {/* Right: Tracking Script */}
            <div className="relative bg-gray-100 border border-gray-200 rounded-2xl p-0 text-base font-mono break-all select-all shadow-inner min-h-[180px] flex flex-col justify-center overflow-hidden">
              <div className="mb-4 text-lg font-semibold text-gray-700 flex items-center gap-2 px-8 pt-8">
                <Code className="w-5 h-5 text-primary" /> Script
              </div>
              <Button
                type="button"
                size="sm"
                variant={copied ? 'default' : 'outline'}
                onClick={handleCopy}
                className={`absolute top-4 right-4 transition-all z-10 ${copied ? 'bg-green-500 text-white border-green-500' : ''}`}
                style={{marginTop: 0, marginRight: 0}}
                title="Copy script"
              >
                <Copy className="w-4 h-4 mr-1" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <div className="relative px-8 pb-8">
                <span className="opacity-90 text-base">{script}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Integration; 