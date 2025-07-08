import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Eye, Clock, TrendingDown } from 'lucide-react';

const Overview = ({ project }) => {
  // Example data (replace with real data as needed)
  const stats = [
    {
      label: 'Total Visitors',
      value: '12,345',
      change: '+12% from last month',
      icon: <Users className="w-5 h-5 text-muted-foreground" />,
    },
    {
      label: 'Page Views',
      value: '45,678',
      change: '+8% from last month',
      icon: <Eye className="w-5 h-5 text-muted-foreground" />,
    },
    {
      label: 'Avg. Session',
      value: '2m 34s',
      change: '+5% from last month',
      icon: <Clock className="w-5 h-5 text-muted-foreground" />,
    },
    {
      label: 'Bounce Rate',
      value: '34.2%',
      change: '-2% from last month',
      icon: <TrendingDown className="w-5 h-5 text-muted-foreground" />,
    },
  ];

  const topPages = [
    { path: '/', views: '8,234' },
    { path: '/about', views: '3,456' },
    { path: '/products', views: '2,789' },
    { path: '/contact', views: '1,234' },
    { path: '/faq', views: '10,291' },
  ];

  const topReferrers = [
    { source: 'google.com', visits: '4,567' },
    { source: 'twitter.com', visits: '1,234' },
    { source: 'github.com', visits: '987' },
    { source: 'facebook.com', visits: '1,447' },
    { source: 'direct', visits: '2,345' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-1">Analytics Overview</h1>
      <p className="text-muted-foreground text-base mb-8">Monitor your website's performance and user behavior</p>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="h-full">
            <CardContent className="p-5 flex flex-col gap-2 h-full">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-base md:text-lg">{stat.label}</span>
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-extrabold">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Top Pages & Top Referrers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Pages */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-2">
              <span className="text-lg md:text-xl font-bold">Top Pages</span>
              <div className="text-muted-foreground text-sm md:text-base">Most visited pages on your website</div>
            </div>
            <div className="mt-4 space-y-2">
              {topPages.map((page) => (
                <div key={page.path} className="flex justify-between items-center text-base md:text-sm">
                  <span className="font-mono">{page.path}</span>
                  <span className="font-semibold text-right">{page.views} views</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Top Referrers */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-2">
              <span className="text-lg md:text-xl font-bold">Top Referrers</span>
              <div className="text-muted-foreground text-sm md:text-base">Traffic sources bringing visitors</div>
            </div>
            <div className="mt-4 space-y-2">
              {topReferrers.map((ref) => (
                <div key={ref.source} className="flex justify-between items-center text-base md:text-sm">
                  <span className="font-mono">{ref.source}</span>
                  <span className="font-semibold text-right">{ref.visits} visits</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview; 