import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Trash2, Users, BarChart3 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Configure axios base URL - empty string for same domain (Vercel rewrites handle /api routes)
axios.defaults.baseURL = '';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({ total: 0, byDomain: [] });
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const domains = ['all', 'Students Technical Council', 'Matrix Studio', 'Management', 'Students Editorial Council', 'Social Media'];

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, domainFilter]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/api/applications');
      if (response.data.success) {
        setApplications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/applications/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.branch.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Domain filter
    if (domainFilter !== 'all') {
      filtered = filtered.filter(app => app.domain === domainFilter);
    }

    setFilteredApplications(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      const response = await axios.delete(`/api/applications/${id}`);
      if (response.data.success) {
        setApplications(prev => prev.filter(app => app._id !== id));
        toast.success('Application deleted successfully');
        setShowModal(false);
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Failed to delete application');
    }
  };

  const viewApplication = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-white">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            MATRIX Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage recruitment applications</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="glass-red rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-blue-400">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          {stats.byDomain.slice(0, 3).map((domain, index) => (
            <div key={domain._id} className="glass rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">{domain._id}</p>
                  <p className="text-2xl font-bold text-white">{domain.count}</p>
                </div>
                <BarChart3 className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or branch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              />
            </div>

            {/* Domain Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="pl-10 pr-8 py-3 bg-black/50 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none appearance-none min-w-[150px]"
              >
                {domains.map(domain => (
                  <option key={domain} value={domain}>
                    {domain === 'all' ? 'All Domains' : domain}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-400">
              Showing {currentItems.length} of {filteredApplications.length} applications
            </p>
          </div>
        </motion.div>

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Domain</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Branch</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Applied</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {currentItems.map((application) => (
                  <motion.tr
                    key={application._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: 'rgba(225, 6, 0, 0.05)' }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {application.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {application.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                        {application.domain}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {application.branch} - Sem {application.semester}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {formatDate(application.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewApplication(application)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                          title="View Application"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(application._id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                          title="Delete Application"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-700 flex justify-center">
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    } transition-colors`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Application Detail Modal */}
        {showModal && selectedApplication && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-red rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-400">
                  Application Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Full Name</label>
                    <p className="text-white font-medium">{selectedApplication.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Phone</label>
                    <p className="text-white">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Branch & Semester</label>
                    <p className="text-white">{selectedApplication.branch} - Semester {selectedApplication.semester}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Domain</label>
                    <p className="text-blue-400 font-medium">{selectedApplication.domain}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Submission Links</label>
                    <div className="space-y-2">
                      {selectedApplication.submissionLink.split(', ').map((link, index) => (
                        <a
                          key={index}
                          href={link.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-400 hover:text-blue-300 break-all text-sm bg-black/30 p-2 rounded"
                        >
                          {link.trim()}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Why should we recruit you?</label>
                    <p className="text-white text-sm leading-relaxed bg-black/30 p-3 rounded-lg">
                      {selectedApplication.whyRecruit}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Leader or Team Player?</label>
                    <p className="text-white text-sm leading-relaxed bg-black/30 p-3 rounded-lg">
                      {selectedApplication.leaderOrTeamPlayer}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Conflict Handling</label>
                    <p className="text-white text-sm leading-relaxed bg-black/30 p-3 rounded-lg">
                      {selectedApplication.conflictHandling}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Applied On</label>
                    <p className="text-white">{formatDate(selectedApplication.createdAt)}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(selectedApplication._id)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;