import { useEffect, useRef, useState, useMemo } from 'react';
import { siteContent } from '../content/site-content';
import './hero-section.css';

const HeroSection = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const { hero } = siteContent;
    const nameLetters = hero.name.split('');

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;

            const rect = heroRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

            setMousePosition({ x, y });
        };

        const heroElement = heroRef.current;
        if (heroElement) {
            heroElement.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (heroElement) {
                heroElement.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    const particles = useMemo(() => {
        const items = [];
        for (let i = 0; i < 50; i++) {
            const size = Math.random() * 4 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;

            items.push(
                <div
                    key={i}
                    className="particle"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${left}%`,
                        top: `${top}%`,
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                    }}
                />
            );
        }
        return items;
    }, []);

    return (
        <section className="hero" ref={heroRef} id="home">
            <div className="hero-background">
                <div
                    className="gradient-orb orb-1"
                    style={{
                        transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                    }}
                />
                <div
                    className="gradient-orb orb-2"
                    style={{
                        transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
                    }}
                />
                <div
                    className="gradient-orb orb-3"
                    style={{
                        transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * -25}px)`,
                    }}
                />
                <div className="grid-overlay" />
                <div className="particles">
                    {particles}
                </div>
                <div className="noise-overlay" />
            </div>

            <div className="hero-content">
                <div className="hero-text-container">
                    <div className="greeting-container">
                        <span className="greeting-line" />
                        <span className="greeting-text font-medium tracking-wider">{hero.greeting}</span>
                    </div>

                    <h1 className="hero-name">
                        {nameLetters.map((letter, index) => (
                            letter === ' ' ? (
                                <span key={index} className="name-spacer" />
                            ) : (
                                <span key={index} className="name-letter">{letter}</span>
                            )
                        ))}
                    </h1>

                    <div className="hero-title-wrapper">
                        <div className="hero-title flex items-center gap-3 flex-wrap">
                            {hero.titles.map((title, index) => (
                                <span key={title}>
                                    <span className={`title-word ${index === 1 ? 'accent' : ''}`}>{title}</span>
                                    {index < hero.titles.length - 1 && (
                                        <span className="title-divider text-gray-500 ml-3">•</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="hero-description text-lg text-gray-400 leading-relaxed">
                        {hero.description}
                    </p>

                    <div className="hero-cta-group flex gap-4 mt-6">
                        <a
                            href="#works"
                            className={`cta-primary ${isHovering ? 'hovering' : ''}`}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <span className="cta-text">{hero.cta.primary}</span>
                            <span className="cta-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                            <div className="cta-glow" />
                        </a>

                        <button className="cta-secondary">
                            <span className="cta-text">{hero.cta.secondary}</span>
                        </button>
                    </div>

                    <div className="hero-social-links flex gap-4 mt-8">
                        <a href={hero.socials.github} className="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>
                        <a href={hero.socials.linkedin} className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a href={hero.socials.twitter} className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div
                        className="visual-container"
                        style={{
                            transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
                        }}
                    >
                        <div className="visual-ring ring-1" />
                        <div className="visual-ring ring-2" />
                        <div className="visual-ring ring-3" />
                        <div className="visual-core">
                            <div className="core-gradient" />
                            <span className="core-text">{'</>'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span className="scroll-text uppercase tracking-widest text-xs text-gray-500">Scroll to explore</span>
            </div>
        </section>
    );
};

export default HeroSection;
