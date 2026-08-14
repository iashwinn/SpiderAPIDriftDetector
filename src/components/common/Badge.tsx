import React from 'react';
import { Severity } from '@/utils/types';
import { cn } from '@/lib/utils';

interface BadgeProps {
  severity: Severity;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ severity, className }) => {
  let colorClass = '';
  switch (severity) {
    case 'BREAKING':
      colorClass = 'bg-red-500 text-red-50';
      break;
    case 'ADDITIVE':
      colorClass = 'bg-blue-500 text-blue-50';
      break;
    case 'NON-BREAKING':
      colorClass = 'bg-gray-500 text-gray-50';
      break;
    default:
      colorClass = 'bg-gray-700 text-gray-50';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase',
        colorClass,
        className
      )}
    >
      {severity.replace('_', ' ')}
    </span>
  );
};

export default Badge;
