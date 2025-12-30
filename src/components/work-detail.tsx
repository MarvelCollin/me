import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Work } from '../content/site-content';
import {
    SiReact,
    SiNodedotjs,
    SiMongodb,
    SiFigma,
    SiD3Dotjs,
    SiFirebase,
    SiPython,
    SiOpenai,
    SiFastapi,
    SiNextdotjs,
    SiPostgresql,
    SiStripe,
    SiAdobeillustrator
} from 'react-icons/si';
import '../styles/work-detail.css';

const techIconMap: Record<string, React.ComponentType> = {
    'React': SiReact,
    'React Native': SiReact,
    'Node.js': SiNodedotjs,
    'MongoDB': SiMongodb,
    'Figma': SiFigma,
    'D3.js': SiD3Dotjs,
    'Firebase': SiFirebase,
    'Python': SiPython,
    'OpenAI': SiOpenai,
    'FastAPI': SiFastapi,
    'Next.js': SiNextdotjs,
    'PostgreSQL': SiPostgresql,
    'Stripe': SiStripe,
    'Illustrator': SiAdobeillustrator,
};

interface WorkDetailProps {
    work: Work;
    onBack: () => void;
}

const WorkDetail = ({ work, onBack }: WorkDetailProps) => {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="work-detail-page">
            <button className="work-detail-back" onClick={onBack}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span>Back to Projects</span>
            </button>

            <div className="work-detail-hero">
                <div className="work-detail-hero-content">
                    <h1 className="work-detail-hero-title">{work.title}</h1>
                    <p className="work-detail-hero-description">{work.fullDescription}</p>
                    <div className="work-detail-hero-actions">
                        {work.liveLink && (
                            <a href={work.liveLink} className="work-detail-hero-button work-detail-hero-button-primary" target="_blank" rel="noopener noreferrer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                                Live Demo
                            </a>
                        )}
                        {work.githubLink && (
                            <a href={work.githubLink} className="work-detail-hero-button work-detail-hero-button-secondary" target="_blank" rel="noopener noreferrer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                                </svg>
                                View Code
                            </a>
                        )}
                    </div>
                    <div className="work-detail-tech-orbit">
                        {work.tags.map((tag, index) => {
                            const IconComponent = techIconMap[tag];
                            const angle = (index / work.tags.length) * Math.PI * 2;
                            const radius = 100;
                            const x = Math.cos(angle) * radius;
                            const y = Math.sin(angle) * radius;
                            
                            return IconComponent ? (
                                <motion.div
                                    key={tag}
                                    className="work-detail-tech-sphere"
                                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    animate={{ 
                                        opacity: 1, 
                                        scale: 1,
                                        x: x,
                                        y: y
                                    }}
                                    transition={{
                                        opacity: { duration: 0.6, delay: index * 0.15 },
                                        scale: { duration: 0.6, delay: index * 0.15 },
                                        x: { duration: 1, delay: index * 0.15, ease: "easeOut" },
                                        y: { duration: 1, delay: index * 0.15, ease: "easeOut" }
                                    }}
                                    whileHover={{
                                        scale: 1.3,
                                        rotateY: 360,
                                        transition: { duration: 0.6 }
                                    }}
                                >
                                    <div className="work-detail-tech-sphere-inner">
                                        <div className="work-detail-tech-sphere-icon">
                                            <IconComponent />
                                        </div>
                                        <div className="work-detail-tech-sphere-glow" />
                                        <div className="work-detail-tech-sphere-ring" />
                                    </div>
                                    <span className="work-detail-tech-sphere-label">{tag}</span>
                                </motion.div>
                            ) : null;
                        })}
                    </div>
                </div>
                <div className="work-detail-hero-image">
                    <div className="work-detail-main-image">
                        <img src={work.images[activeImage]} alt={work.title} />
                        <div className="work-detail-image-glow" />
                    </div>
                    <div className="work-detail-thumbnails">
                        {work.images.map((image, idx) => (
                            <button
                                key={idx}
                                className={`work-detail-thumbnail ${activeImage === idx ? 'active' : ''}`}
                                onClick={() => setActiveImage(idx)}
                            >
                                <img src={image} alt={`${work.title} ${idx + 1}`} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkDetail;
