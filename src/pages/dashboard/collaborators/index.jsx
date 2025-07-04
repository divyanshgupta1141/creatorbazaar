import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CollaboratorsPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [collaborators, setCollaborators] = useState([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'editor'
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Load collaborators from localStorage
    const savedCollaborators = JSON.parse(localStorage.getItem('collaborators') || '[]');
    setCollaborators(savedCollaborators);
  }, []);

  const handleInvite = () => {
    if (inviteForm.email && inviteForm.role) {
      const newCollaborator = {
        id: Date.now().toString(),
        email: inviteForm.email,
        role: inviteForm.role,
        status: 'pending',
        invitedAt: new Date().toISOString()
      };
      
      const updated = [...collaborators, newCollaborator];
      setCollaborators(updated);
      localStorage.setItem('collaborators', JSON.stringify(updated));
      
      setInviteForm({ email: '', role: 'editor' });
      setShowInviteModal(false);
    }
  };

  const handleRemove = (collaboratorId) => {
    if (window.confirm('Are you sure you want to remove this collaborator?')) {
      const updated = collaborators.filter(c => c.id !== collaboratorId);
      setCollaborators(updated);
      localStorage.setItem('collaborators', JSON.stringify(updated));
    }
  };

  const roles = [
    { value: 'admin', label: 'Admin', description: 'Full access to all features' },
    { value: 'editor', label: 'Editor', description: 'Can edit products and view analytics' },
    { value: 'viewer', label: 'Viewer', description: 'View-only access' }
  ];

  return (
    <>
      <Helmet>
        <title>Collaborators - CreatorBazaar Dashboard</title>
      </Helmet>

      <DashboardLayout currentPage="collaborators">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Collaborators</h1>
              <p className="text-white/60">Invite and manage team members</p>
            </div>
            <Button
              variant="primary"
              onClick={() => setShowInviteModal(true)}
              iconName="UserPlus"
              iconPosition="left"
              className="bg-highlight hover:bg-highlight-600 text-black"
            >
              Invite Collaborator
            </Button>
          </div>

          {/* Collaborators List */}
          {collaborators.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Users" size={48} className="text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No collaborators yet</h3>
              <p className="text-white/60 mb-6">Invite team members to help manage your products</p>
              <Button
                variant="primary"
                onClick={() => setShowInviteModal(true)}
                iconName="UserPlus"
                iconPosition="left"
                className="bg-highlight hover:bg-highlight-600 text-black"
              >
                Invite First Collaborator
              </Button>
            </div>
          ) : (
            <div className="bg-dark-surface rounded-lg border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Team Members</h3>
              </div>
              <div className="divide-y divide-white/10">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} color="white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{collaborator.email}</div>
                        <div className="text-white/60 text-sm capitalize">{collaborator.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        collaborator.status === 'active' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {collaborator.status}
                      </div>
                      <button
                        onClick={() => handleRemove(collaborator.id)}
                        className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Invite Modal */}
          {showInviteModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-dark-surface rounded-lg border border-white/10 p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Invite Collaborator</h2>
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="collaborator@example.com"
                      value={inviteForm.email}
                      onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                      className="bg-dark-bg border-white/20 text-white placeholder-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Role
                    </label>
                    <select
                      value={inviteForm.role}
                      onChange={(e) => setInviteForm({...inviteForm, role: e.target.value})}
                      className="w-full px-4 py-2 bg-dark-bg border border-white/20 rounded-lg text-white"
                    >
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label} - {role.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowInviteModal(false)}
                      className="flex-1 border-white/20 text-white hover:bg-white/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleInvite}
                      className="flex-1 bg-highlight hover:bg-highlight-600 text-black"
                    >
                      Send Invite
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default CollaboratorsPage;