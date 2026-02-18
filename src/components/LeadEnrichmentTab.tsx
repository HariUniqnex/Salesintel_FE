import { useState } from 'react';
import { Search, Edit, Save, X, User, Building2, Mail, Phone, MapPin, Briefcase, Tag, CheckCircle, AlertCircle } from 'lucide-react';

interface LeadData {
  id: string;
  type: 'person' | 'company';
  name: string;
  email?: string;
  phone?: string;
  title?: string;
  company?: string;
  industry?: string;
  location?: string;
  keywords?: string[];
  completeness: number;
  lastUpdated: string;
}

const mockLeads: LeadData[] = [
  {
    id: '1',
    type: 'person',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (415) 555-0123',
    title: 'VP of Marketing',
    company: 'TechCorp Inc',
    industry: 'Software',
    location: 'San Francisco, CA',
    keywords: ['B2B Marketing', 'SaaS'],
    completeness: 90,
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    type: 'person',
    name: 'Michael Chen',
    email: 'michael.chen@innovatehub.com',
    title: 'Director of Sales',
    company: 'InnovateHub',
    industry: 'Technology',
    location: 'New York, NY',
    keywords: ['Enterprise Sales'],
    completeness: 65,
    lastUpdated: '2024-01-14'
  },
  {
    id: '3',
    type: 'company',
    name: 'TechCorp Inc',
    email: 'info@techcorp.com',
    phone: '+1 (415) 555-0100',
    industry: 'Software',
    location: 'San Francisco, CA',
    completeness: 85,
    lastUpdated: '2024-01-15'
  },
  {
    id: '4',
    type: 'person',
    name: 'Emily Rodriguez',
    email: 'e.rodriguez@datasphere.io',
    phone: '+1 (512) 555-0189',
    title: 'Chief Technology Officer',
    company: 'DataSphere',
    industry: 'Data Analytics',
    completeness: 50,
    lastUpdated: '2024-01-13'
  },
  {
    id: '5',
    type: 'company',
    name: 'InnovateHub',
    email: 'contact@innovatehub.com',
    phone: '+1 (212) 555-0200',
    industry: 'Technology',
    location: 'New York, NY',
    completeness: 75,
    lastUpdated: '2024-01-14'
  }
];

export default function LeadEnrichmentTab() {
  const [leads, setLeads] = useState(mockLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'person' | 'company'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<LeadData | null>(null);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchQuery === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'all' || lead.type === filterType;

    return matchesSearch && matchesType;
  });

  const startEdit = (lead: LeadData) => {
    setEditingId(lead.id);
    setEditData({ ...lead });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const saveEdit = () => {
    if (editData) {
      setLeads(prev => prev.map(lead =>
        lead.id === editData.id ? { ...editData, lastUpdated: new Date().toISOString().split('T')[0] } : lead
      ));
      setEditingId(null);
      setEditData(null);
    }
  };

  const updateEditField = (field: keyof LeadData, value: any) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  const getCompletenessColor = (completeness: number) => {
    if (completeness >= 80) return 'text-green-600 bg-green-100';
    if (completeness >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Lead Enrichment</h2>
        <p className="text-sm text-slate-600 mt-1">Edit and enhance your lead data to improve coverage and quality</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads by name, email, or company..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('person')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'person'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              People
            </button>
            <button
              onClick={() => setFilterType('company')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterType === 'company'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Companies
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredLeads.map((lead) => {
            const isEditing = editingId === lead.id;
            const currentData = isEditing && editData ? editData : lead;

            return (
              <div key={lead.id} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${
                    lead.type === 'person'
                      ? 'bg-gradient-to-br from-green-400 to-green-600'
                      : 'bg-gradient-to-br from-blue-400 to-blue-600'
                  }`}>
                    {lead.type === 'person' ? <User className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        {isEditing ? (
                          <input
                            type="text"
                            value={currentData.name}
                            onChange={(e) => updateEditField('name', e.target.value)}
                            className="text-lg font-semibold text-slate-900 border border-slate-300 rounded px-2 py-1 w-full mb-2"
                          />
                        ) : (
                          <h3 className="text-lg font-semibold text-slate-900">{lead.name}</h3>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            lead.type === 'person' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {lead.type === 'person' ? 'Person' : 'Company'}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCompletenessColor(lead.completeness)}`}>
                            {lead.completeness}% complete
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={saveEdit}
                              className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="flex items-center gap-1 px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEdit(lead)}
                            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {lead.type === 'person' && (
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          {isEditing ? (
                            <input
                              type="text"
                              value={currentData.title || ''}
                              onChange={(e) => updateEditField('title', e.target.value)}
                              placeholder="Title"
                              className="text-sm text-slate-700 border border-slate-300 rounded px-2 py-1 flex-1"
                            />
                          ) : (
                            <span className="text-sm text-slate-700">{lead.title || 'N/A'}</span>
                          )}
                        </div>
                      )}

                      {lead.type === 'person' && (
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          {isEditing ? (
                            <input
                              type="text"
                              value={currentData.company || ''}
                              onChange={(e) => updateEditField('company', e.target.value)}
                              placeholder="Company"
                              className="text-sm text-slate-700 border border-slate-300 rounded px-2 py-1 flex-1"
                            />
                          ) : (
                            <span className="text-sm text-slate-700">{lead.company || 'N/A'}</span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        {isEditing ? (
                          <input
                            type="email"
                            value={currentData.email || ''}
                            onChange={(e) => updateEditField('email', e.target.value)}
                            placeholder="Email"
                            className="text-sm text-slate-700 border border-slate-300 rounded px-2 py-1 flex-1"
                          />
                        ) : (
                          <span className="text-sm text-slate-700">{lead.email || 'N/A'}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        {isEditing ? (
                          <input
                            type="tel"
                            value={currentData.phone || ''}
                            onChange={(e) => updateEditField('phone', e.target.value)}
                            placeholder="Phone"
                            className="text-sm text-slate-700 border border-slate-300 rounded px-2 py-1 flex-1"
                          />
                        ) : (
                          <span className="text-sm text-slate-700">{lead.phone || 'N/A'}</span>
                        )}
                      </div>

                      {lead.industry && (
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          {isEditing ? (
                            <input
                              type="text"
                              value={currentData.industry || ''}
                              onChange={(e) => updateEditField('industry', e.target.value)}
                              placeholder="Industry"
                              className="text-sm text-slate-700 border border-slate-300 rounded px-2 py-1 flex-1"
                            />
                          ) : (
                            <span className="text-sm text-slate-700">{lead.industry}</span>
                          )}
                        </div>
                      )}

                      {lead.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          {isEditing ? (
                            <input
                              type="text"
                              value={currentData.location || ''}
                              onChange={(e) => updateEditField('location', e.target.value)}
                              placeholder="Location"
                              className="text-sm text-slate-700 border border-slate-300 rounded px-2 py-1 flex-1"
                            />
                          ) : (
                            <span className="text-sm text-slate-700">{lead.location}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {lead.keywords && lead.keywords.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {lead.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-500">
                      Last updated: {lead.lastUpdated}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600">No leads found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
