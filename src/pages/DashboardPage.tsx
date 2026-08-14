import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Endpoint } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EndpointCard from '@/components/dashboard/EndpointCard';
import { PlusCircle, AlertCircle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load endpoints from localStorage
    const stored = localStorage.getItem('apiDriftEndpoints');
    if (stored) {
      try {
        setEndpoints(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load endpoints:', error);
      }
    }
    setLoading(false);
  }, []);

  const recentEndpoints = endpoints.slice(0, 3);
  const driftDetected = endpoints.filter((e) => e.status === 'error').length;

  return (
    <div className="space-y-8">
      {/* Header - Spiderman Style */}
      <div className="flex justify-between items-center bg-gradient-to-r from-red-900 via-black to-blue-900 p-6 rounded-lg border-4 border-red-600">
        <h1 className="text-4xl font-black text-red-500">🕷️ SPIDER-DASHBOARD</h1>
        <Link to="/endpoints/new">
          <Button className="text-lg px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold border-2 border-red-400 flex items-center gap-2">
            🕸️ BLAST NEW API
          </Button>
        </Link>
      </div>

      {/* Stats - Web Strands */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-black border-4 border-red-600 hover:shadow-red-500/50 hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black text-red-400">
              🕷️ ACTIVE WEBS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-red-500">{endpoints.length}</div>
            <p className="text-xs text-red-300 mt-1">
              {endpoints.filter((e) => e.status === 'active').length} spinning
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black border-4 border-blue-600 hover:shadow-blue-500/50 hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black text-blue-400">
              ⚠️ THREATS DETECTED
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-500">{driftDetected}</div>
            <p className="text-xs text-blue-300 mt-1">
              {driftDetected > 0 ? 'Enemy spotted!' : 'All clear'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-black border-4 border-yellow-600 hover:shadow-yellow-500/50 hover:shadow-lg transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-black text-yellow-400">
              🎯 LAST PATROL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-yellow-500">NOW</div>
            <p className="text-xs text-yellow-300 mt-1">
              Neighborhood secured
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Endpoints List */}
      <div>
        <h2 className="text-3xl font-black mb-6 text-red-500">🕸️ ACTIVE WEB STRANDS</h2>
        {loading ? (
          <div className="text-center text-gray-400 py-8">Spinning the web...</div>
        ) : endpoints.length === 0 ? (
          <Card className="bg-black border-4 border-red-600">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
              <p className="text-red-300 mb-6 text-lg font-bold">No webs created yet!</p>
              <Link to="/endpoints/new">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold border-2 border-red-400">
                  🕸️ SPIN YOUR FIRST WEB
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {endpoints.map((endpoint) => (
              <EndpointCard key={endpoint.id} endpoint={endpoint} />
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      {recentEndpoints.length > 0 && (
        <div>
          <h2 className="text-3xl font-black mb-6 text-blue-500">👁️ RECENT SIGHTINGS</h2>
          <div className="space-y-4">
            {recentEndpoints.map((endpoint) => (
              <Card key={endpoint.id} className="bg-black border-2 border-blue-600 hover:border-blue-400 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-red-500 text-lg">{endpoint.name}</p>
                      <p className="text-sm text-gray-400">{endpoint.url}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      endpoint.status === 'active'
                        ? 'bg-green-900/50 text-green-300 border border-green-600'
                        : endpoint.status === 'error'
                        ? 'bg-red-900/50 text-red-300 border border-red-600'
                        : 'bg-gray-900/50 text-gray-300 border border-gray-600'
                    }`}>
                      {endpoint.status === 'active' ? '🟢' : endpoint.status === 'error' ? '🔴' : '⚫'} {endpoint.status || 'unknown'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
