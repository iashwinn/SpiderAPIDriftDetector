import React from 'react';
import { Link } from 'react-router-dom';
import { Endpoint } from '@/utils/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CircleDotDashed, Play, Pause, AlertTriangle } from 'lucide-react';
import { formatDistanceToNowStrict } from 'date-fns';

interface EndpointCardProps {
  endpoint: Endpoint;
}

const EndpointCard: React.FC<EndpointCardProps> = ({ endpoint }) => {
  const getStatusIcon = (status: Endpoint['status']) => {
    switch (status) {
      case 'active':
        return <span className="text-2xl">🟢</span>;
      case 'paused':
        return <span className="text-2xl">🟡</span>;
      case 'error':
        return <span className="text-2xl">🔴</span>;
      default:
        return <span className="text-2xl">⚫</span>;
    }
  };

  const getLastPolledText = (lastPolledAt?: Date | string) => {
    if (!lastPolledAt) return 'Never polled';
    return `Last patrol ${formatDistanceToNowStrict(new Date(lastPolledAt), { addSuffix: true })}`;
  };

  return (
    <Card className="bg-gradient-to-b from-black to-red-900 hover:border-red-400 transition-all transform hover:scale-105 border-2 border-red-600 hover:shadow-red-500/50 hover:shadow-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl font-black text-red-400 truncate">{endpoint.url}</span>
          <span className="text-xs text-red-300 uppercase font-black bg-black/50 px-2 py-1 rounded-md border border-red-600">
            {endpoint.method}
          </span>
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-red-300 font-bold text-sm">
          {getStatusIcon(endpoint.status)}
          <span className="capitalize">{endpoint.status || 'unknown'}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-yellow-300 mb-2 font-bold">
          🕷️ Patrols every {endpoint.pollInterval || 60} mins
        </p>
        <p className="text-sm text-blue-300 mb-4">
          {getLastPolledText(endpoint.lastPolledAt)}
        </p>
        <Link to={`/endpoints/${endpoint.id}`}>
          <Button className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold border border-red-400">
            View Web <span className="text-lg">🕸️</span>
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EndpointCard;
