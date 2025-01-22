"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaUpload, FaSearch, FaFilePdf, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  const [files, setFiles] = useState([]);
  const [numResumes, setNumResumes] = useState(1);
  const [skill, setSkill] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [output, setOutput] = useState(null);

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

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("file", file));
    formData.append("skill", skill);
    formData.append("requiredSkills", requiredSkills);

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
    }
  };

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-5 text-4xl font-bold leading-tight text-gray-900 dark:text-white sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight"
                >
                  Resume Filtration System
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-12 text-lg !leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl"
                >
                  Upload resumes and filter them based on skills and ATS scores.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-6"
                >
                  <input
                    type="number"
                    placeholder="Enter number of resumes to upload"
                    value={numResumes}
                    onChange={(e) => setNumResumes(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mb-6"
                >
                  <label
                    htmlFor="file-upload"
                    className="flex cursor-pointer items-center justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600"
                  >
                    <FaUpload className="mr-2" />
                    Choose files
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf"
                    multiple
                    className="hidden"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mb-6"
                >
                  <input
                    type="text"
                    placeholder="Enter skill to search for"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className="mb-6"
                >
                  <input
                    type="text"
                    placeholder="Enter required skills (comma separated)"
                    value={requiredSkills}
                    onChange={(e) => setRequiredSkills(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    required
                  />
                </motion.div>

                {/* <motion.button
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  onClick={handleSubmit}
                  className="flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-blue-700"
                >
                  <FaSearch className="mr-2" />
                  Upload Resumes
                </motion.button> */}



<div className="flex items-center justify-center "> {/* Center both horizontally and vertically */}
  <motion.button
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.2 }}
    onClick={handleSubmit}
    className="flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-blue-700"
  >
    <FaSearch className="mr-2" />
    Upload Resumes
  </motion.button>
</div>

                {uploadStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 flex items-center justify-center rounded-lg bg-green-50 p-4 text-green-700"
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
                    className="mt-6 flex items-center justify-center rounded-lg bg-red-50 p-4 text-red-700"
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
                    className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
                  >
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Results</h2>
                    <div className="space-y-4">
                      <p>
                        <strong>Skill Searched:</strong> {output.skill}
                      </p>
                      <p>
                        <strong>Frequency of Skill:</strong> {output.frequency}
                      </p>
                      <p>
                        <strong>Extracted Skills:</strong>{" "}
                        {Object.entries(output.skills).map(([skill, count]) => (
                          <span key={skill} className="mr-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
                            {skill}: {String(count)}
                          </span>
                        ))}
                      </p>
                      <h3 className="mt-4 text-xl font-semibold text-gray-900">
                        Top Resumes Based on ATS Score:
                      </h3>
                      <ul className="space-y-2">
                        {output.top_resumes.map((resume, idx) => (
                          <li key={idx} className="rounded-lg bg-gray-50 p-4 shadow-sm">
                            <strong>Filename:</strong> {resume.filename} <br />
                            <strong>ATS Score:</strong> {resume.ats_score} <br />
                            <strong>Matched Skills:</strong>{" "}
                            {resume.matched_skills.join(", ")}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;