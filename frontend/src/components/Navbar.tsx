import { cn } from '../utils/cn';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';

interface NavbarProps {
  scrollY: number;
}

export function Navbar({ scrollY }: NavbarProps) {
  const navigator = useNavigate();
  return (
    <motion.nav
      initial={{ filter: 'blur(10px)' }}
      animate={{ filter: 'blur(0px)' }}
      transition={{ duration: 0.3 }}
      className="fixed z-20 flex items-center justify-between py-4 px-6 transition-all duration-300 w-full bg-gray-900/90 backdrop-blur-sm"
    >
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div
            onClick={() => navigator('/')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="relative w-8 h-8 flex items-center justify-center">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMgMkwzIDEzTDEyIDEzTDExIDIyTDIxIDExTDEyIDExTDEzIDJaIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBmaWxsPSIjRkZGRkZGIiAvPjwvc3ZnPg=="
                alt="Bolt Logo"
                className="w-6 h-6 relative z-10"
              />
            </div>
            <span className="text-lg font-bold text-white">bolt.new</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
        </div>

        <div className="flex items-center space-x-4">
        </div>
      </div>
    </motion.nav>
  );
}
