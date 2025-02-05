'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Calendar, User, MessageSquare, Clock, Trash2 } from 'lucide-react';

const ContactPage = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedSubmissions = localStorage.getItem('contactSubmissions');
        if (storedSubmissions) {
            setSubmissions(JSON.parse(storedSubmissions));
        }
        setLoading(false);
    }, []);

    const deleteSubmission = (id) => {
        const updatedSubmissions = submissions.filter(submission => submission.id !== id);
        setSubmissions(updatedSubmissions);
        localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="relative w-24 h-24">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute top-2 left-2 w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin-slow"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                        Contact Submissions
                    </h1>
                    <p className="text-gray-400 text-lg">
                        View and manage all your contact form submissions
                    </p>
                </motion.div>

                {/* Stats Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-500/20 p-3 rounded-lg">
                                <MessageSquare className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-gray-400">Total Messages</p>
                                <p className="text-2xl font-bold text-white">{submissions.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="bg-purple-500/20 p-3 rounded-lg">
                                <Clock className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-gray-400">Latest Message</p>
                                <p className="text-2xl font-bold text-white">
                                    {submissions.length > 0 ? new Date(submissions[0].timestamp).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-500/20 p-3 rounded-lg">
                                <User className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <p className="text-gray-400">Unique Senders</p>
                                <p className="text-2xl font-bold text-white">
                                    {new Set(submissions.map(s => s.email)).size}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {submissions.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-gray-800/50 rounded-xl p-12 text-center backdrop-blur-sm border border-gray-700"
                    >
                        <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No submissions yet</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid gap-6"
                    >
                        {submissions.map((submission) => (
                            <motion.div
                                key={submission.id}
                                variants={item}
                                className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-colors duration-300"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
                                                <User className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-semibold text-white">
                                                    {submission.full_name}
                                                </h2>
                                                <p className="text-gray-400">{submission.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 text-gray-400">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">
                                                {new Date(submission.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-gray-900/50 rounded-lg p-4">
                                            <p className="text-gray-400 font-medium mb-2">Subject</p>
                                            <p className="text-white">{submission.subject}</p>
                                        </div>
                                        <div className="bg-gray-900/50 rounded-lg p-4">
                                            <p className="text-gray-400 font-medium mb-2">Message</p>
                                            <p className="text-white whitespace-pre-wrap">{submission.message}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteSubmission(submission.id)}
                                            className="flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors duration-200"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ContactPage;