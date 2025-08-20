import React, { useState, useEffect } from 'react';
import { Database, Download, RefreshCw, Eye, EyeOff, Server } from 'lucide-react';
import { Card, Button } from '../../components/ui';
import { databaseService } from '../../services/httpClient';

export default function DatabaseViewer() {
  const [data, setData] = useState<any>({});
  const [selectedTable, setSelectedTable] = useState<string>('services');
  const [showRawData, setShowRawData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const tables = [
    { key: 'services', name: 'Services', icon: '🛠️' },
    { key: 'contactMessages', name: 'Contact Messages', icon: '📧' },
    { key: 'contactInfo', name: 'Contact Info', icon: '📞' },
    { key: 'globalOffices', name: 'Global Offices', icon: '🌍' },
    { key: 'faqs', name: 'FAQs', icon: '❓' },
    { key: 'users', name: 'Users', icon: '👥' },
    { key: 'courses', name: 'Courses', icon: '📚' },
    { key: 'jobs', name: 'Jobs', icon: '💼' }
  ];

  const loadData = async () => {
    setIsLoading(true);
    try {
      const allData = {
        services: await databaseService.getServices(),
        contactMessages: await databaseService.getContactMessages(),
        contactInfo: await databaseService.getContactInfo(),
        globalOffices: await databaseService.getGlobalOffices(),
        faqs: await databaseService.getFAQs(),
        users: await databaseService.getUsers(),
        courses: await databaseService.getCourses(),
        jobs: await databaseService.getJobs()
      };
      setData(allData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'assetmagnets_database_export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const getTableStats = (tableKey: string) => {
    const tableData = data[tableKey] || [];
    return {
      total: tableData.length,
      active: tableData.filter((item: any) => item.isActive !== false).length,
      inactive: tableData.filter((item: any) => item.isActive === false).length
    };
  };

  const renderTableData = (tableKey: string) => {
    const tableData = data[tableKey] || [];
    
    if (showRawData) {
      return (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto text-xs max-h-96">
          {JSON.stringify(tableData, null, 2)}
        </pre>
      );
    }

    if (tableData.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No data found in this table
        </div>
      );
    }

    return (
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {tableData.map((item: any, index: number) => (
          <Card key={item.id || index} className="p-4 bg-white dark:bg-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {Object.entries(item).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </span>
                  <div className="text-gray-600 dark:text-gray-400">
                    {typeof value === 'object' && value !== null ? (
                      <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    ) : typeof value === 'boolean' ? (
                      <span className={`px-2 py-1 rounded text-xs ${
                        value 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {value ? 'True' : 'False'}
                      </span>
                    ) : (
                      <span className="break-words">{String(value)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Database className="w-6 h-6 mr-2" />
            PostgreSQL Database Viewer
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Server className="w-4 h-4 mr-1" />
            Connected to Neon PostgreSQL Database
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRawData(!showRawData)}
          >
            {showRawData ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showRawData ? 'Formatted View' : 'Raw JSON'}
          </Button>
          <Button variant="outline" size="sm" onClick={loadData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Database Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {tables.map((table) => {
          const stats = getTableStats(table.key);
          return (
            <div
              key={table.key}
              className="cursor-pointer"
              onClick={() => setSelectedTable(table.key)}
            >
              <Card
                className={`p-4 transition-all ${
                  selectedTable === table.key
                    ? 'ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'hover:shadow-md'
                }`}
              >
              <div className="text-center">
                <div className="text-2xl mb-2">{table.icon}</div>
                <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                  {table.name}
                </h3>
                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {stats.total}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stats.active} active, {stats.inactive} inactive
                </p>
              </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Selected Table Data */}
      <Card className="p-6 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {tables.find(t => t.key === selectedTable)?.name} Data
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {(data[selectedTable] || []).length} records
          </div>
        </div>
        
        {renderTableData(selectedTable)}
      </Card>

      {/* Database Schema Info */}
      <Card className="p-6 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Database Schema Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Database Type</h3>
            <p className="text-gray-600 dark:text-gray-400">PostgreSQL (Neon)</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">ORM</h3>
            <p className="text-gray-600 dark:text-gray-400">Prisma</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Total Tables</h3>
            <p className="text-gray-600 dark:text-gray-400">{tables.length}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Total Records</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {Object.values(data).reduce((total: number, tableData: any) => total + (tableData?.length || 0), 0)}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
