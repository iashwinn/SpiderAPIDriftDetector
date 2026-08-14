import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, BarChart3, Clock, Shield, Zap, Target, Lock, Eye } from 'lucide-react';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-red-500" />,
      title: 'Web-Slinging Detection',
      description: 'With great API power comes great responsibility. Catch breaking changes faster than a speeding web!',
    },
    {
      icon: <Eye className="h-8 w-8 text-blue-500" />,
      title: 'Spidey Sense Monitoring',
      description: 'Our spider-senses tingle when schema changes occur. Real-time threat detection!',
    },
    {
      icon: <Target className="h-8 w-8 text-red-500" />,
      title: 'Precision Tracking',
      description: 'Target and neutralize API drift before it damages your web of services',
    },
    {
      icon: <Lock className="h-8 w-8 text-blue-500" />,
      title: 'Web-Safe Deployment',
      description: 'Swing into production with confidence. Zero breaking changes slip through!',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section - Spiderman Style */}
      <section className="text-center py-16 bg-gradient-to-r from-red-900 via-black to-blue-900 rounded-lg p-8 border-4 border-red-600 shadow-2xl">
        <div className="text-6xl mb-4">🕷️</div>
        <h1 className="text-6xl font-black mb-4 text-red-500 drop-shadow-lg" style={{ textShadow: '2px 2px 4px #000000' }}>
          FRIENDLY NEIGHBORHOOD
        </h1>
        <h1 className="text-6xl font-black mb-4 text-blue-400 drop-shadow-lg" style={{ textShadow: '2px 2px 4px #000000' }}>
          API DRIFT DETECTOR
        </h1>
        <p className="text-2xl text-red-300 mb-8 font-bold">
          🕸️ Protect Your Web of APIs 🕸️
        </p>
        <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
          "With great API power comes great responsibility." - Uncle Ben (DevOps)
        </p>
        {user ? (
          <Link to="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 text-white font-bold border-2 border-red-400">
              🕸️ GO TO SPIDER-DASHBOARD
            </Button>
          </Link>
        ) : (
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-6 bg-red-600 hover:bg-red-700 text-white font-bold border-2 border-red-400">
                🕸️ JOIN THE TEAM
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-blue-900 hover:bg-blue-800 text-blue-200 font-bold border-2 border-blue-400">
                🕷️ ALREADY A HERO?
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Features Section - Web Style */}
      <section className="py-12">
        <h2 className="text-4xl font-black text-center mb-4 text-red-500">AMAZING POWERS</h2>
        <p className="text-center text-gray-400 mb-12 text-lg">What makes us your friendly neighborhood protector</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-black border-4 border-red-600 hover:border-red-400 hover:shadow-red-500/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-3xl">{feature.icon}</div>
                  <CardTitle className="text-2xl text-red-500">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works - Web Shooting */}
      <section className="py-12">
        <h2 className="text-4xl font-black text-center mb-4 text-blue-500">THE WEB-SLINGING PROCESS</h2>
        <p className="text-center text-gray-400 mb-12 text-lg">Your path to becoming an API Protection Hero</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: '💥 BLAST OFF', desc: 'Shoot your API into our web' },
            { step: '2', title: '🕷️ CONFIGURE', desc: 'Set your monitoring frequency' },
            { step: '3', title: '👁️ WATCH', desc: 'Spidey-senses detect changes' },
            { step: '4', title: '⚡ ACT', desc: 'Get alerts and save the day!' },
          ].map((item, index) => (
            <div key={index} className="text-center bg-gradient-to-b from-red-900 to-black border-2 border-red-600 rounded-lg p-6 hover:border-red-400 transition-colors">
              <div className="text-5xl mb-4">{item.step}</div>
              <h3 className="font-black mb-2 text-red-500 text-lg">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Web Pattern Footer */}
      <section className="py-8 text-center border-t-4 border-red-600">
        <p className="text-2xl font-bold text-red-500 mb-4">🕸️ Your Neighborhood Web Guardian 🕸️</p>
        <p className="text-gray-400">Protecting APIs since the great deployment crash of 2024</p>
      </section>
    </div>
  );
};

export default HomePage;
