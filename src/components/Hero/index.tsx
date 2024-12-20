

// "use client";
// import React, { useState } from "react";
// import axios from "axios";

// const Hero = () => {
//   const [files, setFiles] = useState([]);
//   const [numResumes, setNumResumes] = useState(1);
//   const [skill, setSkill] = useState("");
//   const [requiredSkills, setRequiredSkills] = useState("");
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [output, setOutput] = useState(null);

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//     setUploadStatus(null); // Reset status when new files are selected
//   };

//   const handleSubmit = async () => {
//     if (files.length !== numResumes) {
//       alert(`Please upload exactly ${numResumes} resumes.`);
//       return;
//     }

//     const formData = new FormData();
//     Array.from(files).forEach((file) => formData.append("file", file));
//     formData.append("skill", skill);
//     formData.append("requiredSkills", requiredSkills);

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/parseresume",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.status === 200) {
//         setOutput(response.data);
//         setUploadStatus("success");
//       } else {
//         setOutput(null);
//         setUploadStatus("error");
//       }
//     } catch (error) {
//       console.error("There was an error uploading the files!", error);
//       setUploadStatus("error");
//       setOutput(null);
//     }
//   };

//   return (
//     <>
//       <section
//         id="home"
//         className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
//       >
//         <div className="container">
//           <div className="-mx-4 flex flex-wrap">
//             <div className="w-full px-4">
//               <div className="mx-auto max-w-[800px] text-center">
//                 <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
//                   Resume Filtration System
//                 </h1>
//                 <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
//                   How many resumes do you want to upload?
//                 </p>

//                 <input
//                   type="number"
//                   placeholder="Enter number of resumes to upload"
//                   value={numResumes}
//                   onChange={(e) => setNumResumes(Number(e.target.value))}
//                   className="mb-4 w-full rounded-md border border-black p-2"
//                   required
//                 />

//                 <div className="mb-4">
//                   <label
//                     htmlFor="file-upload"
//                     className="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
//                   >
//                     Choose files
//                   </label>
//                   <input
//                     id="file-upload"
//                     type="file"
//                     onChange={handleFileChange}
//                     accept=".pdf"
//                     multiple
//                     className="hidden"
//                   />
//                 </div>

//                 <input
//                   type="text"
//                   placeholder="Enter skill to search for"
//                   value={skill}
//                   onChange={(e) => setSkill(e.target.value)}
//                   className="mb-4 w-full rounded-md border border-black p-2"
//                   required
//                 />

//                 <input
//                   type="text"
//                   placeholder="Enter required skills (comma separated)"
//                   value={requiredSkills}
//                   onChange={(e) => setRequiredSkills(e.target.value)}
//                   className="mb-4 w-full rounded-md border border-black p-2"
//                   required
//                 />

//                 <button
//                   onClick={handleSubmit}
//                   className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
//                 >
//                   Upload Resumes
//                 </button>

//                 {uploadStatus === "success" && (
//                   <p className="mt-4 text-green-600">
//                     Files uploaded and processed successfully!
//                   </p>
//                 )}
//                 {uploadStatus === "error" && (
//                   <p className="mt-4 text-red-600">
//                     Error processing resumes. Please try again.
//                   </p>
//                 )}

//                 {output && (
//                   <div className="mt-4 rounded-md border border-gray-300 bg-gray-50 p-4 text-left shadow-sm">
//                     <h2 className="mb-2 text-xl font-bold">Results</h2>
//                     <p>
//                       <strong>Skill Searched:</strong> {output.skill}
//                     </p>
//                     <p>
//                       <strong>Frequency of Skill:</strong> {output.frequency}
//                     </p>
//                     <p>
//                       <strong>Extracted Skills:</strong>{" "}
//                       {Object.entries(output.skills).map(([skill, count]) => (
//                         <span key={skill}>
//                           {skill}: {String(count)};{" "}
//                         </span>
//                       ))}
//                     </p>
//                     <h3 className="mt-4 text-lg font-semibold">
//                       Top Resumes Based on ATS Score:
//                     </h3>
//                     <ul>
//                       {output.top_resumes.map((resume, idx) => (
//                         <li key={idx} className="mb-2">
//                           <strong>Filename:</strong> {resume.filename} <br />
//                           <strong>ATS Score:</strong> {resume.ats_score} <br />
//                           <strong>Matched Skills:</strong>{" "}
//                           {resume.matched_skills.join(", ")}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Hero;





"use client";
import React, { useState } from "react";
import axios from "axios";

const Hero = () => {
  const [files, setFiles] = useState([]);
  const [numResumes, setNumResumes] = useState(1);
  const [skill, setSkill] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [uploadStatus, setUploadStatus] = useState(null);
  const [output, setOutput] = useState(null);

  // Backend URLs
  const localBackendURL = "http://127.0.0.1:5001/parseresume";
  const vercelBackendURL = "https://resumebackend-sigma.vercel.app/parseresume";

  // Use localhost during development, Vercel in production
  const backendURL =
    process.env.NODE_ENV === "development" ? localBackendURL : vercelBackendURL;

  const handleFileChange = (e) => {
    setFiles(e.target.files);
    setUploadStatus(null); // Reset status when new files are selected
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
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Resume Filtration System
                </h1>
                <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                  How many resumes do you want to upload?
                </p>

                <input
                  type="number"
                  placeholder="Enter number of resumes to upload"
                  value={numResumes}
                  onChange={(e) => setNumResumes(Number(e.target.value))}
                  className="mb-4 w-full rounded-md border border-black p-2"
                  required
                />

                <div className="mb-4">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
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
                </div>

                <input
                  type="text"
                  placeholder="Enter skill to search for"
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="mb-4 w-full rounded-md border border-black p-2"
                  required
                />

                <input
                  type="text"
                  placeholder="Enter required skills (comma separated)"
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                  className="mb-4 w-full rounded-md border border-black p-2"
                  required
                />

                <button
                  onClick={handleSubmit}
                  className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/80"
                >
                  Upload Resumes
                </button>

                {uploadStatus === "success" && (
                  <p className="mt-4 text-green-600">
                    Files uploaded and processed successfully!
                  </p>
                )}
                {uploadStatus === "error" && (
                  <p className="mt-4 text-red-600">
                    Error processing resumes. Please try again.
                  </p>
                )}

                {output && (
                  <div className="mt-4 rounded-md border border-gray-300 bg-gray-50 p-4 text-left shadow-sm">
                    <h2 className="mb-2 text-xl font-bold">Results</h2>
                    <p>
                      <strong>Skill Searched:</strong> {output.skill}
                    </p>
                    <p>
                      <strong>Frequency of Skill:</strong> {output.frequency}
                    </p>
                    <p>
                      <strong>Extracted Skills:</strong>{" "}
                      {Object.entries(output.skills).map(([skill, count]) => (
                        <span key={skill}>
                          {skill}: {String(count)};{" "}
                        </span>
                      ))}
                    </p>
                    <h3 className="mt-4 text-lg font-semibold">
                      Top Resumes Based on ATS Score:
                    </h3>
                    <ul>
                      {output.top_resumes.map((resume, idx) => (
                        <li key={idx} className="mb-2">
                          <strong>Filename:</strong> {resume.filename} <br />
                          <strong>ATS Score:</strong> {resume.ats_score} <br />
                          <strong>Matched Skills:</strong>{" "}
                          {resume.matched_skills.join(", ")}
                        </li>
                      ))}
                    </ul>
                  </div>
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
