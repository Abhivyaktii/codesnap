import { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { toPng } from 'html-to-image';
import { Download, Settings2, File } from 'lucide-react';
import { SettingsPanel } from './SettingsPanel';
import { Button } from './ui/Button';
import { PreviewFrame } from './PreviewFrame';
import { useEditorTheme } from '../hooks/useEditorTheme';
import { defaultCode } from '../constants/defaultCode';

export function CodeEditor() {
  const [code, setCode] = useState(defaultCode);
  const { theme, setTheme } = useEditorTheme();
  const [language, setLanguage] = useState('javascript');
  const [padding, setPadding] = useState(32);
  const [radius, setRadius] = useState(12);
  const [showGradient, setShowGradient] = useState(true);
  const [showWatermark, setShowWatermark] = useState(true);
  const [fileName, setFileName] = useState('example');
  const editorRef = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [editorHeight, setEditorHeight] = useState('400px');

  // Calculate editor height based on content
  useEffect(() => {
    const lineCount = code.split('\n').length;
    const lineHeight = 20; // Approximate line height in pixels
    const padding = 40; // Additional padding
    const newHeight = Math.max(400, (lineCount * lineHeight) + padding);
    setEditorHeight(`${newHeight}px`);
  }, [code]);

  const downloadImage = async () => {
    if (editorRef.current) {
      try {
        // Configure high-quality image export
        const dataUrl = await toPng(editorRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          skipAutoScale: true,
          style: {
            transform: 'scale(1)',
          },
          filter: (node) => {
            const exclusions = ['scrollbar'];
            return !exclusions.some(className => 
              node.className?.includes?.(className)
            );
          },
          cacheBust: true, // Prevent caching issues
        });

        const timestamp = new Date().toISOString().split('T')[0];
        const sanitizedFileName = fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        const exportName = `${sanitizedFileName}-${timestamp}.png`;
        
        const link = document.createElement('a');
        link.download = exportName;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant={showSettings ? 'primary' : 'secondary'}
            className="group"
          >
            <Settings2 className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
            Customize
          </Button>
          
          {/* File name input */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2">
            <File className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="File name"
              className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500"
              aria-label="File name"
            />
            <span className="text-sm text-gray-400 dark:text-gray-500">.png</span>
          </div>
        </div>
        
        <Button onClick={downloadImage} variant="primary" size="lg">
          <Download className="w-4 h-4 mr-2" />
          Download Image
        </Button>
      </div>

      {showSettings && (
        <SettingsPanel
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          padding={padding}
          setPadding={setPadding}
          radius={radius}
          setRadius={setRadius}
          showGradient={showGradient}
          setShowGradient={setShowGradient}
          showWatermark={showWatermark}
          setShowWatermark={setShowWatermark}
        />
      )}

      <PreviewFrame
        ref={editorRef}
        padding={padding}
        radius={radius}
        showGradient={showGradient}
        theme={theme}
      >
        <Editor
          height={editorHeight}
          defaultLanguage={language}
          language={language}
          theme={theme}
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderLineHighlight: 'all',
            fontFamily: 'JetBrains Mono, Monaco, Menlo, monospace',
            padding: { top: 20 },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            wordWrap: 'on',
            wrappingStrategy: 'advanced',
          }}
        />
        {showWatermark && (
          <div className="absolute bottom-4 right-4 text-sm text-gray-400 font-medium">
            codesnap.dev
          </div>
        )}
      </PreviewFrame>
    </div>
  );
}