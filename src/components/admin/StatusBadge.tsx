
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'pending';

interface StatusBadgeProps {
  status: StatusType | string;
  label?: string;
}

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  warning: 'bg-orange-100 text-orange-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const displayLabel = label || status;
  
  // Map the status to one of our defined types, defaulting to 'info'
  const statusType = Object.keys(statusStyles).includes(status)
    ? status as StatusType
    : 'info';
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        statusStyles[statusType]
      )}
    >
      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
      {displayLabel}
    </span>
  );
};

export default StatusBadge;
