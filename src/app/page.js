"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  };

  const cardHover = {
    y: -10,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  };

  return (
      <main className="min-h-screen bg-gradient-to-b from-[#F9E9EC] to-[#F9E9EC]/80 flex flex-col items-center justify-center overflow-hidden">
        <motion.section
            className="text-center max-w-3xl mx-auto px-4 py-12"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
        >
          <motion.h1
              className="text-4xl md:text-6xl font-bold text-[#577590] mb-6"
              animate={{
                scale: [1, 1.03, 1],
                transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
          >
            Welcome to Task Syncs
          </motion.h1>
          <motion.p
              className="text-lg md:text-xl text-[#577590]/90 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
          >
            Stay organized, boost productivity, and accomplish more with our
            intuitive task management tool.
          </motion.p>
          <motion.a
              href="/signup"
              className="inline-block bg-[#F3CA40] text-[#577590] font-semibold px-8 py-4 rounded-full shadow-md hover:bg-[#F2A541] transition-colors"
              whileHover={buttonHover}
              whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a>
        </motion.section>

        <motion.section
            className="w-full max-w-6xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-all duration-300"
              variants={fadeIn}
              whileHover={cardHover}
          >
            <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-[#F08A4B]/10 rounded-full flex items-center justify-center"
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  transition: { duration: 6, repeat: Infinity }
                }}
            >
              <svg className="w-8 h-8 text-[#F08A4B]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <h2 className="text-[#F08A4B] font-bold text-xl mb-3">Easy Task Tracking</h2>
            <p className="text-gray-700">
              Quickly add tasks, set priorities, and track progress with minimal effort.
            </p>
          </motion.div>

          <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-all duration-300"
              variants={fadeIn}
              whileHover={cardHover}
          >
            <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-[#F08A4B]/10 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  transition: { duration: 4, repeat: Infinity }
                }}
            >
              <svg className="w-8 h-8 text-[#F08A4B]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </motion.div>
            <h2 className="text-[#F08A4B] font-bold text-xl mb-3">Collaboration</h2>
            <p className="text-gray-700">
              Share tasks with teammates or family. Assign responsibilities and stay in sync effortlessly.
            </p>
          </motion.div>

          <motion.div
              className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-all duration-300"
              variants={fadeIn}
              whileHover={cardHover}
          >
            <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-[#F08A4B]/10 rounded-full flex items-center justify-center"
                animate={{
                  y: [0, -5, 0],
                  transition: { duration: 2, repeat: Infinity }
                }}
            >
              <svg className="w-8 h-8 text-[#F08A4B]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <h2 className="text-[#F08A4B] font-bold text-xl mb-3">Smart Reminders</h2>
            <p className="text-gray-700">
              Get timely notifications and never miss an important task or deadline again.
            </p>
          </motion.div>
        </motion.section>

        <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1, duration: 1 }}
        >
          <motion.div
              className="absolute top-20 left-20 w-16 h-16 rounded-full bg-[#F3CA40]/20"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.5, 1],
                transition: { duration: 15, repeat: Infinity }
              }}
          />
          <motion.div
              className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-[#F08A4B]/10"
              animate={{
                x: [0, -120, 0],
                y: [0, -80, 0],
                scale: [1, 2, 1],
                transition: { duration: 18, repeat: Infinity }
              }}
          />
          <motion.div
              className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-[#577590]/10"
              animate={{
                x: [0, 70, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
                transition: { duration: 12, repeat: Infinity }
              }}
          />
        </motion.div>
      </main>
  );
}