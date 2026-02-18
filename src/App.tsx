import { useState } from 'react';
import { Search, Building2, Users, List, Send, BarChart3, Settings, Sparkles } from 'lucide-react';
import SearchTab from './components/SearchTab';
import CompaniesTab from './components/CompaniesTab';
import ListsTab from './components/ListsTab';
import SequencesTab from './components/SequencesTab';
import AnalyticsTab from './components/AnalyticsTab';
import SettingsTab from './components/SettingsTab';
import LeadEnrichmentTab from './components/LeadEnrichmentTab';

type Tab = 'search' | 'companies' | 'lists' | 'enrichment' | 'sequences' | 'analytics' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('search');

  const tabs = [
    { id: 'search' as Tab, label: 'Search Leads', icon: Search },
    { id: 'companies' as Tab, label: 'Companies', icon: Building2 },
    { id: 'lists' as Tab, label: 'Lists', icon: List },
    { id: 'enrichment' as Tab, label: 'Lead Enrichment', icon: Sparkles },
    { id: 'sequences' as Tab, label: 'Sequences', icon: Send },
    { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart3 },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return <SearchTab />;
      case 'companies':
        return <CompaniesTab />;
      case 'lists':
        return <ListsTab />;
      case 'enrichment':
        return <LeadEnrichmentTab />;
      case 'sequences':
        return <SequencesTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <SearchTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">SalesIntel</h1>
                <p className="text-xs text-slate-500">B2B Sales Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">Available Credits</p>
                <p className="text-sm font-semibold text-slate-900">1,000</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
