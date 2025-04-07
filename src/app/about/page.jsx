'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function AboutPage() {
    const { isSignedIn } = useUser();
    const teamMembers = [
        {
            name: 'Ryeleigh Avila',
            role: 'Developer',
            github: 'https://github.com/RyeleighAvila',
            linkedin: 'https://www.linkedin.com/in/avila03/'
        },
        {
            name: 'Khoi Le',
            role: 'Developer',
            github: 'https://github.com/khoi0102',
            linkedin: 'https://www.linkedin.com/in/khoile0102/'
        },
        {
            name: 'Anthony Cecchini',
            role: 'Developer',
            github: 'https://github.com/tonycecc',
            linkedin: 'https://www.linkedin.com/in/anthony-cecchini/'
        },
        {
            name: 'Logan Herrera',
            role: 'Developer',
            github: 'https://github.com/lzherrera',
            linkedin: '#'
        }
    ];

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#CADCFC] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                >
                    <h1 className="text-4xl font-bold text-[#000000] mb-4">About TaskSync</h1>
                    <div className="h-1 w-24 bg-[#F2A541] mx-auto rounded-full mb-8"></div>
                    <p className="text-lg text-[#00246B]/80 max-w-2xl mx-auto">
                        Streamlining task management for teams and individuals with intuitive, powerful tools.
                    </p>
                </motion.div>
                <motion.div
                    className="bg-white rounded-xl shadow-lg p-8 mb-12"
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                >
                    <h2 className="text-2xl font-bold text-[#000000] mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-[#F2A541]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Our Story
                    </h2>

                    <div className="space-y-6 text-[#000000]/90">
                        <p>
                            TaskSync was originally called StudyNet, and it was designed to be a tool to help educators track student engagement while also facilitating communication between the student's peers and themselves.
                        </p>
                        <p>
                            As we started planning and designing further, however, we realized that StudyNet’s core functions could help all kinds of organizations outside the realm of education. Whether it is a large-scale company or a small book club, every group needs a way to organize and communicate with each other.
                        </p>
                        <p>
                            So, with this in mind, StudyNet was changed to TaskSync (one alternative name we thought of was AgendaNinja. This was scrapped for respectabilities sake [editor's note: I still want it though!]).
                        </p>
                        <p>
                            As it is today, TaskSync can help people all over the world get connected to achieve greater goals. We are excited to see all the projects that will be completed thanks to TaskSync. 
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    className="mb-12"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <h2 className="text-2xl font-bold text-[#000000] mb-8 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-[#F2A541]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Meet Our Team
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#F2A541]"
                                variants={fadeIn}
                            >
                                <h3 className="text-xl font-semibold text-[#000000]">{member.name}</h3>
                                <p className="text-[#000000]/70 mb-3">{member.role}</p>
                                <div className="flex space-x-3 mt-2">
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#00246B]/80 hover:text-[#CADCFC] transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#00246B]/80 hover:text-[#CADCFC] transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                <motion.div
                    className="bg-[#577590]/10 rounded-xl p-8 text-center"
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                >
                    <svg className="w-10 h-10 mx-auto mb-4 text-[#F2A541]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <p className="text-[#000000] italic">
                        Special thanks to our instructor, Asaad Althoubi, for his guidance and support throughout the development of this project.
                    </p>
                </motion.div>
                <motion.div
                    className="text-center mt-16"
                    initial="initial"
                    animate="animate"
                    variants={fadeIn}
                >
                    <h2 className="text-2xl font-bold text-[#000000] mb-4">Ready to Get Started?</h2>
                    <p className="text-[#00246B]/80 mb-8">
                        Discover how TaskSync can help you and your team achieve more together.
                    </p>

                    <SignedIn>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/task"
                                  className="inline-block bg-[#F2A541] text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-[#F08A4B] transition-colors">
                                Try TaskSync Today
                            </Link>
                        </motion.div>
                    </SignedIn>

                    <SignedOut>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <SignInButton mode="modal"
                                          className="inline-block bg-[#F2A541] text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-[#F08A4B] transition-colors">
                                Try TaskSync Today
                            </SignInButton>
                        </motion.div>
                    </SignedOut>
                </motion.div>
            </div>
        </div>
    );
}