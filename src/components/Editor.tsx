import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { toPng } from 'html-to-image';
import { Download, Settings2 } from 'lucide-react';
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
  const editorRef = useRef<HTMLDivElement>(null);
  const [showSettings, setShowSettings] = useState(false);

  const downloadImage = async () => {
    if (editorRef.current) {
      const dataUrl = await toPng(editorRef.current);
      const link = document.createElement('a');
      link.download = 'codesnap.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowSettings(!showSettings)}
            variant={showSettings ? 'primary' : 'secondary'}
            className="group"
          >
            <Settings2 className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
            Customize
          </Button>
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
          height="400px"
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