import React, { useState, useRef, useMemo, memo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Github,
    ExternalLink,
    Folder,
    Star,
    GitFork,
    ArrowUpRight,
    Sparkles,
    Code2,
    Layers,
    Monitor,
    Smartphone,
    Globe,
    Zap,
    Play,
    MessageSquare,
    Utensils,
    Mic,
    StickyNote
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Your actual projects data
const projects = [
    {
        title: "Vocalyx",
        description: "Vocalyx simplifies grading with speech-to-text technology, allowing faculty to input scores effortlessly, reduce workload, and ensure timely submissions.",
        longDescription: "An innovative grading solution that leverages voice recognition to streamline the evaluation process for educators.",
        tags: ["Kotlin", "JavaScript", "Python"],
        languages: [
            { name: "Kotlin", percent: 53, color: "#A97BFF" },
            { name:  "JavaScript", percent: 31.3, color: "#F7DF1E" },
            { name: "Python", percent:  15, color: "#3776AB" },
        ],
        links: { 
            demo: "#", 
            github: "https://github.com/karl2522/Vocalyx" 
        },
        image:  Mic,
        emoji: "🎤",
        color: "from-violet-500 to-purple-600",
        bgGradient: "from-violet-500/20 to-purple-600/20",
        featured: true,
        category: "Mobile App",
        year: "2024",
        repoId: 932759312
    },
    {
        title: "NeighborNet",
        description: "A community-driven platform connecting neighbors for。。。。。。。。。。。。。sharing, mutual assistance, and building stronger local communities through technology.",
        longDescription: "Full-stack application with mobile support enabling。。。。。。。。。。。。。。。neighbors to connect, share resources, and help each other.",
        tags: ["JavaScript", "Java", "Kotlin"],
        languages: [
            { name: "JavaScript", percent: 54.5, color: "#F7DF1E" },
            { name: "Java", percent: 23.9, color: "#ED8B00" },
            { name: "Kotlin", percent:  21.2, color: "#A97BFF" },
        ],
        links: { 
            demo: "#", 
            github: "https://github.com/Penguinmans32/IT342-G3-NeighborNet" 
        },
        image: Globe,
        emoji: "🏘️",
        color: "from-emerald-500 to-teal-600",
        bgGradient: "from-emerald-500/20 to-teal-600/20",
        featured: true,
        category: "Web App",
        year: "2024",
        repoId:  923505828
    },
    {
        title: "SavorSpace",
        description: "A delightful food-focused platform for discovering, sharing, and organizing recipes.  Built as a school final project for system development.",
        longDescription: "Frontend application showcasing modern web development practices with a focus on user experience and visual design.",
        tags: ["JavaScript", "CSS", "HTML"],
        languages: [
            { name: "JavaScript", percent:  65.8, color: "#F7DF1E" },
            { name: "CSS", percent: 34.1, color: "#264DE4" },
            { name: "HTML", percent: 0.1, color: "#E34F26" },
        ],
        links: { 
            demo:  "#", 
            github: "https://github.com/karl2522/SavorSpace-Frontend" 
        },
        image: Utensils,
        emoji: "🍽️",
        color: "from-orange-500 to-red-600",
        bgGradient: "from-orange-500/20 to-red-600/20",
        featured: true,
        category: "Web App",
        year: "2024",
        repoId:  873018560
    },
    {
        title: "Batibot Notes",
        description: "A modern, feature-rich notes application built with TypeScript.  Clean interface for organizing thoughts, ideas, and daily tasks efficiently.",
        longDescription: "TypeScript-powered notes app with a focus on performance, type safety, and excellent developer experience.",
        tags: ["TypeScript", "CSS", "React"],
        languages: [
            { name: "TypeScript", percent: 98.2, color: "#3178C6" },
            { name: "CSS", percent: 1.1, color: "#264DE4" },
        ],
        links: { 
            demo: "#", 
            github: "https://github.com/Penguinmans32/Batibot-NotesApp" 
        },
        image: StickyNote,
        emoji: "📝",
        color: "from-cyan-500 to-blue-600",
        bgGradient:  "from-cyan-500/20 to-blue-600/20",
        featured: false,
        category: "Web App",
        year: "2024",
        repoId:  1058619412
    }
];

// Language Bar Component
const LanguageBar = memo(({ languages, isDark }) => (
    <div className="space-y-2">
        {/* Combined bar */}
        <div className={`h-2 rounded-full overflow-hidden flex ${
            isDark ?  'bg-neutral-800' : 'bg-neutral-200'
        }`}>
            {languages.map((lang, index) => (
                <motion.div
                    key={lang.name}
                    className="h-full"
                    style={{ backgroundColor: lang.color, width: `${lang.percent}%` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percent}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                />
            ))}
        </div>
        {/* Labels */}
        <div className="flex flex-wrap gap-3 text-xs">
            {languages. map((lang) => (
                <div key={lang.name} className="flex items-center gap-1.5">
                    <span 
                        className="w-2. 5 h-2.5 rounded-full" 
                        style={{ backgroundColor:  lang.color }}
                    />
                    <span className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                        {lang.name}
                    </span>
                    <span className={isDark ? 'text-neutral-500' : 'text-neutral-400'}>
                        {lang. percent}%
                    </span>
                </div>
            ))}
        </div>
    </div>
));

// Featured Project Card - Optimized
const FeaturedProjectCard = memo(({ project, index, isDark }) => {
    const [isHovered, setIsHovered] = useState(false);
    const IconComponent = project.image;

    return (
        <motion. div
            initial={{ opacity: 0, y:  30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once:  true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group h-full"
        >
            <motion.div
                className={`relative h-full rounded-3xl overflow-hidden flex flex-col ${
                    isDark
                        ? 'bg-neutral-900/60 border border-neutral-800/50'
                        : 'bg-white/70 border border-neutral-200/50 shadow-xl'
                }`}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
            >
                {/* Top gradient bar */}
                <motion.div
                    className={`h-1 bg-gradient-to-r ${project.color}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: 'left' }}
                />

                {/* Project Image/Preview Area */}
                <div
                    className={`relative h-44 overflow-hidden ${
                        isDark ?  'bg-neutral-800/30' : 'bg-neutral-100/50'
                    }`}
                >
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-50`} />
                    
                    {/* Grid pattern */}
                    <div className={`absolute inset-0 ${
                        isDark
                            ? 'bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]'
                            : 'bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]'
                    } bg-[size:24px_24px]`} />

                    {/* Project Icon */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`p-6 rounded-3xl bg-gradient-to-br ${project.color} shadow-2xl`}>
                            <IconComponent size={48} className="text-white" strokeWidth={1.5} />
                        </div>
                    </motion.div>

                    {/* Emoji decoration */}
                    <motion. span 
                        className="absolute top-4 right-4 text-4xl opacity-50"
                        animate={isHovered ? { rotate: [0, -10, 10, 0], scale: 1.2 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        {project.emoji}
                    </motion.span>

                    {/* Category badge */}
                    <div
                        className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md ${
                            isDark
                                ? 'bg-black/40 text-white border border-white/10'
                                : 'bg-white/80 text-neutral-800 border border-neutral-200/50'
                        }`}
                    >
                        {project.category}
                    </div>

                    {/* Year badge */}
                    <div
                        className={`absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-xs font-mono backdrop-blur-md ${
                            isDark
                                ? 'bg-black/40 text-cyan-400 border border-cyan-500/20'
                                : 'bg-white/80 text-cyan-600 border border-cyan-500/30'
                        }`}
                    >
                        {project.year}
                    </div>

                    {/* Action buttons on hover */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                className="absolute bottom-4 right-4 flex gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2. 5 rounded-xl backdrop-blur-md transition-colors ${
                                        isDark
                                            ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                                            : 'bg-white/90 text-neutral-800 hover:bg-white shadow-lg'
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Github size={18} />
                                </motion. a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                    {/* Title and links */}
                    <div className="flex items-start justify-between mb-3">
                        <h3 className={`text-xl font-bold transition-colors duration-300 ${
                            isHovered
                                ? 'text-transparent bg-clip-text bg-gradient-to-r ' + project.color
                                :  isDark ?  'text-white' : 'text-neutral-900'
                        }`}>
                            {project.title}
                        </h3>
                        <div className="flex gap-1">
                            <motion.a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`p-2 rounded-lg transition-colors ${
                                    isDark
                                        ? 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Github size={18} />
                            </motion. a>
                            <motion. a
                                href={project. links.demo}
                                className={`p-2 rounded-lg transition-colors ${
                                    isDark
                                        ?  'text-neutral-400 hover:text-white hover:bg-neutral-800'
                                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                                }`}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ExternalLink size={18} />
                            </motion.a>
                        </div>
                    </div>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-4 flex-1 ${
                        isDark ?  'text-neutral-400' : 'text-neutral-600'
                    }`}>
                        {project.description}
                    </p>

                    {/* Language Distribution Bar */}
                    <div className="mb-4">
                        <LanguageBar languages={project.languages} isDark={isDark} />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags. map((tag) => (
                            <span
                                key={tag}
                                className={`px-3 py-1 rounded-lg text-xs font-mono ${
                                    isDark
                                        ? 'bg-neutral-800/80 text-cyan-400/80 border border-neutral-700/50'
                                        : 'bg-neutral-100 text-cyan-600 border border-neutral-200'
                                }`}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* View Project Button on hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="p-4 pt-0"
                            initial={{ opacity:  0, y: 10 }}
                            animate={{ opacity:  1, y: 0 }}
                            exit={{ opacity:  0, y: 10 }}
                            transition={{ duration:  0.2 }}
                        >
                            <motion. a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium bg-gradient-to-r ${project.color} text-white`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span>View on GitHub</span>
                                <ArrowUpRight size={18} />
                            </motion. a>
                        </motion. div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
});

// Mini Project Card - Optimized
const MiniProjectCard = memo(({ project, index, isDark }) => {
    const [isHovered, setIsHovered] = useState(false);
    const IconComponent = project.image;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y:  0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group"
        >
            <motion. div
                className={`relative p-6 rounded-2xl h-full transition-all duration-300 ${
                    isDark
                        ?  'bg-neutral-900/40 border border-neutral-800/50 hover:border-neutral-700'
                        : 'bg-white/60 border border-neutral-200/50 hover:border-neutral-300 shadow-lg'
                }`}
                whileHover={{ y: -5 }}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-br ${project.color}`}
                        animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <IconComponent className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </motion.div>

                    <div className="flex gap-1">
                        <motion.a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-lg transition-colors ${
                                isDark
                                    ? 'text-neutral-500 hover:text-white hover: bg-neutral-800'
                                    : 'text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100'
                            }`}
                            whileHover={{ scale: 1.1 }}
                        >
                            <Github size={18} />
                        </motion.a>
                    </div>
                </div>

                {/* Title */}
                <h4 className={`text-lg font-bold mb-2 transition-colors ${
                    isHovered
                        ? isDark ?  'text-cyan-400' : 'text-cyan-600'
                        :  isDark ? 'text-white' : 'text-neutral-900'
                }`}>
                    {project.title}
                </h4>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-4 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                    {project.description}
                </p>

                {/* Language Bar */}
                <div className="mb-4">
                    <LanguageBar languages={project. languages} isDark={isDark} />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className={`text-xs font-mono ${
                                isDark ?  'text-neutral-500' : 'text-neutral-400'
                            }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
});

// Filter Button Component
const FilterButton = memo(({ label, icon: Icon, isActive, onClick, isDark }) => (
    <motion.button
        onClick={onClick}
        className={`relative px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
            isActive
                ? isDark ?  'text-white' : 'text-neutral-900'
                : isDark ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-500 hover:text-neutral-700'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
    >
        {isActive && (
            <motion.div
                layoutId="activeProjectFilter"
                className={`absolute inset-0 rounded-xl ${
                    isDark
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30'
                        : 'bg-white shadow-md border border-neutral-200/50'
                }`}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
        )}
        <Icon size={16} className="relative z-10" />
        <span className="relative z-10">{label}</span>
    </motion.button>
));

const Projects = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = useMemo(() => [
        { id: 'all', label:  'All Projects', icon:  Layers },
        { id: 'Web App', label: 'Web Apps', icon: Monitor },
        { id: 'Mobile App', label: 'Mobile', icon:  Smartphone },
    ], []);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return projects;
        return projects.filter(p => p.category === activeFilter);
    }, [activeFilter]);

    const featuredProjects = useMemo(() => 
        filteredProjects.filter(p => p.featured), 
        [filteredProjects]
    );
    
    const otherProjects = useMemo(() => 
        filteredProjects.filter(p => !p. featured), 
        [filteredProjects]
    );

    return (
        <section
            id="projects"
            ref={containerRef}
            className="py-24 md:py-36 relative overflow-hidden"
        >
            {/* Background Elements - Simplified */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div
                    className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px] ${
                        isDark ?  'bg-cyan-500/10' : 'bg-cyan-500/15'
                    }`}
                />
                <div
                    className={`absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-[120px] ${
                        isDark ? 'bg-purple-500/10' : 'bg-purple-500/15'
                    }`}
                />
            </div>

            <div className="relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y:  20 }}
                    animate={isInView ? { opacity:  1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <motion.div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6 ${
                            isDark
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                : 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/30'
                        }`}
                    >
                        <Sparkles size={16} />
                        <span>My Work</span>
                    </motion.div>

                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                        isDark ?  'text-white' : 'text-neutral-900'
                    }`}>
                        Featured{' '}
                        <span className="relative inline-block">
                            <span className="text-gradient">Projects</span>
                            <motion.span
                                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.3, duration: 0.6 }}
                            />
                        </span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                        Real projects I've built with passion and dedication 🚀
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } :  {}}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    <div className={`inline-flex p-1. 5 rounded-2xl ${
                        isDark 
                            ? 'bg-neutral-900/50 border border-neutral-800/50' 
                            : 'bg-neutral-100/80 border border-neutral-200/50'
                    }`}>
                        {filters.map((filter) => (
                            <FilterButton
                                key={filter.id}
                                label={filter.label}
                                icon={filter.icon}
                                isActive={activeFilter === filter. id}
                                onClick={() => setActiveFilter(filter.id)}
                                isDark={isDark}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Featured Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {featuredProjects.map((project, index) => (
                        <FeaturedProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            isDark={isDark}
                        />
                    ))}
                </div>

                {/* View More CTA */}
                <motion. div
                    initial={{ opacity:  0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } :  {}}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-center mt-16"
                >
                    <motion.a
                        href="https://github.com/Penguinmans32"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all ${
                            isDark
                                ? 'bg-neutral-900/50 text-neutral-300 border border-neutral-800 hover:border-cyan-500/50 hover:text-white'
                                : 'bg-white/80 text-neutral-700 border border-neutral-200 hover:border-cyan-500/50 hover:text-neutral-900 shadow-lg'
                        }`}
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Github size={20} />
                        <span>See More on GitHub</span>
                        <ArrowUpRight size={18} />
                    </motion. a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;