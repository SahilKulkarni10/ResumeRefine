"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const Stats = () => {
  const stats = [
    {
      id: 1,
      value: 98,
      suffix: "%",
      title: "ATS Accuracy",
      description: "Our AI accurately analyzes resume compatibility with ATS systems",
    },
    {
      id: 2,
      value: 10000,
      suffix: "+",
      title: "Resumes Processed",
      description: "Users have trusted us with their resume optimization needs",
    },
    {
      id: 3,
      value: 85,
      suffix: "%",
      title: "Interview Rate",
      description: "Users report higher interview rates after using our platform",
    },
    {
      id: 4,
      value: 24,
      suffix: "/7",
      title: "Support",
      description: "Our team is available around the clock to assist you",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="stats" className="bg-gray-50 py-16 dark:bg-gray-800 md:py-20 lg:py-28">
      <div className="container">
        <div ref={ref} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg bg-white p-8 text-center shadow-lg transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl dark:bg-gray-dark"
            >
              <h3 className="mb-2 text-4xl font-bold text-primary">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  enableScrollSpy
                  scrollSpyDelay={0}
                  scrollSpyOnce
                />
                {stat.suffix}
              </h3>
              <h4 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                {stat.title}
              </h4>
              <p className="text-base text-gray-600 dark:text-gray-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats; 