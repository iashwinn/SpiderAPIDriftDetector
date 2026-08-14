import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email');
        return;
      }

      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <Card className="w-full max-w-md bg-gradient-to-b from-blue-900 to-black border-4 border-blue-600 shadow-2xl shadow-blue-500/50">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-black text-center text-blue-400">
            🕸️ ENTER THE WEB
          </CardTitle>
          <p className="text-center text-blue-300 mt-2 text-sm font-bold">Welcome back, hero</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900/50 border-2 border-red-600 text-red-200 px-4 py-2 rounded-md text-sm font-bold">
                ⚠️ {error}
              </div>
            )}
            
            <div>
              <Label htmlFor="email" className="text-blue-400 font-bold">
                Spider Signal (Email)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-2 border-blue-600 text-blue-300 placeholder-blue-700 focus:border-blue-400 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-blue-400 font-bold">
                Web Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-2 border-blue-600 text-blue-300 placeholder-blue-700 focus:border-blue-400 mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-3 border-2 border-blue-400 hover:shadow-blue-500/50 hover:shadow-lg transition-all"
              disabled={loading}
            >
              {loading ? '🕷️ ENTERING...' : '🕷️ ENTER WEB'}
            </Button>
          </form>

          <p className="text-center text-blue-300 mt-6 font-bold text-sm">
            No powers yet?{' '}
            <Link to="/signup" className="text-red-400 hover:text-red-300 underline">
              Join the team
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
