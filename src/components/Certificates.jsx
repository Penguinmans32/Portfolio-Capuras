import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
    Award,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Calendar,
    Building2,
    BadgeCheck,
    Sparkles,
    GripHorizontal,
    X,
    ZoomIn,
    Download,
    GitBranch,
    Database,
    Server,
    GitCommit,
    GitMerge,
    GitPullRequest,
    Table,
    HardDrive
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Your certificates data - UPDATE THIS with your actual certificates
const certificatesData = [
    {
        id:  1,
        title: "React. js Essential Training",
        issuer: "LinkedIn Learning",
        date: "2024",
        image: "/certificates/Architect.jpg",
        credentialId: "ABC123XYZ",
        skills: ["React", "JavaScript", "Web Development"],
        color: "from-cyan-500 to-blue-600",
        hasRealImage: true,
    },
    {
        id:  2,
        title: "JavaScript Algorithms and Data Structures",
        issuer: "freeCodeCamp",
        date: "2024",
        image: "/certificates/Cloud.jpg",
        credentialId: "FCC-JS-2024",
        skills: ["JavaScript", "Algorithms", "Problem Solving"],
        color: "from-amber-500 to-orange-600",
        hasRealImage:  true,
    },
    {
        id: 3,
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        date: "2023",
        image: "/certificates/hackathon.jpg",
        credentialId: "FCC-RWD-2023",
        skills: ["HTML", "CSS", "Responsive Design"],
        color: "from-purple-500 to-pink-600",
        hasRealImage:  true,
    },
    {
        id: 4,
        title: "Python for Everybody",
        issuer: "Coursera",
        date: "2023",
        image: "/certificates/C programming.jpg",
        credentialId: "COURSERA-PY-2023",
        skills: ["Python", "Programming", "Data"],
        color: "from-emerald-500 to-teal-600",
        hasRealImage: true,
    },
    {
        id: 5,
        title: "Git & GitHub Fundamentals",
        issuer: "Udemy",
        date: "2023",
        image: "/certificates/git-cert.jpg",
        credentialId: "UDEMY-GIT-2023",
        skills:  ["Git", "GitHub", "Version Control"],
        color: "from-rose-500 to-red-600",
        hasRealImage: false, // No real image - use fallback
        fallbackType: "git",
    },
    {
        id: 6,
        title: "Database Management Fundamentals",
        issuer: "Coursera",
        date: "2024",
        image: "/certificates/db-cert.jpg",
        credentialId: "COURSERA-DB-2024",
        skills: ["SQL", "Database", "PostgreSQL"],
        color: "from-indigo-500 to-violet-600",
        hasRealImage: false, // No real image - use fallback
        fallbackType: "database",
    },
];

// Git Certificate Fallback Component
const GitCertificateFallback = ({ certificate, isDark }) => {
    return (
        <div className={`relative w-full h-full overflow-hidden ${
            isDark ? 'bg-neutral-900' : 'bg-neutral-50'
        }`}>
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${certificate.color} opacity-10`} />
            
            {/* Animated Background Pattern - Git Branches */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
                {/* Main branch line */}
                <motion.line
                    x1="50" y1="180" x2="50" y2="20"
                    stroke={isDark ? "#f43f5e" : "#e11d48"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                
                {/* Branch 1 */}
                <motion.path
                    d="M 50 140 Q 100 140 120 100"
                    stroke={isDark ? "#fb7185" : "#f43f5e"}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.line
                    x1="120" y1="100" x2="120" y2="60"
                    stroke={isDark ? "#fb7185" : "#f43f5e"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                />
                
                {/* Branch 2 */}
                <motion.path
                    d="M 50 100 Q 150 100 180 60"
                    stroke={isDark ? "#fda4af" : "#fb7185"}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength:  1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                />
                
                {/* Merge back */}
                <motion.path
                    d="M 120 60 Q 85 40 50 50"
                    stroke={isDark ? "#fb7185" : "#f43f5e"}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="5,5"
                    initial={{ pathLength:  0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 2 }}
                />

                {/* Commit dots on main */}
                {[180, 140, 100, 50, 20].map((y, i) => (
                    <motion.circle
                        key={`main-${i}`}
                        cx="50"
                        cy={y}
                        r="6"
                        fill={isDark ? "#f43f5e" : "#e11d48"}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.2, type: "spring" }}
                    />
                ))}
                
                {/* Commit dots on branches */}
                <motion.circle cx="120" cy="100" r="5" fill={isDark ? "#fb7185" : "#f43f5e"}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6, type: "spring" }} />
                <motion.circle cx="120" cy="60" r="5" fill={isDark ? "#fb7185" : "#f43f5e"}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2, type: "spring" }} />
                <motion.circle cx="180" cy="60" r="5" fill={isDark ? "#fda4af" : "#fb7185"}
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8, type: "spring" }} />
            </svg>

            {/* Floating Git Icons */}
            <motion.div
                className="absolute top-4 right-4"
                animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className={`p-2 rounded-lg ${isDark ? 'bg-rose-500/20' : 'bg-rose-100'}`}>
                    <GitBranch className={`w-5 h-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-16 right-8"
                animate={{ y: [0, 5, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <div className={`p-2 rounded-lg ${isDark ?  'bg-rose-500/20' : 'bg-rose-100'}`}>
                    <GitMerge className={`w-4 h-4 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
                </div>
            </motion.div>

            <motion.div
                className="absolute top-12 left-20"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <div className={`p-1. 5 rounded-lg ${isDark ? 'bg-rose-500/20' : 'bg-rose-100'}`}>
                    <GitCommit className={`w-4 h-4 ${isDark ?  'text-rose-400' : 'text-rose-600'}`} />
                </div>
            </motion.div>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale:  1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                    {/* Glow effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl blur-xl opacity-40"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Icon container */}
                    <div className="relative p-5 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 shadow-2xl">
                        <GitBranch className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>
                </motion.div>

                <motion.h4
                    className={`mt-4 text-sm font-bold text-center px-4 ${
                        isDark ? 'text-white' : 'text-neutral-900'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Git & GitHub
                </motion.h4>

                <motion.p
                    className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}
                    initial={{ opacity:  0 }}
                    animate={{ opacity:  1 }}
                    transition={{ delay: 0.6 }}
                >
                    Version Control Mastery
                </motion.p>

                <motion.div
                    className={`mt-3 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        isDark ?  'bg-rose-500/20 text-rose-400' :  'bg-rose-100 text-rose-600'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <BadgeCheck size={12} />
                    Verified
                </motion.div>
            </div>

            {/* Corner decorations */}
            <div className={`absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 rounded-tl-lg ${
                isDark ? 'border-rose-500/30' : 'border-rose-400/40'
            }`} />
            <div className={`absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 rounded-tr-lg ${
                isDark ? 'border-rose-500/30' : 'border-rose-400/40'
            }`} />
            <div className={`absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 rounded-bl-lg ${
                isDark ?  'border-rose-500/30' : 'border-rose-400/40'
            }`} />
            <div className={`absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 rounded-br-lg ${
                isDark ? 'border-rose-500/30' : 'border-rose-400/40'
            }`} />
        </div>
    );
};

// Database Certificate Fallback Component
const DatabaseCertificateFallback = ({ certificate, isDark }) => {
    return (
        <div className={`relative w-full h-full overflow-hidden ${
            isDark ? 'bg-neutral-900' : 'bg-neutral-50'
        }`}>
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${certificate.color} opacity-10`} />

            {/* Animated Database Visualization */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
                {/* Database cylinder - back */}
                <motion.ellipse
                    cx="150" cy="50" rx="60" ry="15"
                    fill="none"
                    stroke={isDark ?  "#818cf8" : "#6366f1"}
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration:  1 }}
                />
                
                {/* Database cylinder - sides */}
                <motion.line
                    x1="90" y1="50" x2="90" y2="140"
                    stroke={isDark ? "#818cf8" : "#6366f1"}
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                />
                <motion.line
                    x1="210" y1="50" x2="210" y2="140"
                    stroke={isDark ?  "#818cf8" : "#6366f1"}
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength:  1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                />
                
                {/* Database cylinder - bottom */}
                <motion.ellipse
                    cx="150" cy="140" rx="60" ry="15"
                    fill="none"
                    stroke={isDark ? "#818cf8" : "#6366f1"}
                    strokeWidth="2"
                    initial={{ pathLength:  0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                />

                {/* Data rows inside */}
                {[70, 90, 110]. map((y, i) => (
                    <motion.ellipse
                        key={i}
                        cx="150" cy={y} rx="55" ry="12"
                        fill="none"
                        stroke={isDark ? "#a5b4fc" : "#818cf8"}
                        strokeWidth="1"
                        strokeDasharray="4,4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1.5 + i * 0.2 }}
                    />
                ))}

                {/* Animated data flow particles */}
                {[0, 1, 2].map((i) => (
                    <motion.circle
                        key={`particle-${i}`}
                        r="3"
                        fill={isDark ? "#c4b5fd" : "#a78bfa"}
                        initial={{ cx: 150, cy: 30 }}
                        animate={{
                            cy: [30, 80, 130, 150],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.7,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </svg>

            {/* Floating Icons */}
            <motion.div
                className="absolute top-4 left-4"
                animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'}`}>
                    <Database className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-16 left-8"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <div className={`p-2 rounded-lg ${isDark ? 'bg-violet-500/20' : 'bg-violet-100'}`}>
                    <Table className={`w-4 h-4 ${isDark ? 'text-violet-400' :  'text-violet-600'}`} />
                </div>
            </motion.div>

            <motion.div
                className="absolute top-12 right-8"
                animate={{ y:  [0, -3, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 2, repeat:  Infinity, ease: "easeInOut", delay: 1 }}
            >
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'}`}>
                    <Server className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-20 right-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease:  "easeInOut", delay:  0.3 }}
            >
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-violet-500/20' : 'bg-violet-100'}`}>
                    <HardDrive className={`w-4 h-4 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                </div>
            </motion.div>

            {/* SQL Code snippet decoration */}
            <motion.div
                className={`absolute bottom-4 left-4 right-4 p-2 rounded-lg font-mono text-[10px] leading-tight ${
                    isDark ? 'bg-black/30 text-indigo-300/70' : 'bg-white/50 text-indigo-600/70'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <span className="text-pink-400">SELECT</span> * <span className="text-pink-400">FROM</span> skills;
            </motion.div>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                    {/* Glow effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl blur-xl opacity-40"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Icon container */}
                    <div className="relative p-5 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl">
                        <Database className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>
                </motion. div>

                <motion.h4
                    className={`mt-4 text-sm font-bold text-center px-4 ${
                        isDark ? 'text-white' : 'text-neutral-900'
                    }`}
                    initial={{ opacity: 0, y:  10 }}
                    animate={{ opacity: 1, y:  0 }}
                    transition={{ delay: 0.5 }}
                >
                    Database Management
                </motion.h4>

                <motion.p
                    className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity:  1 }}
                    transition={{ delay: 0.6 }}
                >
                    SQL & PostgreSQL
                </motion.p>

                <motion.div
                    className={`mt-3 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        isDark ?  'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                    }`}
                    initial={{ opacity:  0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <BadgeCheck size={12} />
                    Verified
                </motion.div>
            </div>

            {/* Corner decorations */}
            <div className={`absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 rounded-tl-lg ${
                isDark ? 'border-indigo-500/30' : 'border-indigo-400/40'
            }`} />
            <div className={`absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 rounded-tr-lg ${
                isDark ? 'border-indigo-500/30' : 'border-indigo-400/40'
            }`} />
            <div className={`absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 rounded-bl-lg ${
                isDark ? 'border-indigo-500/30' : 'border-indigo-400/40'
            }`} />
            <div className={`absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 rounded-br-lg ${
                isDark ? 'border-indigo-500/30' : 'border-indigo-400/40'
            }`} />
        </div>
    );
};

// Certificate Card Component
const CertificateCard = ({ certificate, index, isDark, onClick, isActive }) => {
    const [imageError, setImageError] = useState(false);
    const showFallback = !certificate.hasRealImage || imageError;

    return (
        <motion.div
            className={`relative flex-shrink-0 w-[300px] md:w-[350px] cursor-pointer ${
                isActive ? 'z-10' : 'z-0'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isActive ? 1 : 0.7,
                scale: isActive ?  1 : 0.9,
            }}
            whileHover={{ scale: isActive ? 1.02 : 0.95 }}
            transition={{ duration:  0.3 }}
            onClick={onClick}
        >
            <div
                className={`relative h-full rounded-3xl overflow-hidden ${
                    isDark
                        ? 'bg-neutral-900/60 border border-neutral-800/50'
                        : 'bg-white/80 border border-neutral-200/50 shadow-xl'
                }`}
            >
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${certificate.color}`} />

                {/* Certificate Preview Image */}
                <div className={`relative h-48 overflow-hidden ${
                    isDark ? 'bg-neutral-800/50' : 'bg-neutral-100'
                }`}>
                    {/* Show fallback for certificates 5 and 6 */}
                    {showFallback ?  (
                        certificate.fallbackType === 'git' ?  (
                            <GitCertificateFallback certificate={certificate} isDark={isDark} />
                        ) : certificate.fallbackType === 'database' ? (
                            <DatabaseCertificateFallback certificate={certificate} isDark={isDark} />
                        ) : (
                            // Generic fallback
                            <div className={`w-full h-full flex items-center justify-center ${
                                isDark ? 'bg-neutral-800' : 'bg-neutral-100'
                            }`}>
                                <Award className={`w-16 h-16 ${isDark ? 'text-neutral-600' : 'text-neutral-300'}`} />
                            </div>
                        )
                    ) : (
                        <>
                            {/* Real certificate image */}
                            <img
                                src={certificate.image}
                                alt={certificate. title}
                                className="w-full h-full object-cover"
                                onError={() => setImageError(true)}
                            />
                            
                            {/* Zoom icon on hover */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity"
                            >
                                <div className={`p-3 rounded-full ${
                                    isDark ?  'bg-white/20' : 'bg-black/20'
                                }`}>
                                    <ZoomIn className="w-6 h-6 text-white" />
                                </div>
                            </motion.div>
                        </>
                    )}

                    {/* Date badge */}
                    <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-mono backdrop-blur-md ${
                        isDark
                            ? 'bg-black/40 text-white border border-white/10'
                            : 'bg-white/80 text-neutral-800 shadow-lg'
                    }`}>
                        <Calendar size={12} className="inline mr-1" />
                        {certificate.date}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Title */}
                    <h3 className={`font-bold text-lg mb-2 line-clamp-2 ${
                        isDark ?  'text-white' : 'text-neutral-900'
                    }`}>
                        {certificate.title}
                    </h3>

                    {/* Issuer */}
                    <div className={`flex items-center gap-2 mb-3 ${
                        isDark ? 'text-cyan-400' : 'text-cyan-600'
                    }`}>
                        <Building2 size={14} />
                        <span className="text-sm font-medium">{certificate.issuer}</span>
                        <BadgeCheck size={14} className="text-emerald-500" />
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1. 5">
                        {certificate.skills. slice(0, 3).map((skill) => (
                            <span
                                key={skill}
                                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                    isDark
                                        ? 'bg-neutral-800 text-neutral-400'
                                        : 'bg-neutral-100 text-neutral-600'
                                }`}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Full Certificate Modal
const CertificateModal = ({ certificate, isOpen, onClose, isDark }) => {
    if (!certificate) return null;

    const showFallback = !certificate.hasRealImage;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity:  0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion. div
                        className={`relative w-full max-w-3xl max-h-[90vh] overflow-auto rounded-3xl ${
                            isDark
                                ? 'bg-neutral-900 border border-neutral-800'
                                : 'bg-white border border-neutral-200 shadow-2xl'
                        }`}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-colors ${
                                isDark
                                    ? 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'
                                    : 'bg-neutral-100 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200'
                            }`}
                        >
                            <X size={20} />
                        </button>

                        {/* Top gradient bar */}
                        <div className={`h-2 bg-gradient-to-r ${certificate.color}`} />

                        {/* Certificate Image or Fallback */}
                        <div className={`relative h-64 md:h-80 ${
                            isDark ?  'bg-neutral-800' : 'bg-neutral-100'
                        }`}>
                            {showFallback ?  (
                                certificate.fallbackType === 'git' ? (
                                    <GitCertificateFallback certificate={certificate} isDark={isDark} />
                                ) : certificate.fallbackType === 'database' ?  (
                                    <DatabaseCertificateFallback certificate={certificate} isDark={isDark} />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center`}>
                                        <Award className={`w-20 h-20 ${isDark ? 'text-neutral-600' : 'text-neutral-300'}`} />
                                    </div>
                                )
                            ) : (
                                <img
                                    src={certificate.image}
                                    alt={certificate.title}
                                    className="w-full h-full object-contain"
                                />
                            )}
                        </div>

                        {/* Details */}
                        <div className="p-6 md:p-8">
                            <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                    <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${
                                        isDark ? 'text-white' : 'text-neutral-900'
                                    }`}>
                                        {certificate. title}
                                    </h2>
                                    <div className={`flex items-center gap-2 ${
                                        isDark ? 'text-cyan-400' : 'text-cyan-600'
                                    }`}>
                                        <Building2 size={18} />
                                        <span className="font-medium">{certificate.issuer}</span>
                                        <BadgeCheck size={18} className="text-emerald-500" />
                                    </div>
                                </div>
                                <div className={`px-4 py-2 rounded-xl font-mono text-sm ${
                                    isDark
                                        ? 'bg-neutral-800 text-neutral-300'
                                        : 'bg-neutral-100 text-neutral-600'
                                }`}>
                                    <Calendar size={14} className="inline mr-2" />
                                    {certificate. date}
                                </div>
                            </div>

                            {/* Credential ID */}
                            {certificate.credentialId && (
                                <div className={`mb-4 p-3 rounded-xl ${
                                    isDark ?  'bg-neutral-800/50' : 'bg-neutral-50'
                                }`}>
                                    <span className={`text-xs font-mono ${
                                        isDark ?  'text-neutral-500' : 'text-neutral-400'
                                    }`}>
                                        Credential ID: 
                                    </span>
                                    <span className={`ml-2 text-sm font-medium ${
                                        isDark ? 'text-neutral-300' : 'text-neutral-700'
                                    }`}>
                                        {certificate.credentialId}
                                    </span>
                                </div>
                            )}

                            {/* Skills */}
                            <div className="mb-6">
                                <h4 className={`text-sm font-semibold mb-2 ${
                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}>
                                    Skills Covered
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {certificate. skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className={`px-3 py-1.5 rounded-xl text-sm font-medium ${
                                                isDark
                                                    ?  'bg-neutral-800 text-neutral-300 border border-neutral-700'
                                                    : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                                            }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3">
                                {certificate.hasRealImage && (
                                    <motion.a
                                        href={certificate. image}
                                        download
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Download size={18} />
                                        Download
                                    </motion.a>
                                )}
                                {certificate.verifyUrl && (
                                    <motion.a
                                        href={certificate.verifyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium border-2 transition-all ${
                                            isDark
                                                ? 'border-neutral-700 text-neutral-300 hover:border-cyan-500'
                                                :  'border-neutral-200 text-neutral-700 hover:border-cyan-500'
                                        }`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ExternalLink size={18} />
                                        Verify
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Certificates = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const containerRef = useRef(null);
    const carouselRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCert, setSelectedCert] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const totalCerts = certificatesData.length;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalCerts);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalCerts) % totalCerts);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleDragEnd = (event, info) => {
        const threshold = 50;
        if (info.offset.x > threshold) {
            prevSlide();
        } else if (info.offset.x < -threshold) {
            nextSlide();
        }
        setIsDragging(false);
    };

    return (
        <section
            id="certificates"
            ref={containerRef}
            className="py-24 md:py-36 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[150px] ${
                    isDark ?  'bg-amber-500/10' : 'bg-amber-500/15'
                }`} />
                <div className={`absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-[150px] ${
                    isDark ?  'bg-purple-500/10' : 'bg-purple-500/15'
                }`} />
            </div>

            <div className="relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y:  30 }}
                    animate={isInView ? { opacity: 1, y: 0 } :  {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6 ${
                            isDark
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                : 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                        }`}
                    >
                        <Award size={16} />
                        <span>Achievements</span>
                    </motion.div>

                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                        isDark ?  'text-white' : 'text-neutral-900'
                    }`}>
                        Certificates &{' '}
                        <span className="relative inline-block">
                            <span className="text-gradient">Credentials</span>
                            <motion.span
                                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto mb-4 ${
                        isDark ?  'text-neutral-400' : 'text-neutral-600'
                    }`}>
                        Swipe or drag to explore my certifications and achievements 👆
                    </p>

                    {/* Swipe hint */}
                    <motion.div
                        className={`inline-flex items-center gap-2 text-sm ${
                            isDark ?  'text-neutral-500' : 'text-neutral-400'
                        }`}
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <GripHorizontal size={16} />
                        <span>Drag to swipe</span>
                    </motion.div>
                </motion.div>

                {/* Carousel Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative"
                >
                    {/* Navigation Buttons */}
                    <div className="hidden md:block">
                        <motion.button
                            onClick={prevSlide}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-3 rounded-full transition-all ${
                                isDark
                                    ? 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 border border-neutral-700'
                                    : 'bg-white text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 shadow-lg border border-neutral-200'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                            onClick={nextSlide}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-3 rounded-full transition-all ${
                                isDark
                                    ? 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 border border-neutral-700'
                                    : 'bg-white text-neutral-500 hover: text-neutral-900 hover: bg-neutral-50 shadow-lg border border-neutral-200'
                            }`}
                            whileHover={{ scale:  1.1 }}
                            whileTap={{ scale:  0.95 }}
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    </div>

                    {/* Carousel */}
                    <div
                        ref={carouselRef}
                        className="overflow-hidden px-4 md:px-12"
                    >
                        <motion.div
                            className="flex gap-6 py-8"
                            drag="x"
                            dragConstraints={{ left: -((totalCerts - 1) * 370), right: 0 }}
                            dragElastic={0.1}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={handleDragEnd}
                            animate={{
                                x: -currentIndex * 370,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                        >
                            {certificatesData.map((cert, index) => (
                                <CertificateCard
                                    key={cert.id}
                                    certificate={cert}
                                    index={index}
                                    isDark={isDark}
                                    isActive={index === currentIndex}
                                    onClick={() => {
                                        if (! isDragging) {
                                            if (index === currentIndex) {
                                                setSelectedCert(cert);
                                            } else {
                                                goToSlide(index);
                                            }
                                        }
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {certificatesData.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all ${
                                    index === currentIndex
                                        ?  `w-8 ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`
                                        : `w-2 ${isDark ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-neutral-300 hover:bg-neutral-400'}`
                                }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>

                    {/* Counter */}
                    <div className={`text-center mt-4 font-mono text-sm ${
                        isDark ?  'text-neutral-500' : 'text-neutral-400'
                    }`}>
                        <span className={isDark ? 'text-cyan-400' : 'text-cyan-600'}>
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
                        <span> / </span>
                        <span>{String(totalCerts).padStart(2, '0')}</span>
                    </div>
                </motion.div>

                {/* Summary Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } :  {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className={`mt-16 p-6 rounded-3xl text-center ${
                        isDark
                            ? 'bg-neutral-900/30 border border-neutral-800/50'
                            : 'bg-white/50 border border-neutral-200/50 shadow-lg'
                    }`}
                >
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        <div>
                            <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                                isDark ?  'text-white' : 'text-neutral-900'
                            }`}>
                                {certificatesData.length}+
                            </div>
                            <div className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                Certificates Earned
                            </div>
                        </div>
                        <div>
                            <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                                isDark ? 'text-white' : 'text-neutral-900'
                            }`}>
                                {new Set(certificatesData.map(c => c.issuer)).size}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                Platforms
                            </div>
                        </div>
                        <div>
                            <div className={`text-3xl md:text-4xl font-bold mb-1 ${
                                isDark ? 'text-white' :  'text-neutral-900'
                            }`}>
                                {new Set(certificatesData.flatMap(c => c.skills)).size}+
                            </div>
                            <div className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                Skills Validated
                            </div>
                        </div>
                    </div>

                    {/* Always learning badge */}
                    <motion. div
                        className={`inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full text-sm ${
                            isDark
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        }`}
                        whileHover={{ scale:  1.05 }}
                    >
                        <Sparkles size={16} />
                        <span>Always learning & growing! </span>
                    </motion. div>
                </motion.div>
            </div>

            {/* Certificate Modal */}
            <CertificateModal
                certificate={selectedCert}
                isOpen={!!selectedCert}
                onClose={() => setSelectedCert(null)}
                isDark={isDark}
            />
        </section>
    );
};

export default Certificates;