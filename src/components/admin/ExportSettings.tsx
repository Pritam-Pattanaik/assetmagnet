// Export settings component for admin panel
import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Settings, 
  FileText, 
  Calendar, 
  Info, 
  Save,
  RotateCcw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Card, Button, Modal } from '../ui';
import { exportService, type ExportSettings } from '../../services/exportService';

interface ExportSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onExport?: (type: string) => void;
}

export default function ExportSettingsComponent({ isOpen, onClose, onExport }: ExportSettingsProps) {
  const [settings, setSettings] = useState<ExportSettings>(exportService.getExportSettings());
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setSettings(exportService.getExportSettings());
      setSaveStatus('idle');
    }
  }, [isOpen]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      exportService.saveExportSettings(settings);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to save export settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    const defaultSettings = {
      format: 'json' as const,
      includeHeaders: true,
      dateFormat: 'iso' as const,
      includeMetadata: true,
      compression: false
    };
    setSettings(defaultSettings);
  };

  const formats = exportService.getAvailableFormats();
  const dateFormats = exportService.getDateFormats();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Settings"
      size="lg"
    >
      <div className="space-y-6">
        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <FileText className="w-4 h-4 inline mr-2" />
            Export Format
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formats.map((format) => (
              <div
                key={format.value}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  settings.format === format.value
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                } ${format.value === 'xlsx' || format.value === 'pdf' ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  if (format.value !== 'xlsx' && format.value !== 'pdf') {
                    setSettings({ ...settings, format: format.value as any });
                  }
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {format.label}
                  </h3>
                  {settings.format === format.value && (
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                  )}
                  {(format.value === 'xlsx' || format.value === 'pdf') && (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {format.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date Format
          </label>
          <div className="space-y-2">
            {dateFormats.map((dateFormat) => (
              <label
                key={dateFormat.value}
                className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <input
                  type="radio"
                  name="dateFormat"
                  value={dateFormat.value}
                  checked={settings.dateFormat === dateFormat.value}
                  onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value as any })}
                  className="mr-3 text-orange-500 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {dateFormat.label}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Example: {dateFormat.example}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <Settings className="w-4 h-4 inline mr-2" />
            Additional Options
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.includeHeaders}
                onChange={(e) => setSettings({ ...settings, includeHeaders: e.target.checked })}
                className="mr-3 text-orange-500 focus:ring-orange-500"
                disabled={settings.format === 'json'}
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Include Headers
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Add column headers to CSV exports (JSON always includes field names)
                </div>
              </div>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.includeMetadata}
                onChange={(e) => setSettings({ ...settings, includeMetadata: e.target.checked })}
                className="mr-3 text-orange-500 focus:ring-orange-500"
                disabled={settings.format === 'csv'}
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Include Metadata
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Add export timestamp and file information (JSON only)
                </div>
              </div>
            </label>

            <label className="flex items-center opacity-50">
              <input
                type="checkbox"
                checked={settings.compression}
                onChange={(e) => setSettings({ ...settings, compression: e.target.checked })}
                className="mr-3 text-orange-500 focus:ring-orange-500"
                disabled={true}
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Enable Compression
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Compress large exports (Coming Soon)
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Custom Filename */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Filename (Optional)
          </label>
          <input
            type="text"
            value={settings.filename || ''}
            onChange={(e) => setSettings({ ...settings, filename: e.target.value })}
            placeholder="Leave empty for auto-generated filename"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            File extension will be added automatically based on format
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className={`flex items-center ${
                saveStatus === 'success' 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : saveStatus === 'error'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-orange-600 hover:bg-orange-700'
              } text-white`}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : saveStatus === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Saved!
                </>
              ) : saveStatus === 'error' ? (
                <>
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Error
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium mb-1">Export Tips:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>JSON format preserves all data types and nested structures</li>
                <li>CSV format is best for importing into spreadsheet applications</li>
                <li>Large datasets may take a few moments to process</li>
                <li>Settings are automatically saved for future exports</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
