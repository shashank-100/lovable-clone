import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaperclipIcon, Globe2Icon, InfoIcon, FileIcon, ImageIcon, LayoutIcon, UploadIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import Footer from '../components/footer';

export function Home() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleTemplateClick = (template: string) => {
    setInputValue(`Create a ${template}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate('/builder', { state: { prompt: inputValue } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-pink-100 to-orange-100 flex flex-col">
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md"></div>
          <span className="font-bold text-xl">Lovable</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white/80">
            Sign in
          </Button>
          <Button className="bg-black text-white hover:bg-black/80">Sign up</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex flex-col items-center flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Build something{" "}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
              amazing
            </span>
          </h1>
          <p className="text-lg text-gray-700">Describe your dream website, and we'll help you build it step by step with AI-powered assistance</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white/90 rounded-lg shadow-lg p-4 mb-8">
          <div className="mb-4">
            <Input
              placeholder="Ask Lovable to create a..."
              className="w-full p-4 text-lg border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" className="text-gray-500">
              <PaperclipIcon className="h-4 w-4 mr-2" />
              Attach
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Globe2Icon className="h-4 w-4 mr-2" />
                Public
              </Button>
              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                <InfoIcon className="h-3 w-3 text-gray-500" />
              </div>
              <Button type="submit" className="ml-4 bg-black text-white hover:bg-black/80">
                Create
              </Button>
            </div>
          </div>
        </form>

        <div className="flex flex-wrap gap-2 justify-center mb-16">
          {[
            { name: "SaaS landing page", icon: <LayoutIcon className="h-4 w-4 mr-2" /> },
            { name: "File uploader", icon: <UploadIcon className="h-4 w-4 mr-2" /> },
            { name: "AI image generator", icon: <ImageIcon className="h-4 w-4 mr-2" /> },
          ].map((item) => (
            <Button
              key={item.name}
              variant="outline"
              className="bg-white/80 rounded-full flex items-center"
              onClick={() => handleTemplateClick(item.name)}
            >
              {item.icon}
              {item.name}
            </Button>
          ))}
        </div>

        <div className="w-full max-w-6xl bg-white/90 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">From the Community</h2>
            <a href="#" className="text-sm font-medium">
              View All
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-gray-50 p-4 h-64">
                <div className="h-40 bg-gray-100 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}