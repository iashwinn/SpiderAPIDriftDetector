import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Endpoint } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AddEndpointPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    method: 'GET' as const,
    description: '',
    pollInterval: 60,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'pollInterval' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.name || !formData.url) {
        setError('Please fill in all required fields');
        return;
      }

      // Validate URL
      try {
        new URL(formData.url);
      } catch {
        setError('Please enter a valid URL');
        return;
      }

      // Create new endpoint
      const newEndpoint: Endpoint = {
        id: 'endpoint-' + Date.now(),
        name: formData.name,
        url: formData.url,
        method: formData.method,
        description: formData.description || undefined,
        status: 'active',
        pollInterval: formData.pollInterval,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastPolledAt: new Date(),
      };

      // Save to localStorage
      const stored = localStorage.getItem('apiDriftEndpoints');
      const endpoints: Endpoint[] = stored ? JSON.parse(stored) : [];
      endpoints.push(newEndpoint);
      localStorage.setItem('apiDriftEndpoints', JSON.stringify(endpoints));

      navigate('/dashboard');
    } catch (err) {
      setError('Failed to add endpoint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-black mb-8 text-red-500">🕸️ SPIN A NEW WEB</h1>

      <Card className="bg-gradient-to-b from-black to-red-900 border-4 border-red-600 shadow-2xl shadow-red-500/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-black text-red-400">WEB CONFIGURATION</CardTitle>
          <p className="text-red-300 text-sm mt-2 font-bold">Set up your new API endpoint for monitoring</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/50 border-2 border-red-600 text-red-200 px-4 py-2 rounded-md text-sm font-bold">
                ⚠️ {error}
              </div>
            )}

            <div>
              <Label htmlFor="name" className="text-red-400 font-bold">
                Web Name <span className="text-yellow-400">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="e.g., User API, Product Service"
                value={formData.name}
                onChange={handleChange}
                className="bg-black border-2 border-red-600 text-red-300 placeholder-red-700 focus:border-red-400 mt-1"
              />
              <p className="text-xs text-red-300 mt-1">A friendly name for your new web strand</p>
            </div>

            <div>
              <Label htmlFor="url" className="text-red-400 font-bold">
                Web URL <span className="text-yellow-400">*</span>
              </Label>
              <Input
                id="url"
                name="url"
                type="text"
                placeholder="https://api.example.com/v1/openapi.json"
                value={formData.url}
                onChange={handleChange}
                className="bg-black border-2 border-red-600 text-red-300 placeholder-red-700 focus:border-red-400 mt-1"
              />
              <p className="text-xs text-red-300 mt-1">Full URL to your OpenAPI/Swagger specification</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="method" className="text-red-400 font-bold">Web Punch (Method)</Label>
                <select
                  id="method"
                  name="method"
                  value={formData.method}
                  onChange={handleChange}
                  className="w-full bg-black border-2 border-red-600 text-red-300 rounded-md px-3 py-2 mt-1 font-bold"
                >
                  <option value="GET">GET 🎯</option>
                  <option value="POST">POST 💥</option>
                  <option value="PUT">PUT ⚡</option>
                  <option value="DELETE">DELETE 🔥</option>
                  <option value="PATCH">PATCH 🕷️</option>
                </select>
              </div>

              <div>
                <Label htmlFor="pollInterval" className="text-red-400 font-bold">Patrol Frequency (minutes)</Label>
                <Input
                  id="pollInterval"
                  name="pollInterval"
                  type="number"
                  min="5"
                  max="1440"
                  value={formData.pollInterval}
                  onChange={handleChange}
                  className="bg-black border-2 border-red-600 text-red-300 placeholder-red-700 focus:border-red-400 mt-1 font-bold"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-red-400 font-bold">Web Description</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Optional details about this web strand..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-black border-2 border-red-600 text-red-300 placeholder-red-700 focus:border-red-400 rounded-md px-3 py-2 mt-1 font-bold"
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border-2 border-red-600 text-red-400 hover:bg-red-900/50 font-bold"
              >
                BACK TO DASHBOARD
              </Button>
              <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 text-white font-black border-2 border-red-400">
                {loading ? '🕸️ SPINNING...' : '🕸️ SPIN WEB'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddEndpointPage;
