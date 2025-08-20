// Export service for admin panel data export functionality
import { databaseService } from './httpClient';

export interface ExportSettings {
  format: 'json' | 'csv' | 'xlsx' | 'pdf';
  includeHeaders: boolean;
  dateFormat: 'iso' | 'local' | 'timestamp';
  includeMetadata: boolean;
  compression: boolean;
  filename?: string;
}

export interface ExportData {
  data: any[];
  filename: string;
  type: string;
  timestamp: string;
}

class ExportService {
  private defaultSettings: ExportSettings = {
    format: 'json',
    includeHeaders: true,
    dateFormat: 'iso',
    includeMetadata: true,
    compression: false
  };

  // Get export settings from localStorage or use defaults
  getExportSettings(): ExportSettings {
    try {
      const saved = localStorage.getItem('assetmagnets_export_settings');
      return saved ? { ...this.defaultSettings, ...JSON.parse(saved) } : this.defaultSettings;
    } catch {
      return this.defaultSettings;
    }
  }

  // Save export settings to localStorage
  saveExportSettings(settings: Partial<ExportSettings>): void {
    try {
      const current = this.getExportSettings();
      const updated = { ...current, ...settings };
      localStorage.setItem('assetmagnets_export_settings', JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save export settings:', error);
    }
  }

  // Format date according to settings
  private formatDate(date: string | Date, format: 'iso' | 'local' | 'timestamp'): string {
    const d = new Date(date);
    switch (format) {
      case 'iso':
        return d.toISOString();
      case 'local':
        return d.toLocaleString();
      case 'timestamp':
        return d.getTime().toString();
      default:
        return d.toISOString();
    }
  }

  // Clean and format data for export
  private formatDataForExport(data: any[], settings: ExportSettings): any[] {
    return data.map(item => {
      const formatted = { ...item };
      
      // Format dates
      Object.keys(formatted).forEach(key => {
        if (key.includes('At') || key.includes('Date') || key === 'timestamp') {
          if (formatted[key]) {
            formatted[key] = this.formatDate(formatted[key], settings.dateFormat);
          }
        }
      });

      return formatted;
    });
  }

  // Generate filename with timestamp
  private generateFilename(type: string, format: string, customName?: string): string {
    const timestamp = new Date().toISOString().split('T')[0];
    const baseName = customName || `assetmagnets_${type}_export_${timestamp}`;
    return `${baseName}.${format}`;
  }

  // Convert data to JSON format
  private exportAsJSON(data: any[], settings: ExportSettings): string {
    const exportData: ExportData = {
      data: this.formatDataForExport(data, settings),
      filename: this.generateFilename('data', 'json', settings.filename),
      type: 'JSON Export',
      timestamp: new Date().toISOString()
    };

    if (settings.includeMetadata) {
      return JSON.stringify(exportData, null, 2);
    } else {
      return JSON.stringify(exportData.data, null, 2);
    }
  }

  // Convert data to CSV format
  private exportAsCSV(data: any[], settings: ExportSettings): string {
    if (data.length === 0) return '';

    const formattedData = this.formatDataForExport(data, settings);
    const headers = Object.keys(formattedData[0]);
    
    let csv = '';
    
    // Add headers if enabled
    if (settings.includeHeaders) {
      csv += headers.join(',') + '\n';
    }

    // Add data rows
    formattedData.forEach(row => {
      const values = headers.map(header => {
        let value = row[header];
        
        // Handle different data types
        if (value === null || value === undefined) {
          value = '';
        } else if (typeof value === 'object') {
          value = JSON.stringify(value);
        } else {
          value = String(value);
        }
        
        // Escape quotes and wrap in quotes if contains comma or quote
        if (value.includes(',') || value.includes('"') || value.includes('\n')) {
          value = '"' + value.replace(/"/g, '""') + '"';
        }
        
        return value;
      });
      
      csv += values.join(',') + '\n';
    });

    return csv;
  }

  // Download file
  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Main export function
  async exportData(type: 'services' | 'users' | 'courses' | 'jobs' | 'contact-messages' | 'contact-info' | 'global-offices' | 'faqs' | 'all', customSettings?: Partial<ExportSettings>): Promise<void> {
    try {
      const settings = { ...this.getExportSettings(), ...customSettings };
      let data: any[] = [];
      let filename = '';

      // Fetch data based on type
      switch (type) {
        case 'services':
          data = await databaseService.getServices();
          filename = this.generateFilename('services', settings.format, settings.filename);
          break;
        case 'users':
          data = await databaseService.getUsers();
          filename = this.generateFilename('users', settings.format, settings.filename);
          break;
        case 'courses':
          data = await databaseService.getCourses();
          filename = this.generateFilename('courses', settings.format, settings.filename);
          break;
        case 'jobs':
          data = await databaseService.getJobs();
          filename = this.generateFilename('jobs', settings.format, settings.filename);
          break;
        case 'contact-messages':
          data = await databaseService.getContactMessages();
          filename = this.generateFilename('contact_messages', settings.format, settings.filename);
          break;
        case 'contact-info':
          data = await databaseService.getContactInfo();
          filename = this.generateFilename('contact_info', settings.format, settings.filename);
          break;
        case 'global-offices':
          data = await databaseService.getGlobalOffices();
          filename = this.generateFilename('global_offices', settings.format, settings.filename);
          break;
        case 'faqs':
          data = await databaseService.getFAQs();
          filename = this.generateFilename('faqs', settings.format, settings.filename);
          break;
        case 'all':
          const allData = {
            services: await databaseService.getServices(),
            users: await databaseService.getUsers(),
            courses: await databaseService.getCourses(),
            jobs: await databaseService.getJobs(),
            contactMessages: await databaseService.getContactMessages(),
            contactInfo: await databaseService.getContactInfo(),
            globalOffices: await databaseService.getGlobalOffices(),
            faqs: await databaseService.getFAQs()
          };
          data = [allData]; // Wrap in array for consistent processing
          filename = this.generateFilename('complete_database', settings.format, settings.filename);
          break;
        default:
          throw new Error(`Unsupported export type: ${type}`);
      }

      // Generate content based on format
      let content = '';
      let mimeType = '';

      switch (settings.format) {
        case 'json':
          content = this.exportAsJSON(data, settings);
          mimeType = 'application/json';
          break;
        case 'csv':
          if (type === 'all') {
            throw new Error('CSV format is not supported for complete database export. Please use JSON format.');
          }
          content = this.exportAsCSV(data, settings);
          mimeType = 'text/csv';
          break;
        case 'xlsx':
          throw new Error('XLSX format is not yet implemented. Please use JSON or CSV format.');
        case 'pdf':
          throw new Error('PDF format is not yet implemented. Please use JSON or CSV format.');
        default:
          throw new Error(`Unsupported export format: ${settings.format}`);
      }

      // Download the file
      this.downloadFile(content, filename, mimeType);
      
      console.log(`✅ Export completed: ${filename}`);
      
    } catch (error) {
      console.error('❌ Export failed:', error);
      throw error;
    }
  }

  // Get available export formats
  getAvailableFormats(): Array<{ value: string; label: string; description: string }> {
    return [
      { value: 'json', label: 'JSON', description: 'JavaScript Object Notation - Best for data interchange' },
      { value: 'csv', label: 'CSV', description: 'Comma Separated Values - Best for spreadsheet applications' },
      { value: 'xlsx', label: 'Excel', description: 'Microsoft Excel format (Coming Soon)' },
      { value: 'pdf', label: 'PDF', description: 'Portable Document Format (Coming Soon)' }
    ];
  }

  // Get available date formats
  getDateFormats(): Array<{ value: string; label: string; example: string }> {
    const now = new Date();
    return [
      { value: 'iso', label: 'ISO 8601', example: now.toISOString() },
      { value: 'local', label: 'Local Format', example: now.toLocaleString() },
      { value: 'timestamp', label: 'Unix Timestamp', example: now.getTime().toString() }
    ];
  }
}

export const exportService = new ExportService();
