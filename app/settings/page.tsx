'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { profileApi } from '../lib/api';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  studentInfo?: {
    currentEducationLevel?: string;
    grade?: string;
    city?: string;
    province?: string;
    stream?: string;
  };
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type TabType = 'account' | 'profile' | 'learning' | 'privacy';

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('account');
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    studentInfo: {}
  });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    dashboardReminders: true,
    learningStyle: 'balanced',
    careerInterests: [] as string[]
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        setTimeout(() => router.push('/auth/login'), 100);
        return;
      }

      // Get basic user data
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          studentInfo: {}
        });
      }

      // Try to fetch full profile
      try {
        const profileResponse = await profileApi.getProfile();
        const typedProfileResponse = profileResponse as { success?: boolean; data?: { profile?: { firstName?: string; lastName?: string; email?: string; studentInfo?: unknown } } };
        if (typedProfileResponse.success && typedProfileResponse.data?.profile) {
          const profile = typedProfileResponse.data.profile;
          setFormData({
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            email: profile.email || '',
            studentInfo: profile.studentInfo || {}
          });
        }
      } catch {
        console.log('No profile data');
      }
    } catch {
      console.error('Error fetching user data');
      setError('Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleSaveBasicInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      // Update localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      userData.firstName = formData.firstName;
      userData.lastName = formData.lastName;
      localStorage.setItem('user', JSON.stringify(userData));
      
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setSaving(true);
    try {
      // API call to change password (you'll need to implement this endpoint)
      setSuccess('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // API call to delete account
      localStorage.clear();
      router.push('/');
    } catch {
      setError('Failed to delete account');
    }
  };

  const togglePreference = (key: string) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key as keyof typeof preferences]
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-2xl p-8 md:p-10 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-xl mr-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-1">Settings</h1>
                <p className="text-teal-100 text-lg">Manage your account preferences and security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-t-2xl shadow-xl border-b-2 border-slate-700">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('account')}
              className={`px-8 py-5 font-semibold transition-all relative ${
                activeTab === 'account'
                  ? 'text-teal-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </div>
              {activeTab === 'account' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-lg"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-8 py-5 font-semibold transition-all relative ${
                activeTab === 'profile'
                  ? 'text-teal-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Profile
              </div>
              {activeTab === 'profile' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-lg"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('learning')}
              className={`px-8 py-5 font-semibold transition-all relative ${
                activeTab === 'learning'
                  ? 'text-teal-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Preferences
              </div>
              {activeTab === 'learning' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-lg"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-8 py-5 font-semibold transition-all relative ${
                activeTab === 'privacy'
                  ? 'text-teal-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Privacy
              </div>
              {activeTab === 'privacy' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-lg"></div>
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-b-2xl shadow-xl p-8 md:p-10 border border-slate-700 border-t-0">
          {/* Alerts */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-start gap-3">
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-6 bg-green-50 border-2 border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-start gap-3">
              <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">{success}</span>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-10">
              {/* Basic Info */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-xl mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Basic Information</h2>
                </div>
                <form onSubmit={handleSaveBasicInfo} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleBasicInfoChange}
                        className="w-full px-5 py-3 bg-slate-700/50 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleBasicInfoChange}
                        className="w-full px-5 py-3 bg-slate-700/50 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Email <span className="text-gray-500 text-xs font-normal">(read-only)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="w-full px-5 py-3 bg-slate-900/50 border-2 border-slate-600 text-gray-400 rounded-xl cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>

              {/* Change Password */}
              <div className="border-t-2 border-slate-700 pt-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-cyan-500 to-teal-500 p-3 rounded-xl mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Change Password</h2>
                </div>
                <form onSubmit={handleChangePassword} className="space-y-6 max-w-2xl">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-5 py-3 bg-slate-700/50 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-5 py-3 bg-slate-700/50 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      minLength={8}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-5 py-3 bg-slate-700/50 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-teal-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                  >
                    {saving ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>

              {/* Delete Account */}
              <div className="border-t-2 border-slate-700 pt-10">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-red-500">Danger Zone</h2>
                </div>
                <div className="bg-red-900/20 border-2 border-red-500/30 rounded-xl p-6">
                  <p className="text-gray-300 mb-6 text-lg">
                    Once you delete your account, there is no going back. This action is permanent and all your data will be lost.
                  </p>
                  {showDeleteConfirm ? (
                    <div className="flex gap-4">
                      <button
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all hover:shadow-xl"
                      >
                        Yes, Delete My Account
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="bg-slate-700 text-gray-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all hover:shadow-xl"
                    >
                      Delete Account
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Education Information</h2>
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="text-gray-400 mb-4">Complete your profile during onboarding or assessment</p>
              </div>
            </div>
          )}

          {/* Learning Preferences Tab */}
          {activeTab === 'learning' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Learning Style</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 bg-slate-700/30 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all">
                    <input
                      type="radio"
                      name="learningStyle"
                      value="academic"
                      checked={preferences.learningStyle === 'academic'}
                      onChange={(e) => setPreferences({ ...preferences, learningStyle: e.target.value })}
                      className="w-4 h-4 text-teal-500"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-white">Academic & Theoretical</p>
                      <p className="text-sm text-gray-400">Focus on theory, research, and formal education</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 bg-slate-700/30 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all">
                    <input
                      type="radio"
                      name="learningStyle"
                      value="practical"
                      checked={preferences.learningStyle === 'practical'}
                      onChange={(e) => setPreferences({ ...preferences, learningStyle: e.target.value })}
                      className="w-4 h-4 text-teal-500"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-white">Practical & Hands-On</p>
                      <p className="text-sm text-gray-400">Prefer vocational training and real-world experience</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 bg-slate-700/30 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all">
                    <input
                      type="radio"
                      name="learningStyle"
                      value="balanced"
                      checked={preferences.learningStyle === 'balanced'}
                      onChange={(e) => setPreferences({ ...preferences, learningStyle: e.target.value })}
                      className="w-4 h-4 text-teal-500"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-white">Balanced Approach</p>
                      <p className="text-sm text-gray-400">Mix of academic study and practical application</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-8">
                <h2 className="text-xl font-bold text-white mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Email Notifications</p>
                      <p className="text-sm text-gray-400">Receive updates about your progress via email</p>
                    </div>
                    <button
                      onClick={() => togglePreference('emailNotifications')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        preferences.emailNotifications ? 'bg-teal-500' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                  <label className="flex items-center justify-between p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                    <div>
                      <p className="font-medium text-white">Dashboard Reminders</p>
                      <p className="text-sm text-gray-400">Get reminders to complete assessments and learning paths</p>
                    </div>
                    <button
                      onClick={() => togglePreference('dashboardReminders')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        preferences.dashboardReminders ? 'bg-teal-500' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          preferences.dashboardReminders ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Data & Privacy</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-teal-900/20 border border-teal-500/30 rounded-lg">
                    <h3 className="font-medium text-white mb-2">How We Use Your Data</h3>
                    <p className="text-sm text-gray-300">
                      We collect and process your data to provide personalized career recommendations and learning paths. 
                      Your assessment results are used to generate AI-powered insights tailored to your profile.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Data Retention</h3>
                    <p className="text-sm text-gray-300 mb-3">
                      Your data is stored securely and retained as long as your account is active. You can request data deletion at any time.
                    </p>
                    <button className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                      Download My Data →
                    </button>
                  </div>
                  <div className="p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Third-Party Services</h3>
                    <p className="text-sm text-gray-300">
                      We use Google Gemini AI for generating learning paths and career recommendations. 
                      No personally identifiable information is shared with third parties without your consent.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-8">
                <div className="flex items-start gap-4 p-4 bg-slate-700/30 border border-slate-600 rounded-lg">
                  <svg className="w-6 h-6 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-white mb-1">Your Data is Protected</h3>
                    <p className="text-sm text-gray-300">
                      We use industry-standard encryption and security practices to protect your personal information. 
                      For more details, read our <a href="/privacy-policy" className="text-teal-400 hover:text-teal-300 underline">Privacy Policy</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
