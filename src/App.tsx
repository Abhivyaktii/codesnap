import React from 'react';
import { CodeEditor } from './components/Editor';
import { Code2, Github, Moon, Sun } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { Button } from './components/ui/Button';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-blue-600" />
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
                  CodeSnap
                </span>
                {/* <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">by StackBlitz</span> */}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleTheme}
                className="!p-2"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Create Beautiful Code Screenshots
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Transform your code into stunning images perfect for documentation,
              presentations, or social media sharing.
            </p>
          </div>
          <CodeEditor />
        </div>
      </main>
      
      <footer className="mt-16 py-8 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
          <p className="mb-2">Create beautiful code snapshots in seconds</p>
          <p className="text-sm">Built with ❤️ using React and Monaco Editor</p>
        </div>
      </footer>
    </div>
  );
}

export default App;