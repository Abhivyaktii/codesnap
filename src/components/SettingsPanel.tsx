import { Dispatch, SetStateAction } from 'react';
import { Palette, Layout, Code2 } from 'lucide-react';

interface SettingsPanelProps {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  padding: number;
  setPadding: Dispatch<SetStateAction<number>>;
  radius: number;
  setRadius: Dispatch<SetStateAction<number>>;
  showGradient: boolean;
  setShowGradient: Dispatch<SetStateAction<boolean>>;
  showWatermark: boolean;
  setShowWatermark: Dispatch<SetStateAction<boolean>>;
}

export function SettingsPanel({
  theme,
  setTheme,
  language,
  setLanguage,
  padding,
  setPadding,
  radius,
  setRadius,
  showGradient,
  setShowGradient,
  showWatermark,
  setShowWatermark,
}: SettingsPanelProps) {
  const themes = ['vs-dark', 'light', 'hc-black'];
  const languages = ['javascript', 'typescript', 'python', 'java', 'css', 'html', 'json', 'sql'];

  return (
    <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3">
            <Palette className="w-5 h-5" />
            <h3 className="font-medium">Appearance</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            >
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Background Effect</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showGradient}
                onChange={(e) => setShowGradient(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">Show subtle gradient</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3">
            <Code2 className="w-5 h-5" />
            <h3 className="font-medium">Code</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3">
            <Layout className="w-5 h-5" />
            <h3 className="font-medium">Layout</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Padding: {padding}px
            </label>
            <input
              type="range"
              min="16"
              max="64"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Corner Radius: {radius}px
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}