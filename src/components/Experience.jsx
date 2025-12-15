import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    GraduationCap,
    Calendar,
    MapPin,
    Award,
    TrendingUp,
    Star,
    ChevronDown,
    BookOpen,
    Code2,
    Rocket,
    Sparkles,
    CheckCircle2,
    Trophy,
    Zap,
    Target,
    Users,
    Lightbulb,
    Heart,
    Download
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Your actual education and experience data
const journeyData = [
    {
        year: "2021 - 2025",
        title: "BS Information Technology",
        company: "Cebu Institute of Technology - University",
        location: "Cebu City, Philippines",
        type: "education",
        description: "Pursuing a degree in Information Technology with focus on software development, web technologies, and database management.  Actively participating in coding competitions and building real-world projects.",
        achievements: [
            "Active member of IT Student Organization",
            "Completed 6+ full-stack projects",
            "Participated in 3+ hackathons"
        ],
        skills: ["Web Development", "Database Management", "Software Engineering", "UI/UX Design"],
        color: "from-cyan-500 to-blue-600",
        icon: GraduationCap
    },
    {
        year: "2024",
        title: "Capstone Project Developer",
        company: "Academic Project",
        location: "CIT-U",
        type: "project",
        description: "Led the development of multiple full-stack applications including NeighborNet (community platform), Vocalyx (speech-to-text grading system), and SavorSpace (recipe sharing platform).",
        achievements: [
            "Built NeighborNet - a community connection platform",
            "Developed Vocalyx - speech-to-text grading system",
            "Created SavorSpace - recipe sharing frontend",
            "Implemented Batibot Notes - TypeScript notes app"
        ],
        skills:  ["React", "Kotlin", "Java", "TypeScript", "Firebase", "PostgreSQL"],
        color: "from-purple-500 to-pink-600",
        icon:  Rocket
    },
    {
        year: "2023",
        title: "Hackathon Participant",
        company: "Various Tech Events",
        location: "Cebu, Philippines",
        type:  "achievement",
        description: "Participated in multiple hackathons and coding competitions, collaborating with teams to build innovative solutions under time pressure.  Gained experience in rapid prototyping and teamwork.",
        achievements: [
            "Developed working prototypes in 24-48 hours",
            "Collaborated with diverse team members",
            "Learned to work under pressure",
            "Expanded professional network"
        ],
        skills: ["Teamwork", "Problem Solving", "Rapid Prototyping", "Presentation"],
        color: "from-amber-500 to-orange-600",
        icon: Trophy
    },
    {
        year: "2019 - 2021",
        title: "Senior High School - STEM",
        company: "Senior High School",
        location: "Cebu, Philippines",
        type: "education",
        description: "Completed STEM track with focus on programming fundamentals and mathematics. This is where my passion for coding started through basic programming courses.",
        achievements: [
            "Completed STEM track curriculum",
            "First exposure to programming (Python, Java)",
            "Developed logical thinking skills",
            "Foundation in mathematics and science"
        ],
        skills:  ["Python Basics", "Java Basics", "Mathematics", "Research"],
        color: "from-emerald-500 to-teal-600",
        icon: BookOpen
    }
];

// Timeline Node Component
const TimelineNode = ({ item, index, isActive, onClick, isDark, totalItems }) => {
    const isLast = index === totalItems - 1;
    const IconComponent = item.icon;

    const getTypeBadge = (type) => {
        switch (type) {
            case 'education':
                return { bg: isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600', label: 'Education' };
            case 'project':
                return { bg: isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600', label: 'Project' };
            case 'achievement':
                return { bg: isDark ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-600', label: 'Achievement' };
            default:
                return { bg: isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-600', label:  'Experience' };
        }
    };

    const badge = getTypeBadge(item.type);

    return (
        <motion.div
            className="relative flex items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
        >
            {/* Connector Line */}
            {! isLast && (
                <motion.div
                    className={`absolute left-[19px] top-[48px] w-0.5 h-[calc(100%+24px)] ${
                        isDark ? 'bg-neutral-800' : 'bg-neutral-200'
                    }`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    viewport={{ once:  true }}
                    style={{ transformOrigin: 'top' }}
                />
            )}

            {/* Node Button */}
            <motion.button
                onClick={onClick}
                className={`relative z-10 flex items-center gap-4 w-full p-4 rounded-2xl text-left transition-all ${
                    isActive
                        ? isDark
                            ? 'bg-neutral-800/80'
                            : 'bg-white shadow-lg'
                        : isDark
                            ? 'hover:bg-neutral-800/50'
                            : 'hover:bg-white/50'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Icon Circle */}
                <motion.div
                    className={`relative flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                        isActive
                            ? `bg-gradient-to-br ${item.color} text-white shadow-lg`
                            : isDark
                                ? 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                                : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                    }`}
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                >
                    <IconComponent size={18} />

                    {isActive && (
                        <motion. div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.color}`}
                            animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                            transition={{ duration:  1.5, repeat: Infinity }}
                        />
                    )}
                </motion.div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs font-mono ${
                            isActive
                                ?  isDark ?  'text-cyan-400' : 'text-cyan-600'
                                :  isDark ? 'text-neutral-500' : 'text-neutral-400'
                        }`}>
                            {item.year}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${badge.bg}`}>
                            {badge.label}
                        </span>
                    </div>
                    <h4 className={`font-semibold truncate ${
                        isActive
                            ? isDark ?  'text-white' : 'text-neutral-900'
                            : isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                        {item.title}
                    </h4>
                    <p className={`text-sm truncate ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        {item.company}
                    </p>
                </div>

                {/* Arrow indicator */}
                <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    className={isDark ? 'text-neutral-500' : 'text-neutral-400'}
                >
                    <ChevronDown size={18} />
                </motion.div>
            </motion.button>
        </motion.div>
    );
};

// Detailed Card Component
const JourneyCard = ({ item, isDark }) => {
    const IconComponent = item.icon;

    return (
        <motion. div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y:  0, scale: 1 }}
            exit={{ opacity: 0, y:  -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`relative overflow-hidden rounded-3xl ${
                isDark
                    ? 'bg-neutral-900/60 border border-neutral-800/50'
                    : 'bg-white/80 border border-neutral-200/50 shadow-2xl'
            }`}
        >
            {/* Top gradient bar */}
            <motion.div
                className={`h-1. 5 bg-gradient-to-r ${item.color}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ transformOrigin: 'left' }}
            />

            {/* Header Section */}
            <div className="p-6 md:p-8 pb-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <motion.div
                            className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}
                            initial={{ rotate: -10, scale: 0 }}
                            animate={{ rotate:  0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                        >
                            <IconComponent size={28} />
                        </motion. div>
                        <div>
                            <motion.h3
                                className={`text-xl md:text-2xl font-bold mb-1 ${
                                    isDark ? 'text-white' :  'text-neutral-900'
                                }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {item.title}
                            </motion.h3>
                            <motion.div
                                className="flex items-center gap-3 flex-wrap"
                                initial={{ opacity: 0 }}
                                animate={{ opacity:  1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className={`flex items-center gap-1 text-sm ${
                                    isDark ?  'text-cyan-400' : 'text-cyan-600'
                                }`}>
                                    <GraduationCap size={14} />
                                    {item.company}
                                </span>
                                <span className={`flex items-center gap-1 text-sm ${
                                    isDark ? 'text-neutral-400' : 'text-neutral-500'
                                }`}>
                                    <MapPin size={14} />
                                    {item.location}
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        className={`px-4 py-2 rounded-xl font-mono text-sm w-fit ${
                            isDark
                                ? 'bg-neutral-800 text-neutral-300'
                                : 'bg-neutral-100 text-neutral-600'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Calendar size={14} className="inline mr-2" />
                        {item.year}
                    </motion.div>
                </div>

                {/* Description */}
                <motion.p
                    className={`text-base md:text-lg leading-relaxed mb-6 ${
                        isDark ?  'text-neutral-300' : 'text-neutral-600'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {item.description}
                </motion.p>

                {/* Skills/Technologies */}
                <motion.div
                    className="flex flex-wrap gap-2 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {item. skills.map((skill, index) => (
                        <motion. span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.05 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`px-4 py-2 rounded-xl text-sm font-medium cursor-default ${
                                isDark
                                    ? 'bg-neutral-800/80 text-neutral-300 border border-neutral-700/50'
                                    : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                            }`}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </motion.div>
            </div>

            {/* Highlights Section */}
            <motion.div
                className={`p-6 md:p-8 pt-6 border-t ${
                    isDark ?  'border-neutral-800/50 bg-neutral-900/30' : 'border-neutral-100 bg-neutral-50/50'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <h4 className={`flex items-center gap-2 text-lg font-semibold mb-4 ${
                    isDark ? 'text-white' : 'text-neutral-900'
                }`}>
                    <Star className="text-amber-500" size={20} />
                    Highlights
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                    {item.achievements.map((achievement, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className={`flex items-start gap-3 p-3 rounded-xl ${
                                isDark ?  'bg-neutral-800/50' : 'bg-white'
                            }`}
                            whileHover={{ x: 5 }}
                        >
                            <CheckCircle2 className={`flex-shrink-0 mt-0.5 ${
                                isDark ? 'text-emerald-400' : 'text-emerald-500'
                            }`} size={18} />
                            <span className={`text-sm ${
                                isDark ? 'text-neutral-300' : 'text-neutral-600'
                            }`}>
                                {achievement}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

// What I Bring Section (Replaces Stats)
const WhatIBring = ({ isDark }) => {
    const qualities = [
        { icon:  Lightbulb, title: "Quick Learner", desc: "Adapt fast to new technologies", color: "text-amber-400" },
        { icon: Heart, title: "Passionate", desc: "Love what I do", color: "text-rose-400" },
        { icon: Users, title: "Team Player", desc: "Collaborate effectively", color: "text-blue-400" },
        { icon: Target, title: "Goal-Oriented", desc: "Deliver results", color: "text-emerald-400" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y:  20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`p-6 rounded-3xl mb-12 ${
                isDark
                    ? 'bg-neutral-900/30 border border-neutral-800/50'
                    : 'bg-white/50 border border-neutral-200/50 shadow-lg'
            }`}
        >
            <h3 className={`text-center text-lg font-semibold mb-6 ${
                isDark ? 'text-white' : 'text-neutral-900'
            }`}>
                💼 What I Bring to Your Team
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {qualities.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`text-center p-4 rounded-2xl transition-all ${
                            isDark
                                ? 'bg-neutral-800/30 hover:bg-neutral-800/50'
                                : 'bg-white/50 hover:bg-white shadow-sm'
                        }`}
                        whileHover={{ y: -5 }}
                    >
                        <motion.div
                            className={`inline-flex p-3 rounded-xl mb-3 ${
                                isDark ?  'bg-neutral-800' : 'bg-neutral-100'
                            }`}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <item.icon className={`w-6 h-6 ${item. color}`} />
                        </motion.div>
                        <h4 className={`font-semibold mb-1 ${
                            isDark ? 'text-white' : 'text-neutral-900'
                        }`}>
                            {item.title}
                        </h4>
                        <p className={`text-xs ${
                            isDark ? 'text-neutral-500' : 'text-neutral-400'
                        }`}>
                            {item.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [activeIndex, setActiveIndex] = useState(0);

    const floatingIcons = [
        { icon: Star, x: '5%', y: '20%', delay: 0 },
        { icon: TrendingUp, x: '92%', y: '15%', delay: 0.5 },
        { icon:  Rocket, x: '88%', y: '75%', delay: 1 },
        { icon: Code2, x: '8%', y: '80%', delay: 1.5 },
    ];

    return (
        <section
            id="experience"
            ref={containerRef}
            className="py-24 md:py-36 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {/* Gradient orbs - Static for performance */}
                <div className={`absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[150px] ${
                    isDark ? 'bg-purple-500/10' : 'bg-purple-500/15'
                }`} />
                <div className={`absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[150px] ${
                    isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/15'
                }`} />

                {/* Grid pattern */}
                <div className={`absolute inset-0 ${
                    isDark
                        ? 'bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)]'
                        : 'bg-[linear-gradient(rgba(168,85,247,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.07)_1px,transparent_1px)]'
                } bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]`} />

                {/* Floating icons */}
                {floatingIcons. map(({ icon: Icon, x, y, delay }, index) => (
                    <motion.div
                        key={index}
                        className={`absolute hidden md:block ${
                            isDark ? 'text-neutral-800' : 'text-neutral-300'
                        }`}
                        style={{ left: x, top: y }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? {
                            opacity: [0.3, 0.5, 0.3],
                            y: [0, -10, 0],
                        } : {}}
                        transition={{
                            duration: 6,
                            delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Icon size={30} strokeWidth={1} />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10">
                {/* Section Header */}
                <motion. div
                    initial={{ opacity: 0, y:  30 }}
                    animate={isInView ? { opacity:  1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6 ${
                            isDark
                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                : 'bg-purple-500/10 text-purple-600 border border-purple-500/30'
                        }`}
                    >
                        <TrendingUp size={16} />
                        <span>My Journey</span>
                    </motion.div>

                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                        isDark ?  'text-white' : 'text-neutral-900'
                    }`}>
                        Education &{' '}
                        <span className="relative inline-block">
                            <span className="text-gradient">Experience</span>
                            <motion.span
                                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                        My academic journey and the projects that shaped me as a developer 📚
                    </p>
                </motion.div>

                {/* What I Bring Section (Replaces Stats) */}
                <WhatIBring isDark={isDark} />

                {/* Main Content - Timeline + Details */}
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Timeline Navigation */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity:  1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`lg:col-span-2 p-6 rounded-3xl h-fit ${
                            isDark
                                ? 'bg-neutral-900/30 border border-neutral-800/50'
                                : 'bg-white/50 border border-neutral-200/50 shadow-xl'
                        }`}
                    >
                        <h3 className={`flex items-center gap-2 text-lg font-semibold mb-6 ${
                            isDark ?  'text-white' : 'text-neutral-900'
                        }`}>
                            <Calendar className={isDark ? 'text-cyan-400' : 'text-cyan-600'} size={20} />
                            Timeline
                        </h3>
                        <div className="space-y-2">
                            {journeyData.map((item, index) => (
                                <TimelineNode
                                    key={index}
                                    item={item}
                                    index={index}
                                    isActive={activeIndex === index}
                                    onClick={() => setActiveIndex(index)}
                                    isDark={isDark}
                                    totalItems={journeyData.length}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Detailed Card */}
                    <motion. div
                        initial={{ opacity:  0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration:  0.6, delay: 0.3 }}
                        className="lg:col-span-3"
                    >
                        <AnimatePresence mode="wait">
                            <JourneyCard
                                key={activeIndex}
                                item={journeyData[activeIndex]}
                                isDark={isDark}
                            />
                        </AnimatePresence>
                    </motion. div>
                </div>
            </div>
        </section>
    );
};

export default Experience;