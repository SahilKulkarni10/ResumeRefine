"use client";

import React, { useEffect, useRef } from "react";
import { ResumeEntry } from "@/context/ResumeContext";

interface ResumeModalProps {
  resume: ResumeEntry | null;
  onClose: () => void;
}

const ResumeModal = ({ resume, onClose }: ResumeModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle escape key to close modal
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    // Handle click outside to close modal
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);

    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!resume) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-3 md:p-4 overflow-y-auto">
      <div 
        ref={modalRef} 
        className="w-full max-w-3xl rounded-lg bg-white p-4 md:p-6 shadow-xl dark:bg-gray-800 max-h-[90vh] overflow-y-auto"
      >
        <div className="mb-3 md:mb-4 flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Resume Details
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            title="Close modal"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4 md:mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 md:h-16 md:w-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-3 md:ml-4">
              <h3 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white truncate max-w-[200px] md:max-w-full">
                {resume.filename}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                Uploaded on {resume.uploadDate}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 md:mb-6 grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-3 md:p-4 dark:border-gray-700">
            <h4 className="mb-1 md:mb-2 text-xs md:text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
              Position
            </h4>
            <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              {resume.position}
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-3 md:p-4 dark:border-gray-700">
            <h4 className="mb-1 md:mb-2 text-xs md:text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
              ATS Score
            </h4>
            <div className="flex items-center">
              <span className={`inline-flex text-base md:text-lg font-bold 
                ${resume.atsScore >= 70 ? 'text-green-600 dark:text-green-400' : 
                resume.atsScore >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 
                'text-red-600 dark:text-red-400'}`}>
                {resume.atsScore}%
              </span>
              <div className="ml-3 md:ml-4 h-2 w-24 md:w-32 rounded-full bg-gray-200 dark:bg-gray-700">
                <div 
                  className={`h-2 rounded-full 
                  ${resume.atsScore >= 70 ? 'bg-green-500' : 
                  resume.atsScore >= 50 ? 'bg-yellow-500' : 
                  'bg-red-500'}`}
                  style={{ width: `${resume.atsScore}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 md:mb-6">
          <h4 className="mb-2 md:mb-3 text-xs md:text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
            Matched Skills
          </h4>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {resume.matchedSkills.length > 0 ? (
              resume.matchedSkills.map((skill, index) => (
                <span 
                  key={index} 
                  className="rounded-full bg-primary/10 px-2 py-1 md:px-3 text-xs md:text-sm font-medium text-primary dark:bg-primary/20"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No skills matched</p>
            )}
          </div>
        </div>

        <div className="mt-4 md:mt-6 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-xs md:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 w-full sm:w-auto"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Trigger download action
              const link = document.createElement('a');
              const content = `Resume: ${resume.filename}\nPosition: ${resume.position}\nUploaded: ${resume.uploadDate}\nATS Score: ${resume.atsScore}%\nMatched Skills: ${resume.matchedSkills.join(', ')}`;
              const file = new Blob([content], { type: 'text/plain' });
              link.href = URL.createObjectURL(file);
              link.download = resume.filename.replace('.pdf', '') + '_details.txt';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="rounded-md bg-primary px-4 py-2 text-xs md:text-sm font-medium text-white shadow-sm hover:bg-primary/90 w-full sm:w-auto"
          >
            Download Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal; 