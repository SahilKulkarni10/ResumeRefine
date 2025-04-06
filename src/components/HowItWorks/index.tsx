"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: "🔍",
      title: "Upload Your Resume",
      description: "Upload your resume in PDF format to our secure platform.",
    },
    {
      id: 2,
      icon: "⚙️",
      title: "AI Analysis",
      description: "Our AI analyzes your resume against job descriptions and industry standards.",
    },
    {
      id: 3,
      icon: "📊",
      title: "Receive ATS Score",
      description: "Get detailed feedback and an ATS compatibility score for your resume.",
    },
    {
      id: 4,
      icon: "✨",
      title: "Get Recommendations",
      description: "Receive personalized recommendations to improve your resume's effectiveness.",
    },
  ];

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="how-it-works" className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="How ResumeRefine Works"
          paragraph="Our simple 4-step process to optimize your resume and improve your chances of landing interviews."
          center
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative rounded-lg bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInVariants}
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-primary bg-opacity-10 text-3xl text-primary">
                {step.icon}
              </div>
              
              <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {step.id}
              </div>

              <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-400">
                {step.description}
              </p>

              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden transform lg:block">
                  <svg width="40" height="12" viewBox="0 0 40 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.5303 6.53033C39.8232 6.23744 39.8232 5.76256 39.5303 5.46967L34.7574 0.696699C34.4645 0.403806 33.9896 0.403806 33.6967 0.696699C33.4038 0.989593 33.4038 1.46447 33.6967 1.75736L37.9393 6L33.6967 10.2426C33.4038 10.5355 33.4038 11.0104 33.6967 11.3033C33.9896 11.5962 34.4645 11.5962 34.7574 11.3033L39.5303 6.53033ZM0 6.75H39V5.25H0V6.75Z" fill="#3758F9"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 