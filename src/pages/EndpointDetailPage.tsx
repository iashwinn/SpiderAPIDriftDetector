import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Endpoint } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Pause, Trash2, AlertTriangle } from 'lucide-react';

const EndpointDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [endpoint, setEndpoint] = useState<Endpoint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('apiDriftEndpoints');
    if (stored) {
      const endpoints: Endpoint[] = JSON.parse(stored);
      const found = endpoints.find((e) => e.id === id);
      if (found) {
        setEndpoint(found);
      }
    }
    setLoading(false);
  }, [id]);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this endpoint?')) {
      const stored = localStorage.getItem('apiDriftEndpoints');
      if (stored) {
        const endpoints: Endpoint[] = JSON.parse(stored);
        const updated = endpoints.filter((e) => e.id !== id);
        localStorage.setItem('apiDriftEndpoints', JSON.stringify(updated));
      }
      navigate('/dashboard');
    }
  };

  const handleToggleStatus = () => {
    if (endpoint) {
      const stored = localStorage.getItem('apiDriftEndpoints');
      if (stored) {
        const endpoints: Endpoint[] = JSON.parse(stored);
        const updated = endpoints.map((e) =>
          e.id === endpoint.id
            ? { ...e, status: e.status === 'active' ? 'paused' : 'active' }
            : e
        );
        localStorage.setItem('apiDriftEndpoints', JSON.stringify(updated));
        setEndpoint({
          ...endpoint,
          status: endpoint.status === 'active' ? 'paused' : 'active',
        });
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-red-400 font-bold">Spinning the web...</div>;
  }

  if (!endpoint) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="ghost"
          className="flex items-center gap-2 mb-8 text-red-400 hover:text-red-300 font-bold"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>
        <Card className="bg-gradient-to-b from-black to-red-900 border-4 border-red-600">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
            <p className="text-red-300 text-lg font-bold">Web strand not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Button
        onClick={() => navigate('/dashboard')}
        variant="ghost"
        className="flex items-center gap-2 mb-8 text-red-400 hover:text-red-300 font-bold"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Button>

      <div className="mb-8 bg-gradient-to-r from-red-900 via-black to-blue-900 p-6 rounded-lg border-4 border-red-600">
        <h1 className="text-4xl font-black text-red-500 mb-2">🕸️ {endpoint.name}</h1>
        <p className="text-blue-300 text-lg font-bold break-all">{endpoint.url}</p>
      </div>

      {/* Main Info - Web Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-black border-4 border-green-600 hover:shadow-green-500/50 hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-green-400 font-black">WEB STATUS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`h-4 w-4 rounded-full font-black text-xl ${
                endpoint.status === 'active' ? 'text-green-500' : 'text-yellow-500'
              }`}>
                {endpoint.status === 'active' ? '🟢' : '🟡'}
              </div>
              <span className="capitalize font-bold text-green-300">{endpoint.status || 'unknown'}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black border-4 border-blue-600 hover:shadow-blue-500/50 hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-400 font-black">PATROL SPEED</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-black text-blue-300">{endpoint.pollInterval || 60} min</p>
            <p className="text-xs text-blue-400 mt-1">Every patrol</p>
          </CardContent>
        </Card>

        <Card className="bg-black border-4 border-yellow-600 hover:shadow-yellow-500/50 hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-yellow-400 font-black">LAST SIGHTING</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-black text-yellow-300">
              {endpoint.lastPolledAt
                ? new Date(endpoint.lastPolledAt).toLocaleDateString()
                : 'Never'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Details */}
      <Card className="bg-gradient-to-b from-black to-red-900 border-4 border-red-600 shadow-2xl shadow-red-500/50 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-black text-red-400">WEB DETAILS</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-red-400 font-bold">ATTACK METHOD 🥊</label>
              <p className="text-lg font-black font-mono bg-black border-2 border-red-600 px-3 py-2 rounded-md mt-2 text-red-300">
                {endpoint.method}
              </p>
            </div>

            <div>
              <label className="text-sm text-red-400 font-bold">WEB CREATED 🕷️</label>
              <p className="text-lg font-black text-red-300 mt-2">
                {new Date(endpoint.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {endpoint.description && (
            <div>
              <label className="text-sm text-red-400 font-bold">WEB NOTES 📋</label>
              <p className="text-red-200 mt-2 bg-black/50 border border-red-600 rounded p-3">{endpoint.description}</p>
            </div>
          )}

          <div>
            <label className="text-sm text-red-400 font-bold">DESTINATION 🎯</label>
            <p className="text-red-200 mt-2 break-all bg-black/50 border border-red-600 rounded p-3 font-mono text-sm">{endpoint.url}</p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={handleToggleStatus}
          className={`flex items-center gap-2 font-black py-3 border-2 ${
            endpoint.status === 'active' 
              ? 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-400' 
              : 'bg-green-600 hover:bg-green-700 text-white border-green-400'
          }`}
        >
          {endpoint.status === 'active' ? (
            <>
              🟡 PAUSE PATROL
            </>
          ) : (
            <>
              🟢 RESUME PATROL
            </>
          )}
        </Button>

        <Button
          onClick={handleDelete}
          className="flex items-center gap-2 font-black py-3 bg-red-700 hover:bg-red-800 text-white border-2 border-red-500"
        >
          🔥 DELETE WEB
        </Button>
      </div>
    </div>
  );
};

export default EndpointDetailPage;
