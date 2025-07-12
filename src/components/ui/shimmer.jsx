import React from 'react';

const Shimmer = ({ className = '', ...props }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${className}`}
    style={{
      backgroundSize: '200% 100%',
      animation: 'shimmer 2s infinite',
    }}
    {...props}
  />
);

const StatCardShimmer = () => (
  <div className="h-full p-5 flex flex-col gap-2">
    <div className="flex items-center justify-between mb-2">
      <Shimmer className="h-5 w-24 rounded" />
      <Shimmer className="h-5 w-5 rounded-full" />
    </div>
    <Shimmer className="h-8 w-20 rounded" />
    <Shimmer className="h-4 w-16 rounded" />
  </div>
);

const ListItemShimmer = () => (
  <div className="flex justify-between items-center">
    <Shimmer className="h-4 flex-1 mr-4 rounded" />
    <Shimmer className="h-4 w-16 rounded" />
  </div>
);

const ListCardShimmer = () => (
  <div className="p-5">
    <div className="mb-4">
      <Shimmer className="h-6 w-32 rounded mb-2" />
      <Shimmer className="h-4 w-48 rounded" />
    </div>
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <ListItemShimmer key={index} />
      ))}
    </div>
  </div>
);

export { Shimmer, StatCardShimmer, ListCardShimmer }; 