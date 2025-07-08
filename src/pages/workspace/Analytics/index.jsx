import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Smartphone, Tablet, MapPin, Globe2, PieChart, TrendingUp } from 'lucide-react';

const Analytics = ({ project }) => {
  // Example data (replace with real data as needed)
  const deviceTypes = [
    { label: 'Desktop', value: '68.4%', icon: <Monitor className="w-5 h-5 mr-2 text-muted-foreground" /> },
    { label: 'Mobile', value: '28.7%', icon: <Smartphone className="w-5 h-5 mr-2 text-muted-foreground" /> },
    { label: 'Tablet', value: '2.9%', icon: <Tablet className="w-5 h-5 mr-2 text-muted-foreground" /> },
  ];
  const topLocations = [
    { country: 'United States', value: '4,567' },
    { country: 'United Kingdom', value: '1,234' },
    { country: 'Germany', value: '987' },
    { country: 'Canada', value: '654' },
  ];
  const browsers = [
    { name: 'Chrome', value: '45.2%' },
    { name: 'Safari', value: '23.8%' },
    { name: 'Firefox', value: '15.4%' },
    { name: 'Edge', value: '12.1%' },
    { name: 'Opera', value: '2.8%' },
    { name: 'Other', value: '0.7%' },
  ];
  // Additional metrics
  const extraMetrics = [
    { label: 'New vs Returning', value: '72% / 28%', icon: <PieChart className="w-5 h-5 text-muted-foreground" /> },
    { label: 'Conversion Rate', value: '4.6%', icon: <TrendingUp className="w-5 h-5 text-muted-foreground" /> },
    { label: 'Global Reach', value: '24 countries', icon: <Globe2 className="w-5 h-5 text-muted-foreground" /> },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Analytics Insights</h1>
      <p className="text-muted-foreground text-base mb-8">Detailed analytics and user behavior data</p>
      {/* Extra Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {extraMetrics.map((metric) => (
          <Card key={metric.label} className="h-full">
            <CardContent className="p-5 flex flex-col gap-2 h-full">
              <div className="flex items-center gap-2 mb-2">
                {metric.icon}
                <span className="font-semibold text-base md:text-lg">{metric.label}</span>
              </div>
              <div className="text-2xl md:text-3xl font-extrabold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Device Types & Top Locations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Device Types */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-2">
              <span className="text-lg md:text-xl font-bold">Device Types</span>
              <div className="text-muted-foreground text-sm md:text-base">Breakdown of visitor devices</div>
            </div>
            <div className="mt-4 space-y-3">
              {deviceTypes.map((d) => (
                <div key={d.label} className="flex items-center justify-between text-base md:text-sm">
                  <span className="flex items-center font-mono">{d.icon}{d.label}</span>
                  <span className="font-semibold text-right">{d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Top Locations */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-2">
              <span className="text-lg md:text-xl font-bold">Top Locations</span>
              <div className="text-muted-foreground text-sm md:text-base">Geographic distribution of visitors</div>
            </div>
            <div className="mt-4 space-y-3">
              {topLocations.map((loc) => (
                <div key={loc.country} className="flex items-center justify-between text-base md:text-sm">
                  <span className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-muted-foreground" />{loc.country}</span>
                  <span className="font-semibold text-right">{loc.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Browser Analytics */}
      <Card>
        <CardContent className="p-5">
          <div className="mb-2">
            <span className="text-lg md:text-xl font-bold">Browser Analytics</span>
            <div className="text-muted-foreground text-sm md:text-base">Popular browsers among your visitors</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {browsers.map((b, i) => (
              <div key={b.name} className="flex justify-between items-center text-base md:text-sm">
                <span className="font-mono">{b.name}</span>
                <span className="font-semibold text-right">{b.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics; 