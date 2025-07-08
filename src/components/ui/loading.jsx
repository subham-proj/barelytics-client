import React from 'react';

const Loading = ({ size = 'md', text = 'Loading...', fullscreen = true }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const Wrapper = fullscreen
    ? (props) => <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50" {...props} />
    : (props) => <div {...props} />;

  return (
    <Wrapper>
      <div className="flex items-center justify-center space-x-2">
        <div className={`${sizeClasses[size]} border-2 border-gray-300 border-t-primary rounded-full animate-spin`}></div>
        {text && <span className="text-sm text-muted-foreground">{text}</span>}
      </div>
    </Wrapper>
  );
};

export default Loading; 