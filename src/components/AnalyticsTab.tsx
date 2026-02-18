import { TrendingUp, Mail, Users, Send, Eye, MousePointer, MessageSquare } from 'lucide-react';

export default function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>
        <p className="text-sm text-slate-600 mt-1">Track your outreach performance and engagement metrics</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-green-600 font-medium">+12%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">2,847</p>
          <p className="text-sm text-slate-600">Emails Sent</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs text-green-600 font-medium">+8%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">58.3%</p>
          <p className="text-sm text-slate-600">Open Rate</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
              <MousePointer className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-xs text-green-600 font-medium">+15%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">23.7%</p>
          <p className="text-sm text-slate-600">Click Rate</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs text-green-600 font-medium">+5%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">8.9%</p>
          <p className="text-sm text-slate-600">Reply Rate</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Sequence Performance</h3>
          <div className="space-y-4">
            {[
              { name: 'Cold Outreach - Enterprise', sent: 87, opened: 54, replied: 23 },
              { name: 'Demo Follow-up', sent: 45, opened: 38, replied: 18 },
              { name: 'Partner Outreach', sent: 32, opened: 19, replied: 8 }
            ].map((seq, index) => (
              <div key={index} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900">{seq.name}</h4>
                  <span className="text-xs text-slate-500">{seq.sent} sent</span>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-slate-600">
                    <span className="font-medium text-green-600">{Math.round((seq.opened / seq.sent) * 100)}%</span> opened
                  </span>
                  <span className="text-slate-600">
                    <span className="font-medium text-blue-600">{Math.round((seq.replied / seq.sent) * 100)}%</span> replied
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: 'Email opened', contact: 'Sarah Johnson', time: '5 min ago', type: 'open' },
              { action: 'Email replied', contact: 'Michael Chen', time: '12 min ago', type: 'reply' },
              { action: 'Link clicked', contact: 'Emily Rodriguez', time: '25 min ago', type: 'click' },
              { action: 'Email sent', contact: 'David Kim', time: '1 hour ago', type: 'sent' },
              { action: 'Email opened', contact: 'Jennifer Martinez', time: '2 hours ago', type: 'open' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'reply' ? 'bg-purple-100' :
                  activity.type === 'open' ? 'bg-green-100' :
                  activity.type === 'click' ? 'bg-blue-100' :
                  'bg-slate-100'
                }`}>
                  {activity.type === 'reply' ? <MessageSquare className="w-4 h-4 text-purple-600" /> :
                   activity.type === 'open' ? <Eye className="w-4 h-4 text-green-600" /> :
                   activity.type === 'click' ? <MousePointer className="w-4 h-4 text-blue-600" /> :
                   <Send className="w-4 h-4 text-slate-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <p className="text-xs text-slate-500">{activity.contact}</p>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performing Contacts</h3>
        <div className="space-y-3">
          {[
            { name: 'Sarah Johnson', company: 'TechCorp Inc', engagement: 95, replies: 3 },
            { name: 'Michael Chen', company: 'InnovateHub', engagement: 87, replies: 2 },
            { name: 'Emily Rodriguez', company: 'DataSphere', engagement: 82, replies: 2 },
            { name: 'David Kim', company: 'CloudNine Systems', engagement: 76, replies: 1 },
            { name: 'Jennifer Martinez', company: 'Enterprise Solutions', engagement: 71, replies: 1 }
          ].map((contact, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">{contact.name}</p>
                <p className="text-sm text-slate-600">{contact.company}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{contact.engagement}% engaged</p>
                <p className="text-xs text-slate-500">{contact.replies} replies</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
