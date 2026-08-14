import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      await signup(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <Card className="w-full max-w-md bg-gradient-to-b from-black to-red-900 border-4 border-red-600 shadow-2xl shadow-red-500/50">
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl font-black text-center text-red-500">
            🕷️ RECRUIT HERO
          </CardTitle>
          <p className="text-center text-red-300 mt-2 text-sm font-bold">Join the Spider-Force</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-900/50 border-2 border-red-600 text-red-200 px-4 py-2 rounded-md text-sm font-bold">
                ⚠️ {error}
              </div>
            )}

            <div>
              <Label htmlFor="name" className="text-red-400 font-bold">
                Hero Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Peter Parker"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black border-2 border-red-600 text-red-300 placeholder-red-700 focus:border-red-400 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-red-400 font-bold">
                Spider Signal (Email)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-2 border-red-600 text-red-300 placeholder-red-700 focus:border-red-400 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-red-400 font-bold">
                Web Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-2 border-red-600 text-red-300 placeholder-red-700 focus:border-red-400 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="confirm" className="text-red-400 font-bold">
                Confirm Password
              </Label>
              <Input
                id="confirm"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-black border-2 border-red-600 text-red-300 placeholder-red-700 focus:border-red-400 mt-1"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-lg py-3 border-2 border-red-400 hover:shadow-red-500/50 hover:shadow-lg transition-all"
              disabled={loading}
            >
              {loading ? '🕸️ RECRUITING...' : '🕸️ BECOME A HERO'}
            </Button>
          </form>

          <p className="text-center text-red-300 mt-6 font-bold text-sm">
            Already joined the force?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 underline">
              Log in here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
