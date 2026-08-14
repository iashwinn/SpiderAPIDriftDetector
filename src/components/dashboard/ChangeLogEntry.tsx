import React from 'react';
import { Diff } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Badge from '@/components/common/Badge';
import { format } from 'date-fns';

interface ChangeLogEntryProps {
  diff: Diff;
  onClick?: (diff: Diff) => void;
  isSelected?: boolean;
}

const ChangeLogEntry: React.FC<ChangeLogEntryProps> = ({ diff, onClick, isSelected }) => {
  return (
    <Card
      className={`bg-zinc-800 border-zinc-700 transition-all ${onClick ? 'cursor-pointer hover:border-blue-500' : ''} ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : ''}`}
      onClick={onClick ? () => onClick(diff) : undefined}
    >
      <CardHeader className="pb-2 flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-zinc-200">
          API Change Detected
        </CardTitle>
        <Badge severity={diff.severity} />
      </CardHeader>
      <CardContent>
        <p className="text-zinc-300 text-sm mb-2">{diff.changelogText}</p>
        <p className="text-zinc-500 text-xs">
          Detected: {format(new Date(diff.detectedAt || diff.timestamp), 'MMM dd, yyyy HH:mm')}
        </p>
      </CardContent>
    </Card>
  );
};

export default ChangeLogEntry;
