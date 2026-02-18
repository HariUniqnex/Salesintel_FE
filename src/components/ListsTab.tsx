import { useState } from 'react';
import { Plus, Search, Users, Trash2, Edit, Download } from 'lucide-react';

interface SavedList {
  id: string;
  name: string;
  description: string;
  contactCount: number;
  createdAt: string;
  updatedAt: string;
}

const mockLists: SavedList[] = [
  {
    id: '1',
    name: 'Enterprise Decision Makers',
    description: 'VPs and Directors at Fortune 500 companies',
    contactCount: 142,
    createdAt: '2024-01-15',
    updatedAt: '2024-02-10'
  },
  {
    id: '2',
    name: 'Tech Startup Founders',
    description: 'Founders and CEOs of tech startups with Series A+ funding',
    contactCount: 87,
    createdAt: '2024-01-20',
    updatedAt: '2024-02-12'
  },
  {
    id: '3',
    name: 'Marketing Leaders',
    description: 'CMOs and VPs of Marketing in SaaS companies',
    contactCount: 215,
    createdAt: '2024-02-01',
    updatedAt: '2024-02-15'
  },
  {
    id: '4',
    name: 'Sales Executives - Healthcare',
    description: 'Sales leadership in healthcare technology companies',
    contactCount: 63,
    createdAt: '2024-02-05',
    updatedAt: '2024-02-14'
  }
];

export default function ListsTab() {
  const [lists, setLists] = useState<SavedList[]>(mockLists);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newList, setNewList] = useState({ name: '', description: '' });

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateList = () => {
    if (newList.name.trim()) {
      const list: SavedList = {
        id: String(lists.length + 1),
        name: newList.name,
        description: newList.description,
        contactCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setLists([...lists, list]);
      setNewList({ name: '', description: '' });
      setShowCreateModal(false);
    }
  };

  const handleDeleteList = (id: string) => {
    if (confirm('Are you sure you want to delete this list?')) {
      setLists(lists.filter(list => list.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Saved Lists</h2>
          <p className="text-sm text-slate-600 mt-1">Organize and manage your contact lists</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create List
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
              placeholder="Search lists..."
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredLists.map((list) => (
            <div
              key={list.id}
              className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{list.name}</h3>
                    <p className="text-xs text-slate-500">{list.contactCount} contacts</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit list"
                  >
                    <Edit className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteList(list.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete list"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4">{list.description}</p>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Updated {new Date(list.updatedAt).toLocaleDateString()}</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredLists.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600">No lists found</p>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Create New List</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  List Name
                </label>
                <input
                  type="text"
                  value={newList.name}
                  onChange={(e) => setNewList({ ...newList, name: e.target.value })}
                  placeholder="e.g., Enterprise Decision Makers"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newList.description}
                  onChange={(e) => setNewList({ ...newList, description: e.target.value })}
                  placeholder="Describe this list..."
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateList}
                disabled={!newList.name.trim()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
