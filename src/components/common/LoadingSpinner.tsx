import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
