"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useResumeContext, Profile } from "@/context/ResumeContext";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-hot-toast";

interface ResumeStats {
  totalResumes: number;
  lastUploadDate: string;
}

const ProfilePage = () => {
  const { isSignedIn, user } = useUser();
  const { 
    getResumeStats, 
    loading: contextLoading,
    profiles,
    activeProfileId,
    setActiveProfile,
    addProfile,
    deleteProfile
  } = useResumeContext();
  const [stats, setStats] = useState<ResumeStats>({
    totalResumes: 0,
    lastUploadDate: "-",
  });
  const [loading, setLoading] = useState(true);
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [newProfileDescription, setNewProfileDescription] = useState("");

  useEffect(() => {
    // Check if user is signed in
    if (!isSignedIn) {
      redirect("/");
    }

    if (!contextLoading) {
      const currentStats = getResumeStats();
      setStats(currentStats);
      setLoading(false);
    }
  }, [isSignedIn, contextLoading, getResumeStats, activeProfileId]);

  const handleProfileSelect = (profileId: string) => {
    setActiveProfile(profileId);
    toast.success("Profile selected");
    
    // Update stats for the new profile
    const currentStats = getResumeStats();
    setStats(currentStats);
  };

  const handleCreateProfile = () => {
    if (!newProfileName.trim()) {
      toast.error("Please enter a profile name");
      return;
    }
    
    const newProfile: Profile = {
      id: uuidv4(),
      name: newProfileName,
      description: newProfileDescription || "Resume profile",
      createdDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    
    addProfile(newProfile);
    setActiveProfile(newProfile.id);
    setNewProfileName("");
    setNewProfileDescription("");
    setShowCreateProfile(false);
    toast.success("Profile created successfully");
    
    // Update stats for the new profile
    const currentStats = getResumeStats();
    setStats(currentStats);
  };

  const handleDeleteProfile = (profileId: string) => {
    if (profiles.length <= 1) {
      toast.error("Cannot delete the only profile");
      return;
    }
    
    deleteProfile(profileId);
    toast.success("Profile deleted");
    
    // Update stats for the new active profile
    const currentStats = getResumeStats();
    setStats(currentStats);
  };

  if (!isSignedIn) return null;

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container px-4 mx-auto">
        <div className="pb-6 md:pb-8 text-center">
          <h1 className="mb-3 text-2xl md:text-3xl font-bold text-black dark:text-white">
            My Profile
          </h1>
          <p className="text-sm md:text-base text-body-color dark:text-body-color-dark">
            View and manage your resume history and feedback
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* User Profile Card */}
          <div className="mb-6 rounded-lg border border-body-color/20 bg-white p-3 sm:p-4 md:p-8 shadow-lg dark:bg-dark">
            <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 mb-4 md:mb-6">
              <div className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 mx-auto md:mx-0 rounded-full bg-primary flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-white">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-body-color dark:text-body-color-dark overflow-hidden text-ellipsis">
                  {user?.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>

            {/* Resume Profiles */}
            <div className="mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4">
                <h3 className="mb-2 sm:mb-0 text-base sm:text-lg md:text-xl font-semibold text-black dark:text-white">
                  Resume Profiles
                </h3>
                <button
                  onClick={() => setShowCreateProfile(!showCreateProfile)}
                  className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                >
                  {showCreateProfile ? "Cancel" : "New Profile"}
                </button>
              </div>
              
              {showCreateProfile && (
                <div className="mb-3 sm:mb-4 p-2 sm:p-3 md:p-4 border border-body-color/20 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="mb-2 sm:mb-3">
                    <label htmlFor="profileName" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Profile Name
                    </label>
                    <input
                      type="text"
                      id="profileName"
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      placeholder="e.g., Tech Resume, Marketing Resume"
                      className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="mb-2 sm:mb-3">
                    <label htmlFor="profileDescription" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description (Optional)
                    </label>
                    <input
                      type="text"
                      id="profileDescription"
                      value={newProfileDescription}
                      onChange={(e) => setNewProfileDescription(e.target.value)}
                      placeholder="e.g., For tech job applications"
                      className="w-full px-2 py-1.5 sm:px-3 sm:py-2 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <button
                    onClick={handleCreateProfile}
                    className="w-full px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition"
                  >
                    Create Profile
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                {profiles.map((profile) => (
                  <div 
                    key={profile.id} 
                    className={`relative p-2 sm:p-3 md:p-4 rounded-lg border ${
                      profile.id === activeProfileId 
                        ? "border-primary bg-primary/5 dark:bg-primary/10" 
                        : "border-body-color/20 hover:border-primary/50"
                    } cursor-pointer transition-all`}
                    onClick={() => handleProfileSelect(profile.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm sm:text-base md:text-lg font-medium text-black dark:text-white flex items-center flex-wrap">
                          {profile.name}
                          {profile.id === activeProfileId && (
                            <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs px-1 sm:px-1.5 py-0.5 bg-primary text-white rounded-full mt-0.5 sm:mt-0">Active</span>
                          )}
                        </h4>
                        <p className="text-[10px] sm:text-xs md:text-sm text-body-color dark:text-body-color-dark mt-1">
                          Created: {profile.createdDate}
                        </p>
                        {profile.description && (
                          <p className="text-[10px] sm:text-xs md:text-sm text-body-color dark:text-body-color-dark mt-1 line-clamp-1">
                            {profile.description}
                          </p>
                        )}
                      </div>
                      {profiles.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProfile(profile.id);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                          aria-label="Delete profile"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resume Statistics */}
            <div className="mb-4 sm:mb-6">
              <h3 className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl font-semibold text-black dark:text-white">
                Resume Statistics
              </h3>
              
              {loading ? (
                <div className="flex justify-center py-4 sm:py-6">
                  <div className="h-6 w-6 sm:h-8 sm:w-8 animate-spin rounded-full border-3 sm:border-4 border-primary border-r-transparent"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div className="rounded-lg border border-body-color/20 p-2 sm:p-3 md:p-4">
                    <p className="text-[10px] sm:text-xs md:text-sm text-body-color dark:text-body-color-dark">Total Resumes</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white">{stats.totalResumes}</p>
                  </div>
                  <div className="rounded-lg border border-body-color/20 p-2 sm:p-3 md:p-4">
                    <p className="text-[10px] sm:text-xs md:text-sm text-body-color dark:text-body-color-dark">Last Upload</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white">{stats.lastUploadDate}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-lg md:text-xl font-semibold text-black dark:text-white">
                Quick Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <Link
                  href="/profile/resume-history"
                  className="flex items-center justify-center rounded-md bg-white dark:bg-gray-800 border border-body-color/20 hover:border-primary p-3 md:p-4 transition-all hover:shadow-md"
                >
                  <div className="w-full text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h4 className="text-base md:text-lg font-medium text-black dark:text-white">
                      Resume History
                    </h4>
                    <p className="mt-1 text-xs md:text-sm text-body-color dark:text-body-color-dark">
                      View your uploaded resumes
                    </p>
                  </div>
                </Link>

                <Link
                  href="/profile/feedback"
                  className="flex items-center justify-center rounded-md bg-white dark:bg-gray-800 border border-body-color/20 hover:border-primary p-3 md:p-4 transition-all hover:shadow-md"
                >
                  <div className="w-full text-center">
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                    </div>
                    <h4 className="text-base md:text-lg font-medium text-black dark:text-white">
                      Feedback History
                    </h4>
                    <p className="mt-1 text-xs md:text-sm text-body-color dark:text-body-color-dark">
                      View AI feedback for your resumes
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage; 