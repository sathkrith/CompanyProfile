import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl">Page Not Found</p>
        <a href="/" className="mt-4 text-blue-500 underline">Go back to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
