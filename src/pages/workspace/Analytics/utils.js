// Format number with commas
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Format percentage
export const formatPercentage = (value) => {
  if (value === null || value === undefined) return '0%';
  return `${parseFloat(value).toFixed(1)}%`;
};

// Format device types data
export const formatDeviceTypes = (data) => {
  if (!data) return [];
  
  const total = data.total || 0;
  const devices = [
    { key: 'desktop', label: 'Desktop', count: data.desktop || 0 },
    { key: 'mobile', label: 'Mobile', count: data.mobile || 0 },
    { key: 'tablet', label: 'Tablet', count: data.tablet || 0 },
    { key: 'other', label: 'Other', count: data.other || 0 }
  ];
  
  return devices.map(device => {
    const percentage = total > 0 ? (device.count / total) * 100 : 0;
    return {
      label: device.label,
      value: formatPercentage(percentage),
      count: formatNumber(device.count),
      percentage: percentage
    };
  });
};

// Format top locations data
export const formatTopLocations = (data) => {
  if (!data || !Array.isArray(data)) return [];
  
  return data.map(item => ({
    country: item.country || 'Unknown',
    value: formatNumber(item.count || 0),
    count: item.count || 0
  }));
};

// Format browser analytics data
export const formatBrowserAnalytics = (data) => {
  if (!data || !data.browsers || !Array.isArray(data.browsers)) return [];
  
  return data.browsers.map(item => ({
    name: item.browser || 'Unknown',
    value: formatPercentage(item.percent || 0),
    percentage: item.percent || 0
  }));
};

// Format new vs returning data
export const formatNewVsReturning = (data) => {
  if (!data) return { new: '0%', returning: '0%', newCount: '0', returningCount: '0', total: '0' };
  
  const total = data.total || 0;
  const newCount = data.new_count || 0;
  const returningCount = data.returning_count || 0;
  
  // Calculate percentages
  const newPercentage = total > 0 ? (newCount / total) * 100 : 0;
  const returningPercentage = total > 0 ? (returningCount / total) * 100 : 0;
  
  return {
    new: formatPercentage(newPercentage),
    returning: formatPercentage(returningPercentage),
    newCount: formatNumber(newCount),
    returningCount: formatNumber(returningCount),
    total: formatNumber(total)
  };
};

// Format conversion rate data
export const formatConversionRate = (data) => {
  if (!data) return { rate: '0%', conversions: '0', sessions: '0' };
  
  return {
    rate: formatPercentage(data.conversion_rate || 0),
    conversions: formatNumber(data.conversions || 0),
    sessions: formatNumber(data.total_sessions || 0)
  };
};

// Format global reach data
export const formatGlobalReach = (data) => {
  if (!data) return { countries: '0' };
  
  return {
    countries: formatNumber(data.countries || 0)
  };
};

// Get default date range (last 30 days)
export const getDefaultDateRange = () => {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 30);
  
  return {
    from: from.toISOString().split('T')[0],
    to: to.toISOString().split('T')[0]
  };
}; 