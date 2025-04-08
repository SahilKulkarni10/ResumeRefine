"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useResumeContext, FeedbackEntry } from "@/context/ResumeContext";
import { toast } from "react-hot-toast";

const FeedbackHistoryPage = () => {
  const { isSignedIn } = useUser();
  const { feedbackEntries, resumes, profiles, activeProfileId, loading: contextLoading } = useResumeContext();
  const [loading, setLoading] = useState(true);
  const [filteredFeedback, setFilteredFeedback] = useState<FeedbackEntry[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is signed in
    if (!isSignedIn) {
      redirect("/");
    }

    if (!contextLoading) {
      // Set active profile from context
      setActiveProfile(activeProfileId);
      
      // Filter feedback by active profile
      const profileFeedback = activeProfileId 
        ? feedbackEntries.filter(feedback => feedback.profileId === activeProfileId)
        : feedbackEntries;
      
      setFilteredFeedback(profileFeedback);
      setLoading(false);
    }
  }, [isSignedIn, contextLoading, feedbackEntries, activeProfileId]);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleDownloadResume = (entry: FeedbackEntry) => {
    // Find the associated resume
    const resume = resumes.find(r => r.filename === entry.resumeFilename);
    
    // Create content for download
    let content = `Feedback for: ${entry.resumeFilename}\n`;
    content += `Position: ${entry.position}\n`;
    content += `Date: ${entry.date}\n\n`;
    content += `ATS Feedback:\n`;
    
    entry.feedback.forEach(item => {
      content += `• ${item}\n`;
    });
    
    if (resume) {
      content += `\nResume Stats:\n`;
      content += `ATS Score: ${resume.atsScore}%\n`;
      content += `Matched Skills: ${resume.matchedSkills.join(', ')}\n`;
    }
    
    // Create and trigger download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = entry.resumeFilename.replace('.pdf', '') + '_feedback.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleApplySuggestions = (entry: FeedbackEntry) => {
    // In a real app, this would open the resume editor with suggestions applied
    // For now, we'll just show a notification
    toast.success("Opening resume editor to apply suggestions...", {
      duration: 3000,
      position: "bottom-center",
      style: {
        background: "#10B981",
        color: "#fff",
        borderRadius: "8px",
        padding: "16px"
      },
      icon: "✅"
    });
  };

  if (!isSignedIn) return null;

  // Find current profile name
  const currentProfile = profiles.find(p => p.id === activeProfile);
  const profileName = currentProfile ? currentProfile.name : "All Profiles";

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container px-4 mx-auto">
        <div className="pb-6 md:pb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="mb-2 text-2xl md:text-3xl font-bold text-black dark:text-white">
                Feedback History
              </h1>
              <p className="text-sm md:text-base text-body-color dark:text-body-color-dark">
                Viewing feedback for: {profileName}
              </p>
            </div>
            <Link
              href="/profile"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 md:px-6 md:py-3 text-center text-sm md:text-base font-medium text-white hover:bg-primary/90"
            >
              Back to Profile
            </Link>
          </div>
        </div>

        <div className="mx-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
            </div>
          ) : filteredFeedback.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {filteredFeedback.map((entry) => (
                <div 
                  key={entry.id} 
                  className="rounded-lg border border-body-color/20 bg-white shadow-md dark:bg-dark overflow-hidden"
                >
                  <div 
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 md:p-6 cursor-pointer"
                    onClick={() => toggleExpand(entry.id)}
                  >
                    <div className="mb-2 sm:mb-0">
                      <h3 className="text-base md:text-lg font-semibold text-black dark:text-white mb-1">
                        {entry.position}
                      </h3>
                      <p className="text-xs md:text-sm text-body-color dark:text-body-color-dark truncate max-w-full sm:max-w-[200px] md:max-w-[300px]">
                        {entry.resumeFilename} • {entry.date}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button 
                        className="flex items-center text-primary hover:text-primary/80 dark:text-primary dark:hover:text-primary/80 text-xs md:text-sm"
                        aria-label={expandedId === entry.id ? 'Hide feedback' : 'Show feedback'}
                      >
                        {expandedId === entry.id ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className="ml-1 md:ml-2">{expandedId === entry.id ? 'Hide Feedback' : 'Show Feedback'}</span>
                      </button>
                    </div>
                  </div>
                  
                  {expandedId === entry.id && (
                    <div className="border-t border-body-color/20 p-4 md:p-6">
                      <h4 className="text-sm md:text-md font-semibold text-black dark:text-white mb-3 md:mb-4">
                        ATS Feedback:
                      </h4>
                      <ul className="space-y-2 md:space-y-3">
                        {entry.feedback.map((item, index) => (
                          <li key={index} className="flex text-xs md:text-sm">
                            <span className="text-primary mr-2 flex-shrink-0">•</span>
                            <span className="text-body-color dark:text-body-color-dark">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadResume(entry);
                          }}
                          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 md:px-4 md:py-2 text-center text-xs md:text-sm font-medium text-white hover:bg-primary/90"
                        >
                          Download Feedback
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApplySuggestions(entry);
                          }}
                          className="inline-flex items-center justify-center rounded-md border border-primary px-3 py-1.5 md:px-4 md:py-2 text-center text-xs md:text-sm font-medium text-primary transition hover:bg-primary/10 dark:text-white"
                        >
                          Apply Suggestions
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-dark rounded-lg border border-body-color/20 p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                No feedback found
              </h3>
              <p className="text-body-color dark:text-body-color-dark mb-6">
                You haven't received any resume feedback in this profile yet.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-base font-medium text-white hover:bg-primary/90"
              >
                Get Feedback on Your Resume
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackHistoryPage; 