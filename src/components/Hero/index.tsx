"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaUpload, FaSearch, FaFilePdf, FaCheckCircle, FaTimesCircle, FaRegLightbulb, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const [files, setFiles] = useState([]);
  const [numResumes, setNumResumes] = useState(1);
  const [requiredSkills, setRequiredSkills] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionType, setSubmissionType] = useState(null);

  // Backend URLs
  const localBackendURL = "http://127.0.0.1:5001/parseresume";
  const vercelBackendURL = "https://resumebackend-25nh.onrender.com/parseresume";

  const backendURL =
    process.env.NODE_ENV === "development" ? localBackendURL : vercelBackendURL;

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    setUploadStatus(null);
  };

  const handleSubmit = async () => {
    if (files.length !== numResumes) {
      alert(`Please upload exactly ${numResumes} resumes.`);
      return;
    }

    setIsLoading(true);
    setSubmissionType('keyword');
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("file", file));
    formData.append("requiredSkills", requiredSkills);
    
    // Add the primary skill parameter (use first skill or empty string)
    const skillsArray = requiredSkills.split(',').map(s => s.trim()).filter(s => s);
    const primarySkill = skillsArray.length > 0 ? skillsArray[0] : "";
    formData.append("skill", primarySkill);

    try {
      const response = await axios.post(backendURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setOutput(response.data);
        setUploadStatus("success");
      } else {
        setOutput(null);
        setUploadStatus("error");
      }
    } catch (error) {
      console.error("There was an error uploading the files!", error);
      setUploadStatus("error");
      setOutput(null);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const features = [
    {
      icon: <FaRegLightbulb className="h-6 w-6 text-primary" />,
      title: "AI-Powered Analysis",
      description: "Our advanced AI analyzes your resume against job descriptions",
    },
    {
      icon: <FaChartLine className="h-6 w-6 text-primary" />,
      title: "ATS Optimization",
      description: "Ensure your resume passes through Applicant Tracking Systems",
    },
  ];

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 pb-16 pt-[120px] dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
       
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
          <div className="absolute left-1/3 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500 opacity-10 blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <motion.div 
                className="mx-auto max-w-[800px] text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h1
                  variants={itemVariants}
                  className="mb-5 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight"
                >
                  Resume <span className="text-primary">Filtration</span> System
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="mb-8 text-lg !leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl"
                >
                  Upload resumes and filter them based on skills and ATS scores.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="mx-auto mb-8 flex max-w-[600px] flex-wrap justify-center gap-4 sm:flex-nowrap"
                >
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="w-full rounded-lg bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800 sm:w-1/2"
                    >
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary bg-opacity-10">
                        {feature.icon}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Enter number of resumes to upload"
                      value={numResumes}
                      onChange={(e) => setNumResumes(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                  <div className="flex items-center justify-center">
                    <label
                      htmlFor="file-upload"
                      className="group flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-blue-600 hover:to-indigo-700"
                    >
                      <FaUpload className="mr-2" />
                      <span>Choose files</span>
                      <span className="ml-2 rounded-full bg-white bg-opacity-20 px-2 py-1 text-xs">
                        {files.length ? `${files.length} selected` : "No files"}
                      </span>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf"
                      multiple
                      className="hidden"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter required skills (comma-separated)"
                      value={requiredSkills}
                      onChange={(e) => setRequiredSkills(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mb-4"
                >
                  <motion.button
                    onClick={handleSubmit}
                    disabled={isLoading || !requiredSkills}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="flex w-full items-center justify-center rounded-lg bg-green-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <svg className="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Resumes...
                      </>
                    ) : (
                      <>
                        <FaSearch className="mr-2" />
                        Process Resumes
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {uploadStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 flex items-center justify-center rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                  >
                    <FaCheckCircle className="mr-2" />
                    Files uploaded and processed successfully!
                  </motion.div>
                )}

                {uploadStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 flex items-center justify-center rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  >
                    <FaTimesCircle className="mr-2" />
                    Error processing resumes. Please try again.
                  </motion.div>
                )}

                {output && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-white">Resume Analysis Results</h2>
                    
                    {/* Search information */}
                    <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/10">
                      <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Search Parameters</h3>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="flex items-center rounded-md bg-white p-3 shadow-sm dark:bg-gray-800">
                          <span className="mr-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Primary Skill</span>
                          <span className="text-gray-700 dark:text-gray-300">{output.skill || "None specified"}</span>
                        </div>
                        <div className="flex items-center rounded-md bg-white p-3 shadow-sm dark:bg-gray-800">
                          <span className="mr-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Frequency</span>
                          <span className="text-gray-700 dark:text-gray-300">{output.frequency}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center rounded-md bg-white p-3 shadow-sm dark:bg-gray-800">
                        <span className="mr-2 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">Required Skills</span>
                        <span className="text-gray-700 dark:text-gray-300">{requiredSkills}</span>
                      </div>
                    </div>
                    
                    {/* Extracted Skills */}
                    <div className="mb-6 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/10">
                      <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Extracted Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(output.skills).map(([skill, count]) => (
                          <span key={skill} className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                            {skill}: {String(count)}
                          </span>
                        ))}
                      </div>
                    </div>
                      
                    {/* ATS Scores */}
                    <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/10">
                      <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                        ATS Scores By Resume
                      </h3>
                      <div className="space-y-3">
                        {output.top_resumes.map((resume, idx) => (
                          <motion.div 
                            key={`keyword-${idx}`} 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div className="flex items-center">
                                <FaFilePdf className="mr-2 text-red-500" />
                                <span className="font-medium text-gray-900 dark:text-white">{resume.filename}</span>
                              </div>
                              <div>
                                <span className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${
                                  resume.ats_score >= 80 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                  resume.ats_score >= 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                  resume.matched_skills.length > 0 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                  Score: {resume.ats_score}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mt-3 border-t border-gray-100 pt-3 dark:border-gray-700">
                              <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Matched Skills:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {resume.matched_skills.length > 0 ? (
                                  resume.matched_skills.map((skill, i) => (
                                    <span key={i} className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                      {skill}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-sm italic text-gray-500 dark:text-gray-400">No skills matched</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {!output && (
                  <motion.div
                    variants={itemVariants}
                    className="mt-8 flex justify-center"
                  >
                    <Link 
                      href="#how-it-works"
                      className="flex items-center text-base font-medium text-primary hover:underline dark:text-blue-400"
                    >
                      <span>Learn how it works</span>
                      <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;