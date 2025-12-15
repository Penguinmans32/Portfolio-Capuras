import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    Code,
    Server,
    Wrench,
    Database,
    Sparkles,
    TrendingUp,
    Zap,
    Star,
    ChevronRight,
    Layers,
    Cpu,
    Globe,
    Terminal,
    GitBranch,
    BookOpen,
    Trophy,
    Target,
    Rocket,
    GraduationCap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Individual Skill Pill with Progress
const SkillPill = ({ skill, level, index, isDark }) => {
    const [isSkillHovered, setIsSkillHovered] = useState(false);

    return (
        <motion. div
            initial={{ opacity: 0, scale:  0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setIsSkillHovered(true)}
            onMouseLeave={() => setIsSkillHovered(false)}
            className="relative group"
        >
            <motion.div
                className={`relative px-4 py-2 rounded-xl text-sm font-medium cursor-default overflow-hidden ${
                    isDark
                        ?  'bg-neutral-800/60 text-neutral-300 border border-neutral-700/50'
                        : 'bg-white/80 text-neutral-700 border border-neutral-200/80 shadow-sm'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
            >
                {/* Skill level indicator bar */}
                <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: isSkillHovered ? `${level}%` : '0%' }}
                    transition={{ duration: 0.4 }}
                />

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 group-hover:text-cyan-500 transition-colors duration-200">
                    {skill. name}
                </span>

                {/* Level tooltip */}
                <AnimatePresence>
                    {isSkillHovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg text-xs font-mono whitespace-nowrap z-20 ${
                                isDark
                                    ? 'bg-neutral-800 text-cyan-400 border border-neutral-700'
                                    :  'bg-white text-cyan-600 border border-neutral-200 shadow-lg'
                            }`}
                        >
                            {level}% comfortable
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion. div>
    );
};

// Skill Card Component
const SkillCard = ({ title, icon: Icon, skills, color, index, isDark }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping:  30 });

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
        setIsHovered(false);
    };

    const avgLevel = Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y:  50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
            }}
        >
            <motion.div
                className={`relative p-6 rounded-3xl overflow-hidden h-full transition-all duration-300 ${
                    isDark
                        ?  'bg-neutral-900/60 border border-neutral-800/50'
                        : 'bg-white/70 border border-neutral-200/50 shadow-xl'
                }`}
                whileHover={{ y: -5 }}
            >
                {/* Animated gradient background */}
                <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-500`}
                    animate={{ opacity: isHovered ? 0.08 : 0 }}
                />

                {/* Top border gradient */}
                <motion.div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${color}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: 'left' }}
                />

                {/* Header */}
                <div className="flex items-center justify-between mb-6" style={{ transform: 'translateZ(20px)' }}>
                    <div className="flex items-center gap-4">
                        <motion.div
                            className={`relative p-3 rounded-2xl ${
                                isDark ?  'bg-neutral-800/80' : 'bg-neutral-100'
                            }`}
                            animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <Icon className={`w-6 h-6 ${
                                isHovered
                                    ? 'text-cyan-400'
                                    : isDark ?  'text-neutral-400' : 'text-neutral-600'
                            } transition-colors duration-300`} />
                        </motion.div>
                        <div>
                            <h3 className={`text-xl font-bold ${
                                isDark ? 'text-white' : 'text-neutral-900'
                            }`}>
                                {title}
                            </h3>
                            <p className={`text-xs font-mono ${
                                isDark ? 'text-neutral-500' : 'text-neutral-400'
                            }`}>
                                {skills.length} technologies
                            </p>
                        </div>
                    </div>

                    {/* Comfort level circle */}
                    <div className="relative">
                        <svg className="w-12 h-12 -rotate-90">
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                strokeWidth="3"
                                fill="none"
                                className={isDark ? 'stroke-neutral-800' : 'stroke-neutral-200'}
                            />
                            <motion.circle
                                cx="24"
                                cy="24"
                                r="20"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                className="stroke-cyan-500"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: isHovered ? avgLevel / 100 : 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                style={{ strokeDasharray: "126" }}
                            />
                        </svg>
                        <motion.span
                            className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${
                                isDark ?  'text-cyan-400' : 'text-cyan-600'
                            }`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                        >
                            {avgLevel}%
                        </motion.span>
                    </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2" style={{ transform: 'translateZ(10px)' }}>
                    {skills.map((skill, skillIndex) => (
                        <SkillPill
                            key={skill.name}
                            skill={skill}
                            level={skill.level}
                            index={skillIndex}
                            isDark={isDark}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

// Learning Progress Bar Component
const LearningBar = ({ label, level, color, isDark, delay }) => {
    const barRef = useRef(null);
    const isInView = useInView(barRef, { once: true });

    return (
        <motion.div
            ref={barRef}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay, duration: 0.5 }}
            className="space-y-2"
        >
            <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${isDark ? 'text-neutral-300' :  'text-neutral-700'}`}>
                    {label}
                </span>
                <span className={`text-sm font-mono ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                    {level}%
                </span>
            </div>
            <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}`}>
                <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${color}`}
                    initial={{ width:  0 }}
                    animate={isInView ? { width:  `${level}%` } : {}}
                    transition={{ delay:  delay + 0.3, duration: 1, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    // Your actual skills
    const skillCategories = [
        {
            title: "Frontend",
            icon: Code,
            color: "from-cyan-400 to-blue-500",
            skills: [
                { name: "React. js", level: 85 },
                { name: "TypeScript", level: 75 },
                { name: "Tailwind CSS", level: 90 },
                { name: "HTML5", level: 95 },
                { name: "CSS3", level: 90 },
                { name: "JavaScript", level: 85 },
            ]
        },
        {
            title: "Backend",
            icon: Server,
            color: "from-purple-400 to-pink-500",
            skills:  [
                { name: "Node.js", level: 75 },
                { name: "Python", level: 70 },
                { name: "Java", level: 75 },
                { name: "Go", level: 40 },
                { name: "REST APIs", level: 80 },
                { name: "Express.js", level: 70 },
            ]
        },
        {
            title: "Database",
            icon: Database,
            color: "from-amber-400 to-orange-500",
            skills: [
                { name: "PostgreSQL", level: 70 },
                { name: "MySQL", level: 75 },
                { name: "MongoDB", level: 50 },
                { name: "Firebase", level: 65 },
            ]
        },
        {
            title: "Tools & Others",
            icon: Wrench,
            color: "from-emerald-400 to-teal-500",
            skills: [
                { name: "VS Code", level: 95 },
                { name: "Git", level: 80 },
                { name: "Figma", level: 70 },
                { name: "Linux", level: 55 },
                { name: "Webpack", level: 60 },
                { name: "AI Tools", level: 85 },
            ]
        }
    ];

    // Student-appropriate highlights
    const highlights = [
        { icon: BookOpen, value: "2+", label: "Years Learning", color: "text-cyan-400" },
        { icon:  Rocket, value: "6+", label: "Projects Built", color: "text-purple-400" },
        { icon: GitBranch, value: "200+", label: "Git Commits", color: "text-amber-400" },
        { icon: Trophy, value: "3+", label: "Hackathons", color: "text-emerald-400" },
    ];

    // Your actual experience areas
    const learningAreas = [
        { label: "Web Development", level: 80, color: "from-cyan-400 to-blue-500" },
        { label: "UI/UX Design", level: 75, color: "from-purple-400 to-pink-500" },
        { label: "Mobile Development", level: 50, color: "from-amber-400 to-orange-500" },
        { label: "Backend Development", level: 65, color: "from-emerald-400 to-teal-500" },
    ];

    const floatingIcons = [
        { icon:  Terminal, x: '5%', y: '15%', delay: 0 },
        { icon: Globe, x: '92%', y: '20%', delay: 0.5 },
        { icon:  Cpu, x: '88%', y: '75%', delay: 1 },
        { icon: Star, x: '8%', y: '80%', delay: 1.5 },
    ];

    return (
        <section
            id="skills"
            ref={containerRef}
            className="py-24 md:py-36 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {/* Gradient orbs - Static for performance */}
                <div className={`absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[150px] ${
                    isDark ?  'bg-cyan-500/10' : 'bg-cyan-500/15'
                }`} />
                <div className={`absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full blur-[150px] ${
                    isDark ?  'bg-purple-500/10' : 'bg-purple-500/15'
                }`} />

                {/* Grid pattern */}
                <div className={`absolute inset-0 ${
                    isDark
                        ? 'bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)]'
                        : 'bg-[linear-gradient(rgba(6,182,212,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.07)_1px,transparent_1px)]'
                } bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]`} />

                {/* Floating icons */}
                {floatingIcons. map(({ icon: Icon, x, y, delay }, index) => (
                    <motion.div
                        key={index}
                        className={`absolute hidden md:block ${
                            isDark ?  'text-neutral-800' : 'text-neutral-300'
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
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity:  1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6 ${
                            isDark
                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                : 'bg-purple-500/10 text-purple-600 border border-purple-500/30'
                        }`}
                    >
                        <Layers size={16} />
                        <span>My Toolkit</span>
                    </motion.div>

                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                        isDark ?  'text-white' : 'text-neutral-900'
                    }`}>
                        Skills &{' '}
                        <span className="relative inline-block">
                            <span className="text-gradient">Technologies</span>
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
                        Technologies I've been learning and working with as a student developer 📚
                    </p>
                </motion.div>

                {/* Student Stats Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } :  {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 rounded-3xl ${
                        isDark
                            ? 'bg-neutral-900/30 border border-neutral-800/50'
                            : 'bg-white/50 border border-neutral-200/50 shadow-lg'
                    }`}
                >
                    {highlights.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ?  { opacity: 1, scale:  1 } : {}}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="text-center p-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            <motion.div
                                className={`inline-flex p-3 rounded-2xl mb-3 ${
                                    isDark ?  'bg-neutral-800/50' : 'bg-neutral-100'
                                }`}
                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </motion.div>
                            <div className={`text-2xl md:text-3xl font-bold ${
                                isDark ? 'text-white' : 'text-neutral-900'
                            }`}>
                                {item.value}
                            </div>
                            <div className={`text-xs font-mono ${
                                isDark ? 'text-neutral-500' : 'text-neutral-400'
                            }`}>
                                {item.label}
                            </div>
                        </motion.div>
                    ))}
                </motion. div>

                {/* Skill Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {skillCategories.map((category, index) => (
                        <SkillCard
                            key={category.title}
                            {... category}
                            index={index}
                            isDark={isDark}
                        />
                    ))}
                </div>

                {/* Learning Progress Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } :  {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className={`p-8 rounded-3xl ${
                        isDark
                            ? 'bg-neutral-900/40 border border-neutral-800/50'
                            : 'bg-white/60 border border-neutral-200/50 shadow-xl'
                    }`}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <motion.div
                            className={`p-2 rounded-xl ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'}`}
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <TrendingUp className={isDark ? 'text-cyan-400' : 'text-cyan-600'} size={24} />
                        </motion. div>
                        <div>
                            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                                Learning Progress
                            </h3>
                            <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                My comfort level in different areas
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {learningAreas.map((area, index) => (
                            <LearningBar
                                key={area.label}
                                {...area}
                                isDark={isDark}
                                delay={0.7 + index * 0.1}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Currently Learning Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } :  {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-16 text-center"
                >
                    <motion.div
                        className={`inline-flex items-center gap-3 px-6 py-4 rounded-2xl ${
                            isDark
                                ? 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20'
                                : 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30'
                        }`}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className={isDark ? 'text-amber-400' : 'text-amber-500'} size={20} />
                        </motion. div>
                        <span className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                            Currently exploring:{' '}
                            <span className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                                React Native, Docker, Cloud Services
                            </span>
                        </span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Zap className={isDark ? 'text-purple-400' : 'text-purple-600'} size={18} />
                        </motion. div>
                    </motion. div>

                    {/* Eager to learn message */}
                    <motion. p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1 }}
                        className={`mt-6 text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}
                    >
                        <GraduationCap className="inline w-4 h-4 mr-1" />
                        Always eager to learn new technologies and best practices! 
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;