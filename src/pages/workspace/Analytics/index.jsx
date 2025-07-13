import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Monitor, Smartphone, Tablet, MapPin, Globe2, PieChart, TrendingUp, RefreshCw, AlertCircle, AlertTriangle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import DateRangePicker from '@/components/ui/date-range-picker';
import { StatCardShimmer, ListCardShimmer } from '@/components/ui/shimmer';
import {
  fetchNewVsReturning,
  fetchConversionRate,
  fetchGlobalReach,
  fetchDeviceTypes,
  fetchTopLocations,
  fetchBrowserAnalytics,
  setCurrentProject,
  clearAnalytics,
  clearIndividualError
} from './analyticsSlice';
import {
  formatDeviceTypes,
  formatTopLocations,
  formatBrowserAnalytics,
  formatNewVsReturning,
  formatConversionRate,
  formatGlobalReach,
  getDefaultDateRange
} from './utils';

const Analytics = ({ project }) => {
  const dispatch = useDispatch();
  const { 
    newVsReturning, 
    conversionRate, 
    globalReach, 
    deviceTypes, 
    topLocations, 
    browserAnalytics,
    loading, 
    error, 
    currentProjectId,
    individualLoading,
    individualErrors
  } = useSelector((state) => state.analytics);
  
  const [showShimmer, setShowShimmer] = useState(true);
  
  // Default to last 30 days
  const [dateRange, setDateRange] = useState(() => {
    const defaultRange = getDefaultDateRange();
    return {
      from: new Date(defaultRange.from),
      to: new Date(defaultRange.to)
    };
  });

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

  // Fetch data when project or date range changes
  useEffect(() => {
    if (project?.id && dateRange.from && dateRange.to) {
      const fromStr = dateRange.from.toISOString().split('T')[0];
      const toStr = dateRange.to.toISOString().split('T')[0];
      
      dispatch(fetchNewVsReturning({ projectId: project.id, from: fromStr, to: toStr }));
      dispatch(fetchConversionRate({ projectId: project.id, from: fromStr, to: toStr }));
      dispatch(fetchGlobalReach({ projectId: project.id, from: fromStr, to: toStr }));
      dispatch(fetchDeviceTypes({ projectId: project.id, from: fromStr, to: toStr }));
      dispatch(fetchTopLocations({ projectId: project.id, from: fromStr, to: toStr }));
      dispatch(fetchBrowserAnalytics({ projectId: project.id, from: fromStr, to: toStr }));
    }
  }, [dispatch, project?.id, dateRange.from, dateRange.to]);

  // Manual refresh function
  const handleRefresh = () => {
    if (project?.id && dateRange.from && dateRange.to) {
      // Clear cache first
      dispatch(clearAnalytics());
      
      const fromStr = dateRange.from.toISOString().split('T')[0];
      const toStr = dateRange.to.toISOString().split('T')[0];
      
      dispatch(fetchNewVsReturning({ projectId: project.id, from: fromStr, to: toStr, force: true }));
      dispatch(fetchConversionRate({ projectId: project.id, from: fromStr, to: toStr, force: true }));
      dispatch(fetchGlobalReach({ projectId: project.id, from: fromStr, to: toStr, force: true }));
      dispatch(fetchDeviceTypes({ projectId: project.id, from: fromStr, to: toStr, force: true }));
      dispatch(fetchTopLocations({ projectId: project.id, from: fromStr, to: toStr, force: true }));
      dispatch(fetchBrowserAnalytics({ projectId: project.id, from: fromStr, to: toStr, force: true }));
    }
  };

  // Retry individual API call
  const handleRetry = (apiCall, dataKey) => {
    if (project?.id && dateRange.from && dateRange.to) {
      const fromStr = dateRange.from.toISOString().split('T')[0];
      const toStr = dateRange.to.toISOString().split('T')[0];
      
      // Clear the specific error
      dispatch(clearIndividualError({ key: dataKey }));
      
      dispatch(apiCall({ projectId: project.id, from: fromStr, to: toStr, force: true }));
    }
  };

  if (!project) return null;

  // Check if we have any data at all
  const hasAnyData = newVsReturning || conversionRate || globalReach || deviceTypes || topLocations || browserAnalytics;
  const hasAnyErrors = Object.values(individualErrors).some(error => error !== null) || error;

  // Format data with error handling
  const formattedNewVsReturning = formatNewVsReturning(newVsReturning);
  const formattedConversionRate = formatConversionRate(conversionRate);
  const formattedGlobalReach = formatGlobalReach(globalReach);
  const formattedDeviceTypes = formatDeviceTypes(deviceTypes);
  const formattedTopLocations = formatTopLocations(topLocations);
  const formattedBrowserAnalytics = formatBrowserAnalytics(browserAnalytics);

  // Helper component for error state
  const ErrorState = ({ message, onRetry, dataKey }) => (
    <Card className="h-full">
      <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
        <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
        <p className="text-sm text-muted-foreground mb-3">{message}</p>
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onRetry(dataKey)}
            className="text-xs"
            disabled={individualLoading[dataKey]}
          >
            {individualLoading[dataKey] ? 'Retrying...' : 'Retry'}
          </Button>
        )}
      </CardContent>
    </Card>
  );

  // Helper component for empty state
  const EmptyState = ({ title, message }) => (
    <Card className="h-full">
      <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
        <AlertTriangle className="w-8 h-8 text-yellow-500 mb-3" />
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Analytics Insights</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Detailed analytics and user behavior data
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              className="w-full sm:w-[280px]"
            />
            
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

        {/* Global Error Banner */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                  <p className="text-xs text-red-600 mt-1">Please try refreshing the page or selecting a different date range.</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleRefresh}
                  className="text-red-600 border-red-300 hover:bg-red-100"
                  disabled={loading}
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {!hasAnyData && !loading && !hasAnyErrors ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground mb-2">📊</div>
            <h3 className="text-lg font-semibold mb-2">No Analytics Data</h3>
            <p className="text-sm text-muted-foreground">
              No analytics data found for the selected date range. 
              Try selecting a different date range or check if tracking is working.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {showShimmer || (loading && !newVsReturning && !individualErrors.newVsReturning) ? (
              [...Array(3)].map((_, index) => (
                <Card key={index} className="h-full">
                  <CardContent>
                    <StatCardShimmer />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                {/* New vs Returning */}
                {individualErrors.newVsReturning ? (
                  <ErrorState 
                    message={individualErrors.newVsReturning}
                    onRetry={() => handleRetry(fetchNewVsReturning, 'newVsReturning')}
                    dataKey="newVsReturning"
                  />
                ) : !newVsReturning ? (
                  <EmptyState 
                    title="No New vs Returning Data"
                    message="No user session data available for this period"
                  />
                ) : (
                  <Card className="h-full">
                    <CardContent className="p-5 flex flex-col gap-2 h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <PieChart className="w-5 h-5 text-muted-foreground" />
                        <span className="font-semibold text-base md:text-lg">New vs Returning</span>
                      </div>
                      <div className="text-2xl md:text-3xl font-extrabold">
                        {formattedNewVsReturning.new} / {formattedNewVsReturning.returning}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {formattedNewVsReturning.newCount} new, {formattedNewVsReturning.returningCount} returning
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Total: {formattedNewVsReturning.total} users
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Conversion Rate */}
                {individualErrors.conversionRate ? (
                  <ErrorState 
                    message={individualErrors.conversionRate}
                    onRetry={() => handleRetry(fetchConversionRate, 'conversionRate')}
                    dataKey="conversionRate"
                  />
                ) : !conversionRate ? (
                  <EmptyState 
                    title="No Conversion Data"
                    message="No conversion tracking data available for this period"
                  />
                ) : (
                  <Card className="h-full">
                    <CardContent className="p-5 flex flex-col gap-2 h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-muted-foreground" />
                        <span className="font-semibold text-base md:text-lg">Conversion Rate</span>
                      </div>
                      <div className="text-2xl md:text-3xl font-extrabold">
                        {formattedConversionRate.rate}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {formattedConversionRate.conversions} conversions from {formattedConversionRate.sessions} sessions
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Global Reach */}
                {individualErrors.globalReach ? (
                  <ErrorState 
                    message={individualErrors.globalReach}
                    onRetry={() => handleRetry(fetchGlobalReach, 'globalReach')}
                    dataKey="globalReach"
                  />
                ) : !globalReach ? (
                  <EmptyState 
                    title="No Global Reach Data"
                    message="No geographic data available for this period"
                  />
                ) : (
                  <Card className="h-full">
                    <CardContent className="p-5 flex flex-col gap-2 h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <Globe2 className="w-5 h-5 text-muted-foreground" />
                        <span className="font-semibold text-base md:text-lg">Global Reach</span>
                      </div>
                      <div className="text-2xl md:text-3xl font-extrabold">
                        {formattedGlobalReach.countries} countries
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        Countries reached
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* Device Types & Top Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Device Types */}
            <Card>
              <CardContent>
                {showShimmer || (loading && !deviceTypes && !individualErrors.deviceTypes) ? (
                  <ListCardShimmer />
                ) : (
                  <div className="p-5">
                    <div className="mb-4">
                      <span className="text-lg md:text-xl font-bold">Device Types</span>
                      <div className="text-muted-foreground text-sm md:text-base">Breakdown of visitor devices</div>
                    </div>
                    {individualErrors.deviceTypes ? (
                      <div className="text-center py-8">
                        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground mb-3">{individualErrors.deviceTypes}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleRetry(fetchDeviceTypes, 'deviceTypes')}
                          disabled={individualLoading.deviceTypes}
                        >
                          {individualLoading.deviceTypes ? 'Retrying...' : 'Retry'}
                        </Button>
                      </div>
                    ) : !deviceTypes ? (
                      <div className="text-center py-8">
                        <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No device data available for this period</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formattedDeviceTypes?.length > 0 ? (
                          formattedDeviceTypes.map((device) => (
                            <div key={device.label} className="flex items-center justify-between text-sm md:text-base">
                              <span className="flex items-center">
                                {device.label === 'Desktop' && <Monitor className="w-4 h-4 mr-2 text-muted-foreground" />}
                                {device.label === 'Mobile' && <Smartphone className="w-4 h-4 mr-2 text-muted-foreground" />}
                                {device.label === 'Tablet' && <Tablet className="w-4 h-4 mr-2 text-muted-foreground" />}
                                {device.label}
                              </span>
                              <span className="font-semibold text-right">{device.value}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-muted-foreground py-8">No device data available</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Locations */}
            <Card>
              <CardContent>
                {showShimmer || (loading && !topLocations && !individualErrors.topLocations) ? (
                  <ListCardShimmer />
                ) : (
                  <div className="p-5">
                    <div className="mb-4">
                      <span className="text-lg md:text-xl font-bold">Top Locations</span>
                      <div className="text-muted-foreground text-sm md:text-base">Geographic distribution of visitors</div>
                    </div>
                    {individualErrors.topLocations ? (
                      <div className="text-center py-8">
                        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground mb-3">{individualErrors.topLocations}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleRetry(fetchTopLocations, 'topLocations')}
                          disabled={individualLoading.topLocations}
                        >
                          {individualLoading.topLocations ? 'Retrying...' : 'Retry'}
                        </Button>
                      </div>
                    ) : !topLocations ? (
                      <div className="text-center py-8">
                        <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No location data available for this period</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formattedTopLocations?.length > 0 ? (
                          formattedTopLocations.map((location) => (
                            <div key={location.country} className="flex items-center justify-between text-sm md:text-base">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                                {location.country}
                              </span>
                              <span className="font-semibold text-right">{location.value}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-center text-muted-foreground py-8">No location data available</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Browser Analytics */}
          <Card>
            <CardContent>
              {showShimmer || (loading && !browserAnalytics && !individualErrors.browserAnalytics) ? (
                <ListCardShimmer />
              ) : (
                <div className="p-5">
                  <div className="mb-4">
                    <span className="text-lg md:text-xl font-bold">Browser Analytics</span>
                    <div className="text-muted-foreground text-sm md:text-base">Popular browsers among your visitors</div>
                  </div>
                  {individualErrors.browserAnalytics ? (
                    <div className="text-center py-8">
                      <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-3">{individualErrors.browserAnalytics}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleRetry(fetchBrowserAnalytics, 'browserAnalytics')}
                        disabled={individualLoading.browserAnalytics}
                      >
                        {individualLoading.browserAnalytics ? 'Retrying...' : 'Retry'}
                      </Button>
                    </div>
                  ) : !browserAnalytics ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">No browser data available for this period</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {formattedBrowserAnalytics?.length > 0 ? (
                        formattedBrowserAnalytics.map((browser) => (
                          <div key={browser.name} className="flex justify-between items-center text-sm md:text-base">
                            <span className="font-mono">{browser.name}</span>
                            <span className="font-semibold text-right">{browser.value}</span>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center text-muted-foreground py-8">No browser data available</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Analytics; 