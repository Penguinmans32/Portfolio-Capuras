import React, { useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    MapPin,
    GraduationCap,
    Mail,
    Sparkles,
    Code2,
    Coffee,
    Heart,
    Terminal,
    ChevronRight,
    Zap,
    Globe,
    Rocket,
    Brain,
    BookOpen,
    GitBranch,
    Star,
    Trophy,
    Users,
    Clock,
    Target
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once:  true, margin: "-100px" });

    const [hoveredStat, setHoveredStat] = useState(null);
    const [activeTab, setActiveTab] = useState('story');

    // 3D card tilt effect
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping:  30 });

    const handleMouseMove = (e) => {
        if (! cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Student-appropriate stats
    const stats = [
        { icon: Clock, label: 'Coding', value: '2+', suffix: 'Years', color: 'from-cyan-400 to-blue-500' },
        { icon: Code2, label: 'Projects', value: '6+', suffix:  'Completed', color: 'from-purple-400 to-pink-500' },
        { icon:  Trophy, label: 'Hackathons', value: '3+', suffix: 'Joined', color: 'from-amber-400 to-orange-500' },
        { icon: BookOpen, label: 'Learning', value: '∞', suffix: 'Always', color: 'from-emerald-400 to-teal-500' },
    ];

    // Student-appropriate info
    const infoItems = [
        { icon: MapPin, label: 'Location', value: 'Philippines', color: 'text-emerald-400' },
        { icon: GraduationCap, label:  'Education', value: 'BS Information Technology', color: 'text-blue-400' },
        { icon: Mail, label: 'Email', value: 'vanesscapuras@gmail.com', color: 'text-purple-400' },
        { icon: Target, label: 'Goal', value: 'OJT / Internship 2025', color: 'text-amber-400' },
    ];

    const tabs = [
        { id: 'story', label: 'My Story', icon: Terminal },
        { id: 'journey', label: 'Journey', icon: Rocket },
        { id: 'goals', label: 'Goals', icon: Target },
    ];

    const tabContent = {
        story: {
            title: "Hey, I'm Vaness!  👋",
            paragraphs: [
                "I'm a passionate IT student who discovered the magic of coding and never looked back. What started as curiosity about how websites work has turned into a genuine love for building digital experiences.",
                "I spend most of my free time experimenting with new technologies, contributing to school projects, and building personal projects that challenge me to grow.  Every bug I fix and every feature I ship teaches me something new.",
                "I believe that being a student is actually a superpower — I'm not afraid to ask questions, try new things, and learn from mistakes. That's how the best developers are made!  🚀"
            ]
        },
        journey: {
            title: "My Learning Journey",
            paragraphs:  [
                "Started with HTML & CSS in freshman year, got hooked when I built my first responsive website.  The feeling of creating something from scratch was incredible! ",
                "Dove into JavaScript and React, then expanded to mobile development with Kotlin and backend with Java and Python. Every new language opened up new possibilities.",
                "Now I'm combining everything I've learned to build full-stack applications. Each project has been a stepping stone, and I'm excited for what's next!"
            ]
        },
        goals: {
            title: "What I'm Looking For",
            paragraphs: [
                "I'm actively seeking an OJT/internship opportunity where I can contribute to real-world projects while learning from experienced developers.",
                "I bring fresh perspectives, dedication, and an eagerness to learn. I'm not afraid of challenges — in fact, I thrive on them! ",
                "My goal is to grow into a well-rounded developer who can build products that make a positive impact. I'm ready to put in the work!"
            ]
        }
    };

    const floatingElements = [
        { icon: GitBranch, x: '5%', y: '20%', delay: 0 },
        { icon: Star, x: '95%', y: '30%', delay: 0.5 },
        { icon:  Zap, x: '90%', y: '70%', delay: 1 },
        { icon: Globe, x: '8%', y: '75%', delay: 1.5 },
    ];

    const containerVariants = {
        hidden:  { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren:  0.1,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    // Skills I'm learning / have learned
    const skills = ['React', 'TypeScript', 'Kotlin', 'Java', 'Python', 'Tailwind'];

    return (
        <section
            id="about"
            ref={containerRef}
            className="py-24 md:py-36 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                {/* Gradient Orbs - Static for better performance */}
                <div
                    className={`absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[150px] ${
                        isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/20'
                    }`}
                />
                <div
                    className={`absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[150px] ${
                        isDark ? 'bg-purple-500/10' : 'bg-purple-500/20'
                    }`}
                />

                {/* Floating Icons */}
                {floatingElements.map(({ icon: Icon, x, y, delay }, index) => (
                    <motion.div
                        key={index}
                        className={`absolute hidden md:block ${
                            isDark ? 'text-neutral-700/50' : 'text-neutral-300/70'
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
                        <Icon size={28} strokeWidth={1} />
                    </motion.div>
                ))}
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative z-10"
            >
                {/* Section Header */}
                <motion. div variants={itemVariants} className="text-center mb-16">
                    <motion.div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6 ${
                            isDark
                                ?  'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                : 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/30'
                        }`}
                    >
                        <Brain size={16} />
                        <span>Get to know me</span>
                    </motion.div>

                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                        isDark ?  'text-white' : 'text-neutral-900'
                    }`}>
                        About{' '}
                        <span className="relative inline-block">
                            <span className="text-gradient">Me</span>
                            <motion.span
                                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                        A curious student passionate about building things that matter
                    </p>
                </motion.div>

                {/* Stats Bar */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 md: grid-cols-4 gap-4 mb-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className={`relative p-6 rounded-2xl text-center overflow-hidden group cursor-pointer ${
                                isDark
                                    ? 'bg-neutral-900/50 border border-neutral-800/50'
                                    : 'bg-white/60 border border-neutral-200/50 shadow-lg'
                            }`}
                            onMouseEnter={() => setHoveredStat(index)}
                            onMouseLeave={() => setHoveredStat(null)}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Hover gradient background */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            />

                            {/* Icon */}
                            <motion.div
                                className={`inline-flex p-3 rounded-xl mb-3 ${
                                    isDark ?  'bg-neutral-800/50' : 'bg-neutral-100'
                                }`}
                                animate={hoveredStat === index ? { rotate: [0, -10, 10, 0] } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <stat.icon 
                                    className="w-6 h-6" 
                                    style={{
                                        color: index === 0 ? '#22d3ee' : index === 1 ? '#c084fc' : index === 2 ? '#fbbf24' : '#34d399'
                                    }} 
                                />
                            </motion.div>

                            {/* Value */}
                            <motion. div
                                className={`text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={isInView ? { opacity: 1, scale: 1 } :  {}}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            >
                                {stat.value}
                            </motion.div>

                            <div className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
                                {stat.suffix}
                            </div>
                            <div className={`text-xs font-mono mt-1 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Left Content - Story */}
                    <motion. div variants={itemVariants} className="lg:col-span-3 space-y-6">
                        {/* Tab Navigation */}
                        <div className={`inline-flex p-1. 5 rounded-2xl ${
                            isDark 
                                ? 'bg-neutral-900/50 border border-neutral-800/50' 
                                : 'bg-neutral-100/80 border border-neutral-200/50'
                        }`}>
                            {tabs.map((tab) => (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors ${
                                        activeTab === tab.id
                                            ?  isDark ?  'text-white' : 'text-neutral-900'
                                            :  isDark ?  'text-neutral-500 hover:text-neutral-300' : 'text-neutral-500 hover:text-neutral-700'
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTabBg"
                                            className={`absolute inset-0 rounded-xl ${
                                                isDark
                                                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30'
                                                    : 'bg-white shadow-md border border-neutral-200/50'
                                            }`}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <tab.icon size={16} className="relative z-10" />
                                    <span className="relative z-10">{tab.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y:  20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className={`p-8 rounded-3xl ${
                                isDark
                                    ? 'bg-neutral-900/30 border border-neutral-800/50'
                                    : 'bg-white/70 border border-neutral-200/50 shadow-xl'
                            }`}
                        >
                            <h3 className={`text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3 ${
                                isDark ?  'text-white' : 'text-neutral-900'
                            }`}>
                                {tabContent[activeTab].title}
                            </h3>

                            <div className="space-y-4">
                                {tabContent[activeTab].paragraphs.map((paragraph, index) => (
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`leading-relaxed ${
                                            isDark ?  'text-neutral-400' : 'text-neutral-600'
                                        }`}
                                    >
                                        {paragraph}
                                    </motion.p>
                                ))}
                            </div>

                            {/* Student-focused quote */}
                            <motion. div
                                className={`mt-8 p-6 rounded-2xl relative overflow-hidden ${
                                    isDark
                                        ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20'
                                        : 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20'
                                }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity:  1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.div
                                    className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-500"
                                    initial={{ scaleY: 0 }}
                                    animate={{ scaleY:  1 }}
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                />
                                <p className={`text-lg italic ${isDark ? 'text-cyan-300/80' : 'text-cyan-700'}`}>
                                    "Every expert was once a beginner. I'm just getting started!"
                                </p>
                                <p className={`mt-2 text-sm ${isDark ?  'text-neutral-500' : 'text-neutral-500'}`}>
                                    — My mindset every day
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Info Card */}
                    <motion. div
                        variants={itemVariants}
                        className="lg:col-span-2"
                    >
                        <motion.div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                            }}
                            className={`relative p-8 rounded-3xl overflow-hidden ${
                                isDark
                                    ? 'bg-neutral-900/50 border border-neutral-800/50'
                                    : 'bg-white/70 border border-neutral-200/50 shadow-2xl'
                            }`}
                        >
                            {/* Animated gradient border */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-1. 5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                                style={{ backgroundSize: '200% 100%' }}
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat:  Infinity,
                                    ease:  "linear",
                                }}
                            />

                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex gap-1. 5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className={`ml-2 text-xs font-mono ${
                                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                                }`}>
                                    student_profile. js
                                </span>
                            </div>

                            {/* Code Comment */}
                            <motion.div
                                className={`font-mono text-sm mb-6 flex items-center gap-2 ${
                                    isDark ?  'text-cyan-400/80' : 'text-cyan-600'
                                }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className={isDark ? 'text-neutral-600' : 'text-neutral-400'}>//</span>
                                <span>Quick Facts</span>
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className={isDark ? 'text-cyan-400' : 'text-cyan-600'}
                                >
                                    _
                                </motion.span>
                            </motion.div>

                            {/* Info Items */}
                            <ul className="space-y-4" style={{ transform: 'translateZ(20px)' }}>
                                {infoItems.map((item, index) => (
                                    <motion.li
                                        key={item.label}
                                        initial={{ opacity: 0, x:  -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className={`group flex items-center gap-4 p-3 rounded-xl transition-all cursor-default ${
                                            isDark
                                                ? 'hover:bg-neutral-800/50'
                                                : 'hover:bg-neutral-100/80'
                                        }`}
                                        whileHover={{ x: 5 }}
                                    >
                                        <motion.div
                                            className={`p-2.5 rounded-xl ${
                                                isDark ?  'bg-neutral-800/80' : 'bg-neutral-100'
                                            }`}
                                            whileHover={{ rotate: [0, -10, 10, 0] }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <item.icon size={18} className={item.color} />
                                        </motion.div>
                                        <div className="flex-1">
                                            <p className={`text-xs font-mono uppercase tracking-wider ${
                                                isDark ?  'text-neutral-500' : 'text-neutral-400'
                                            }`}>
                                                {item.label}
                                            </p>
                                            <p className={`font-medium ${
                                                isDark ? 'text-neutral-200' : 'text-neutral-800'
                                            }`}>
                                                {item.value}
                                            </p>
                                        </div>
                                        <ChevronRight
                                            size={16}
                                            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                                                isDark ? 'text-cyan-400' : 'text-cyan-600'
                                            }`}
                                        />
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Status Badge */}
                            <motion.div
                                className={`mt-6 p-4 rounded-xl text-center ${
                                    isDark 
                                        ? 'bg-emerald-500/10 border border-emerald-500/20' 
                                        : 'bg-emerald-50 border border-emerald-200'
                                }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity:  1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                    </span>
                                    <span className={`text-sm font-medium ${
                                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                                    }`}>
                                        Ready for OJT / Internship
                                    </span>
                                </div>
                            </motion.div>

                            {/* Fun Fact */}
                            <motion.div
                                className={`mt-4 p-4 rounded-xl text-center ${
                                    isDark ?  'bg-neutral-800/30' : 'bg-neutral-50'
                                }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <p className={`text-xs font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                    <span className="text-amber-400">💡</span> Fun fact: I debug best at 2 AM with coffee ☕
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;