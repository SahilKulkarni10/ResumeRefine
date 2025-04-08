"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ResumeEntry {
  id: string;
  filename: string;
  uploadDate: string;
  atsScore: number;
  matchedSkills: string[];
  position: string;
  profileId: string;
}

export interface FeedbackEntry {
  id: string;
  resumeFilename: string;
  position: string;
  date: string;
  feedback: string[];
  profileId: string;
}

export interface Profile {
  id: string;
  name: string;
  createdDate: string;
  description: string;
}

interface ResumeContextType {
  resumes: ResumeEntry[];
  feedbackEntries: FeedbackEntry[];
  profiles: Profile[];
  activeProfileId: string | null;
  addResume: (resume: ResumeEntry) => void;
  addFeedback: (feedback: FeedbackEntry) => void;
  getResumeStats: () => { totalResumes: number; lastUploadDate: string };
  addProfile: (profile: Profile) => void;
  updateProfile: (profile: Profile) => void;
  deleteProfile: (profileId: string) => void;
  setActiveProfile: (profileId: string | null) => void;
  loading: boolean;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resumes, setResumes] = useState<ResumeEntry[]>([]);
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize with data from localStorage when the component mounts
  useEffect(() => {
    const storedResumes = localStorage.getItem("resumes");
    const storedFeedback = localStorage.getItem("feedback");
    const storedProfiles = localStorage.getItem("profiles");
    const storedActiveProfileId = localStorage.getItem("activeProfileId");
    
    if (storedResumes) {
      setResumes(JSON.parse(storedResumes));
    }
    
    if (storedFeedback) {
      setFeedbackEntries(JSON.parse(storedFeedback));
    }
    
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
    }
    
    if (storedActiveProfileId) {
      setActiveProfileId(JSON.parse(storedActiveProfileId));
    }
    
    // Create default profile if none exist
    if (!storedProfiles || JSON.parse(storedProfiles).length === 0) {
      const defaultProfile = {
        id: "default",
        name: "Default Profile",
        createdDate: new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        description: "Default profile for all resumes"
      };
      setProfiles([defaultProfile]);
      setActiveProfileId("default");
    }
    
    setLoading(false);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("resumes", JSON.stringify(resumes));
      localStorage.setItem("feedback", JSON.stringify(feedbackEntries));
      localStorage.setItem("profiles", JSON.stringify(profiles));
      localStorage.setItem("activeProfileId", JSON.stringify(activeProfileId));
    }
  }, [resumes, feedbackEntries, profiles, activeProfileId, loading]);

  const addResume = (resume: ResumeEntry) => {
    // Assign current active profile if not specified
    const resumeWithProfile = { 
      ...resume, 
      profileId: resume.profileId || activeProfileId || "default" 
    };
    
    setResumes((prevResumes) => {
      // Check if resume with same ID already exists
      const exists = prevResumes.some((r) => r.id === resumeWithProfile.id);
      if (exists) {
        // Update existing resume
        return prevResumes.map((r) => (r.id === resumeWithProfile.id ? resumeWithProfile : r));
      }
      // Add new resume
      return [resumeWithProfile, ...prevResumes];
    });
  };

  const addFeedback = (feedback: FeedbackEntry) => {
    // Assign current active profile if not specified
    const feedbackWithProfile = { 
      ...feedback, 
      profileId: feedback.profileId || activeProfileId || "default" 
    };
    
    setFeedbackEntries((prevFeedback) => {
      // Check if feedback with same ID already exists
      const exists = prevFeedback.some((f) => f.id === feedbackWithProfile.id);
      if (exists) {
        // Update existing feedback
        return prevFeedback.map((f) => (f.id === feedbackWithProfile.id ? feedbackWithProfile : f));
      }
      // Add new feedback
      return [feedbackWithProfile, ...prevFeedback];
    });
  };

  const getResumeStats = () => {
    // Filter by active profile
    const profileResumes = activeProfileId
      ? resumes.filter(r => r.profileId === activeProfileId)
      : resumes;
    
    const totalResumes = profileResumes.length;
    const sortedResumes = [...profileResumes].sort((a, b) => {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    });
    const lastUploadDate = sortedResumes.length > 0 ? sortedResumes[0].uploadDate : "-";

    return {
      totalResumes,
      lastUploadDate,
    };
  };
  
  const addProfile = (profile: Profile) => {
    setProfiles(prevProfiles => [profile, ...prevProfiles]);
    // Set as active profile if it's the first one
    if (profiles.length === 0) {
      setActiveProfileId(profile.id);
    }
  };
  
  const updateProfile = (profile: Profile) => {
    setProfiles(prevProfiles => 
      prevProfiles.map(p => p.id === profile.id ? profile : p)
    );
  };
  
  const deleteProfile = (profileId: string) => {
    // Don't delete if it's the only profile
    if (profiles.length <= 1) {
      return;
    }
    
    setProfiles(prevProfiles => 
      prevProfiles.filter(p => p.id !== profileId)
    );
    
    // If active profile is deleted, set first available as active
    if (activeProfileId === profileId) {
      const remainingProfiles = profiles.filter(p => p.id !== profileId);
      if (remainingProfiles.length > 0) {
        setActiveProfileId(remainingProfiles[0].id);
      } else {
        setActiveProfileId(null);
      }
    }
  };
  
  const setActiveProfile = (profileId: string | null) => {
    setActiveProfileId(profileId);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        feedbackEntries,
        profiles,
        activeProfileId,
        addResume,
        addFeedback,
        getResumeStats,
        addProfile,
        updateProfile,
        deleteProfile,
        setActiveProfile,
        loading,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
}; 