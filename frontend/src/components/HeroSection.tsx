import { Paperclip, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

export function HeroSection({ prompt, setPrompt }: HeroSectionProps) {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/builder');
    }
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6 pt-20 pb-20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="space-y-8 mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight tracking-tight">
            What should we build today?
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Create stunning apps & websites by chatting with AI.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your idea and we'll build it together."
              className="w-full h-32 p-6 bg-transparent text-white resize-none focus:outline-none placeholder-gray-500 text-base"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="flex items-center justify-between p-4 border-t border-gray-700/50">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Zap className="w-5 h-5" />
                </button>
              </div>
              <button
                type="submit"
                disabled={!prompt.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
          
        </motion.form>
      </div>
    </div>
  );
}
