import { useState } from 'react';
import { siteContent, techIcons } from '../content/site-content';
import './work-section.css';

const WorkSection = () => {
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
            <div className="work-bg-gradient" />
            <div className="work-bg-mesh" />

            <div className="work-container">
                <div className="work-header">
                    <div className="header-decoration">
                        <span className="deco-line" />
                        <span className="deco-dot" />
                        <span className="deco-line" />
                    </div>
                    <h2 className="section-title">
                        Featured <span className="text-gradient">Works</span>
                    </h2>
                    <p className="section-description">
                        Selected projects that showcase creativity and technical excellence
                    </p>
                </div>

                <div className="bento-grid">
                    {works.slice(0, 6).map((work, index) => (
                        <article
                            key={work.id}
                            className={`bento-card bento-${index + 1}`}
                            onMouseMove={(e) => handleMouseMove(e, work.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{
                                '--mouse-x': `${mousePos.x}%`,
                                '--mouse-y': `${mousePos.y}%`,
                            } as React.CSSProperties}
                        >
                            <div className={`card-glow ${hoveredCard === work.id ? 'active' : ''}`} />
                            <div className="card-border" />

                            <div className="card-inner">
                                <div className="card-image">
                                    <img
                                        src={work.image}
                                        alt={work.title}
                                        loading="lazy"
                                    />
                                    <div className="image-overlay" />
                                </div>

                                <div className="card-content">
                                    <div className="card-number">0{index + 1}</div>
                                    <h3 className="card-title">{work.title}</h3>
                                    <p className="card-description">{work.description}</p>

                                    <div className="card-tech-stack">
                                        {work.tags.slice(0, 4).map(tag => (
                                            <div
                                                key={tag}
                                                className="tech-icon"
                                                title={tag}
                                                dangerouslySetInnerHTML={{ __html: techIcons[tag] || '' }}
                                            />
                                        ))}
                                    </div>

                                    <a href={work.link} className="card-link">
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
                    <a href="#" className="see-all-link">
                        <span className="link-text">View All Projects</span>
                        <span className="link-arrow">
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
