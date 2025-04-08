"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useResumeContext, ResumeEntry } from "@/context/ResumeContext";
import ResumeModal from "@/components/ResumeModal";

const ResumeHistoryPage = () => {
  const { isSignedIn } = useUser();
  const { resumes, profiles, activeProfileId, loading: contextLoading } = useResumeContext();
  const [loading, setLoading] = useState(true);
  const [filteredResumes, setFilteredResumes] = useState<ResumeEntry[]>([]);
  const [selectedResume, setSelectedResume] = useState<ResumeEntry | null>(null);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is signed in
    if (!isSignedIn) {
      redirect("/");
    }

    if (!contextLoading) {
      // Set active profile from context
      setActiveProfile(activeProfileId);
      
      // Filter resumes by active profile
      const profileResumes = activeProfileId 
        ? resumes.filter(resume => resume.profileId === activeProfileId)
        : resumes;
      
      setFilteredResumes(profileResumes);
      setLoading(false);
    }
  }, [isSignedIn, contextLoading, resumes, activeProfileId]);

  const handleView = (resume: ResumeEntry) => {
    setSelectedResume(resume);
  };

  const handleDownload = (resume: ResumeEntry) => {
    // Create a text representation of the resume data
    const content = `Resume: ${resume.filename}
Position: ${resume.position}
Uploaded: ${resume.uploadDate}
ATS Score: ${resume.atsScore}%
Matched Skills: ${resume.matchedSkills.join(', ')}`;

    // Create a Blob and download it
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = resume.filename.replace('.pdf', '') + '_details.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
                Resume History
              </h1>
              <p className="text-sm md:text-base text-body-color dark:text-body-color-dark">
                Viewing resumes for: {profileName}
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
          ) : filteredResumes.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border border-body-color/20 bg-white dark:bg-dark">
              <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Resume
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Position
                    </th>
                    <th scope="col" className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Upload Date
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      ATS Score
                    </th>
                    <th scope="col" className="hidden md:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Matched Skills
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-dark dark:divide-gray-700">
                  {filteredResumes.map((resume) => (
                    <tr key={resume.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <div className="text-xs md:text-sm font-medium text-gray-900 dark:text-white truncate max-w-[100px] md:max-w-[180px]">
                              {resume.filename}
                            </div>
                            <div className="md:hidden text-xs text-gray-500 dark:text-gray-400">{resume.uploadDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-xs md:text-sm text-gray-900 dark:text-white">{resume.position}</div>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap">
                        <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{resume.uploadDate}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`text-xs md:text-sm font-medium ${
                            resume.atsScore >= 70 
                              ? 'text-green-600 dark:text-green-500' 
                              : resume.atsScore >= 50 
                                ? 'text-yellow-600 dark:text-yellow-500' 
                                : 'text-red-600 dark:text-red-500'
                          }`}>
                            {resume.atsScore}%
                          </div>
                          <div className="ml-2 h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                resume.atsScore >= 70 
                                  ? 'bg-green-500' 
                                  : resume.atsScore >= 50 
                                    ? 'bg-yellow-500' 
                                    : 'bg-red-500'
                              }`}
                              style={{ width: `${resume.atsScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden md:table-cell px-4 py-3 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {resume.matchedSkills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              {skill}
                            </span>
                          ))}
                          {resume.matchedSkills.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              +{resume.matchedSkills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs md:text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleView(resume)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDownload(resume)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          >
                            Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-dark rounded-lg border border-body-color/20 p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                No resumes found
              </h3>
              <p className="text-body-color dark:text-body-color-dark mb-6">
                You haven't uploaded any resumes to this profile yet.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-center text-base font-medium text-white hover:bg-primary/90"
              >
                Upload Your First Resume
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Resume Modal */}
      {selectedResume && (
        <ResumeModal
          resume={selectedResume}
          onClose={() => setSelectedResume(null)}
        />
      )}
    </section>
  );
};

export default ResumeHistoryPage; 