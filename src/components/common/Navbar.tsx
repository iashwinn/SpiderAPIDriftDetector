import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Code, LogOut, LayoutDashboard, PlusCircle, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-red-900 via-black to-blue-900 p-4 shadow-2xl border-b-4 border-red-600">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-red-500 flex items-center gap-2 hover:text-red-400 transition-colors">
          <span className="text-3xl">🕷️</span>
          <span>SPIDER</span>
          <span className="text-blue-400">WEB</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" className="text-red-300 hover:text-red-500 font-bold flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4" /> WEB
                </Button>
              </Link>
              <Link to="/endpoints/new">
                <Button variant="ghost" className="text-red-300 hover:text-red-500 font-bold flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" /> BLAST
                </Button>
              </Link>
              <span className="text-red-300 hidden md:block font-bold">🕷️ {user.username}</span>
              <Button onClick={logout} variant="ghost" className="text-red-400 hover:text-red-600 font-bold flex items-center gap-2">
                <LogOut className="h-4 w-4" /> EJECT
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-blue-300 hover:text-blue-500 font-bold flex items-center gap-2">
                  <LogIn className="h-4 w-4" /> ENTER
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-red-600 hover:bg-red-700 text-white font-bold border-2 border-red-400 flex items-center gap-2">
                  <UserPlus className="h-4 w-4" /> RECRUIT
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
