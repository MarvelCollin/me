import { useState } from 'react';
import { siteContent } from '../content/site-content';
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
import '../styles/work-section.css';

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

interface WorkSectionProps {
    onWorkClick: (work: Work) => void;
}

const WorkSection = ({ onWorkClick }: WorkSectionProps) => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const { works } = siteContent;

    const handleMouseMove = (e: React.MouseEvent, cardId: number) => {
        const card = e.currentTarget as HTMLElement;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
        setHoveredCard(cardId);
    };

    return (
        <section className="work-section" id="works">
            <div className="work-container">
                <div className="work-header">
                    <div className="work-header-decoration">
                        <span className="work-header-line" />
                        <span className="work-header-dot" />
                        <span className="work-header-line" />
                    </div>
                    <h2 className="work-title">
                        Featured <span className="work-title-gradient">Works</span>
                    </h2>
                    <p className="work-description">
                        Selected projects that showcase creativity and technical excellence
                    </p>
                </div>

                <div className="work-grid">
                    {works.slice(0, 6).map((work, index) => (
                        <article
                            key={work.id}
                            className={`work-card work-card-${index + 1}`}
                            onMouseMove={(e) => handleMouseMove(e, work.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={() => onWorkClick(work)}
                            style={{
                                '--mouse-x': `${mousePos.x}%`,
                                '--mouse-y': `${mousePos.y}%`,
                            } as React.CSSProperties}
                        >
                            <div className={`work-card-glow ${hoveredCard === work.id ? 'work-card-glow-active' : ''}`} />
                            <div className="work-card-border" />

                            <div className="work-card-inner">
                                <div className="work-card-image">
                                    <div className="work-card-image-grid">
                                        {work.images.map((image, imgIndex) => (
                                            <div
                                                key={imgIndex}
                                                className="work-card-image-grid-item"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${work.title} - Image ${imgIndex + 1}`}
                                                    loading="lazy"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="work-card-image-overlay" />
                                </div>

                                <div className="work-card-content">
                                    <div className="work-card-number">0{index + 1}</div>
                                    <h3 className="work-card-title">{work.title}</h3>
                                    <p className="work-card-description">{work.description}</p>

                                    <div className="work-card-tech-stack">
                                        {work.tags.slice(0, 4).map(tag => {
                                            const IconComponent = techIconMap[tag];
                                            return IconComponent ? (
                                                <div
                                                    key={tag}
                                                    className="work-card-tech-icon"
                                                    title={tag}
                                                >
                                                    <IconComponent />
                                                </div>
                                            ) : null;
                                        })}
                                    </div>

                                    <a href={work.link} className="work-card-link">
                                        <span>Explore</span>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="work-footer">
                    <a href="#" className="work-footer-link">
                        <span className="work-footer-link-text">View All Projects</span>
                        <span className="work-footer-link-arrow">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default WorkSection;
