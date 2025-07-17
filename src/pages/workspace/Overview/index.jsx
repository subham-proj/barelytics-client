import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Eye, Clock, TrendingDown, TrendingUp, RefreshCw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverview, fetchTopPages, fetchTopReferrers, setCurrentProject } from './analyticsOverviewSlice';
import DateRangePicker from '@/components/ui/date-range-picker';
import { Button } from '@/components/ui/button';
import { StatCardShimmer, ListCardShimmer } from '@/components/ui/shimmer';
import { 
  formatNumber,  
  getDefaultDateRange,
  formatAnalyticsData 
} from '@/lib/analytics';

const Overview = ({ project }) => {
  const dispatch = useDispatch();
  const { overview, topPages, topReferrers, loading, error, currentProjectId } = useSelector((state) => state.overview);
  const [showShimmer, setShowShimmer] = useState(true);
  // Persist date range in localStorage
  const getInitialDateRange = () => {
    const saved = localStorage.getItem('overviewDateRange');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          from: parsed.from ? new Date(parsed.from) : null,
          to: parsed.to ? new Date(parsed.to) : null,
        };
      } catch {
        // fallback to default
      }
    }
    const defaultRange = getDefaultDateRange();
    return {
      from: new Date(defaultRange.from),
      to: new Date(defaultRange.to)
    };
  };
  const [dateRange, setDateRange] = useState(getInitialDateRange);
  // Save date range to localStorage on change
  useEffect(() => {
    if (dateRange.from || dateRange.to) {
      localStorage.setItem('overviewDateRange', JSON.stringify({
        from: dateRange.from ? dateRange.from.toISOString() : null,
        to: dateRange.to ? dateRange.to.toISOString() : null,
      }));
    }
  }, [dateRange]);

  // Set current project when component mounts
  useEffect(() => {
    if (project?.id && currentProjectId !== project.id) {
      dispatch(setCurrentProject(project.id));
    }
  }, [dispatch, project?.id, currentProjectId]);

  // Control shimmer display timing
  useEffect(() => {
    if (loading) {
      setShowShimmer(true);
    } else {
      const timer = setTimeout(() => {
        setShowShimmer(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Fetch data only when project changes or date range changes
  useEffect(() => {
    if (project?.id && dateRange.from && dateRange.to) {
      const fromStr = dateRange.from.toISOString().split('T')[0];
      const toStr = dateRange.to.toISOString().split('T')[0];
      
      dispatch(fetchOverview({ 
        projectId: project.id, 
        from: fromStr, 
        to: toStr 
      }));
      dispatch(fetchTopPages({ projectId: project.id, limit: 5 }));
      dispatch(fetchTopReferrers({ projectId: project.id, limit: 5 }));
    }
  }, [dispatch, project?.id, dateRange.from, dateRange.to]);

  // Manual refresh function
  const handleRefresh = () => {
    if (project?.id && dateRange.from && dateRange.to) {
      const fromStr = dateRange.from.toISOString().split('T')[0];
      const toStr = dateRange.to.toISOString().split('T')[0];
      
      dispatch(fetchOverview({ 
        projectId: project.id, 
        from: fromStr, 
        to: toStr,
        force: true
      }));
      dispatch(fetchTopPages({ projectId: project.id, limit: 5, force: true }));
      dispatch(fetchTopReferrers({ projectId: project.id, limit: 5, force: true }));
    }
  };

  if (!project) return null;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  const stats = overview ? formatAnalyticsData(overview) : [];

  const getTrendIcon = (indicator) => {
    switch (indicator) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Responsive Header */}
      <div className="mb-8 space-y-4">
        {/* Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Analytics Overview</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Monitor your website's performance and user behavior
            </p>
          </div>
          
          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Date Range Picker */}
            <div className="w-full sm:w-auto">
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                className="w-full sm:w-[280px]"
              />
            </div>
            
            {/* Refresh Button */}
            <Button
              onClick={handleRefresh}
              disabled={loading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 w-full sm:w-auto"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {showShimmer || (loading && !overview) ? (
          // Show shimmer placeholders while loading
          [...Array(4)].map((_, index) => (
            <Card key={index} className="h-full">
              <CardContent>
                <StatCardShimmer />
              </CardContent>
            </Card>
          ))
        ) : (
          // Show actual data
          stats.map((stat) => (
            <Card key={stat.label} className="h-full">
              <CardContent className="p-5 flex flex-col gap-2 h-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-base md:text-lg">{stat.label}</span>
                  {stat.label === 'Total Visitors' && <Users className="w-5 h-5 text-muted-foreground" />}
                  {stat.label === 'Page Views' && <Eye className="w-5 h-5 text-muted-foreground" />}
                  {stat.label === 'Avg. Session' && <Clock className="w-5 h-5 text-muted-foreground" />}
                  {stat.label === 'Bounce Rate' && <TrendingDown className="w-5 h-5 text-muted-foreground" />}
                </div>
                <div className="text-2xl md:text-3xl font-extrabold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground">
                  {getTrendIcon(stat.changeIndicator)}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Top Pages & Top Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardContent>
            {showShimmer || (loading && topPages.length === 0) ? (
              <ListCardShimmer />
            ) : (
              <div className="p-5">
                <div className="mb-4">
                  <span className="text-lg md:text-xl font-bold">Top Pages</span>
                  <div className="text-muted-foreground text-sm md:text-base">Most visited pages on your website</div>
                </div>
                <div className="space-y-3">
                  {topPages?.length > 0 ? (
                    topPages.map((page, index) => (
                      <div key={page.page_url} className="flex justify-between items-center text-sm md:text-base">
                        <span className="font-mono truncate flex-1 mr-4">{page.page_url}</span>
                        <span className="font-semibold text-right whitespace-nowrap">{formatNumber(page.views)} views</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">No page data available</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Referrers */}
        <Card>
          <CardContent>
            {showShimmer || (loading && topReferrers.length === 0) ? (
              <ListCardShimmer />
            ) : (
              <div className="p-5">
                <div className="mb-4">
                  <span className="text-lg md:text-xl font-bold">Top Referrers</span>
                  <div className="text-muted-foreground text-sm md:text-base">Traffic sources bringing visitors</div>
                </div>
                <div className="space-y-3">
                  {topReferrers?.length > 0 ? (
                    topReferrers.map((ref) => (
                      <div key={ref.referrer} className="flex justify-between items-center text-sm md:text-base">
                        <span className="font-mono truncate flex-1 mr-4">{ref.referrer}</span>
                        <span className="font-semibold text-right whitespace-nowrap">{formatNumber(ref.visits)} visits</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-muted-foreground py-8">No referrer data available</div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview; 