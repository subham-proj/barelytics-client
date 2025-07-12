// Analytics utility functions

// Format large numbers with K, M suffixes
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Format duration from seconds to readable format
export const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

// Get change indicator based on percent change
export const getChangeIndicator = (percentChange) => {
  if (percentChange > 0) {
    return 'up';
  } else if (percentChange < 0) {
    return 'down';
  }
  return 'neutral';
};

// Format percent change text
export const formatPercentChange = (percentChange) => {
  const absValue = Math.abs(percentChange);
  return `${absValue}% from last period`;
};

// Get default date range (last 30 days)
export const getDefaultDateRange = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  return {
    from: start.toISOString().split('T')[0],
    to: end.toISOString().split('T')[0]
  };
};

// Validate date range
export const validateDateRange = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  return fromDate <= toDate;
};

// Format analytics data for display
export const formatAnalyticsData = (overview) => {
  if (!overview) return [];
  
  return [
    {
      label: 'Total Visitors',
      value: formatNumber(overview.total_visitors.value),
      change: formatPercentChange(overview.total_visitors.percent_change),
      changeIndicator: getChangeIndicator(overview.total_visitors.percent_change),
    },
    {
      label: 'Page Views',
      value: formatNumber(overview.page_views.value),
      change: formatPercentChange(overview.page_views.percent_change),
      changeIndicator: getChangeIndicator(overview.page_views.percent_change),
    },
    {
      label: 'Avg. Session',
      value: formatDuration(overview.avg_session_duration.value),
      change: formatPercentChange(overview.avg_session_duration.percent_change),
      changeIndicator: getChangeIndicator(overview.avg_session_duration.percent_change),
    },
    {
      label: 'Bounce Rate',
      value: `${overview.bounce_rate.value}%`,
      change: formatPercentChange(overview.bounce_rate.percent_change),
      changeIndicator: getChangeIndicator(-overview.bounce_rate.percent_change), // Invert for bounce rate
    },
  ];
}; 