import { useState } from 'react';
import { Plus, Search, Mail, Play, Pause, Edit, Trash2, Clock } from 'lucide-react';

interface Sequence {
  id: string;
  name: string;
  description: string;
  steps: number;
  status: 'active' | 'paused' | 'draft';
  enrolled: number;
  replied: number;
  createdAt: string;
}

const mockSequences: Sequence[] = [
  {
    id: '1',
    name: 'Cold Outreach - Enterprise',
    description: 'Multi-touch sequence for enterprise prospects',
    steps: 5,
    status: 'active',
    enrolled: 87,
    replied: 23,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Demo Follow-up',
    description: 'Follow-up sequence after product demos',
    steps: 3,
    status: 'active',
    enrolled: 45,
    replied: 18,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Partner Outreach',
    description: 'Sequence for potential partnership opportunities',
    steps: 4,
    status: 'paused',
    enrolled: 32,
    replied: 8,
    createdAt: '2024-02-01'
  },
  {
    id: '4',
    name: 'Event Invitation',
    description: 'Invite prospects to upcoming webinar',
    steps: 2,
    status: 'draft',
    enrolled: 0,
    replied: 0,
    createdAt: '2024-02-10'
  }
];

export default function SequencesTab() {
  const [sequences, setSequences] = useState<Sequence[]>(mockSequences);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSequences = sequences.filter(seq =>
    seq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seq.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'draft':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this sequence?')) {
      setSequences(sequences.filter(seq => seq.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setSequences(sequences.map(seq => {
      if (seq.id === id) {
        return {
          ...seq,
          status: seq.status === 'active' ? 'paused' : 'active'
        };
      }
      return seq;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Email Sequences</h2>
          <p className="text-sm text-slate-600 mt-1">Automate your outreach with multi-step email sequences</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Create Sequence
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sequences..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredSequences.map((sequence) => (
            <div
              key={sequence.id}
              className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">{sequence.name}</h3>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(sequence.status)}`}>
                        {sequence.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mb-3">{sequence.description}</p>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-sm text-slate-700">{sequence.steps} steps</span>
                      </div>
                      <div className="text-sm text-slate-700">
                        <span className="font-medium">{sequence.enrolled}</span> enrolled
                      </div>
                      <div className="text-sm text-slate-700">
                        <span className="font-medium text-green-600">{sequence.replied}</span> replied
                        {sequence.enrolled > 0 && (
                          <span className="text-slate-500 ml-1">
                            ({Math.round((sequence.replied / sequence.enrolled) * 100)}%)
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        Created {new Date(sequence.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {sequence.status !== 'draft' && (
                    <button
                      onClick={() => toggleStatus(sequence.id)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      title={sequence.status === 'active' ? 'Pause sequence' : 'Resume sequence'}
                    >
                      {sequence.status === 'active' ? (
                        <Pause className="w-5 h-5 text-slate-600" />
                      ) : (
                        <Play className="w-5 h-5 text-slate-600" />
                      )}
                    </button>
                  )}
                  <button
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit sequence"
                  >
                    <Edit className="w-5 h-5 text-slate-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(sequence.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete sequence"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSequences.length === 0 && (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600">No sequences found</p>
          </div>
        )}
      </div>
    </div>
  );
}
