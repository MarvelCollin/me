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

    // Interactive Canvas Effect - Moved to src/components/background.tsx

    return (
        <section className="hero-section" ref={heroRef} id="home">
            <div className="hero-content">
                <div className="hero-text-container">
                    <div className="hero-greeting-container">
                        <span className="hero-greeting-line" />
                        <span className="hero-greeting-text">{hero.greeting}</span>
                    </div>

                    <h1 className="hero-name">
                        {nameLetters.map((letter, index) => (
                            letter === ' ' ? (
                                <span key={index} className="hero-name-spacer" />
                            ) : (
                                <span key={index} className="hero-name-letter">{letter}</span>
                            )
                        ))}
                    </h1>

                    <p className="hero-description">
                        {hero.description}
                    </p>

                    <div className="hero-cta-group">
                        <a
                            href="#works"
                            className={`hero-cta-primary ${isHovering ? 'hovering' : ''}`}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <span className="hero-cta-text">{hero.cta.primary}</span>
                            <span className="hero-cta-primary-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </span>
                            <div className="hero-cta-glow" />
                        </a>

                        <button className="hero-cta-secondary">
                            <span className="hero-cta-text">{hero.cta.secondary}</span>
                        </button>
                    </div>

                    <div className="hero-social-links">
                        <a href={hero.socials.github} className="hero-social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </a>
                        <a href={hero.socials.linkedin} className="hero-social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a href={hero.socials.twitter} className="hero-social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div
                        className="hero-visual-container"
                        style={{
                            transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)`,
                        }}
                    >
                        <div className="hero-visual-ring hero-visual-ring-1" />
                        <div className="hero-visual-ring hero-visual-ring-2" />
                        <div className="hero-visual-ring hero-visual-ring-3" />
                        <div className="hero-visual-core">
                            <div className="hero-visual-core-gradient" />
                            <span className="hero-visual-core-text">{'</>'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-indicator">
                <div className="hero-scroll-mouse">
                    <div className="hero-scroll-wheel" />
                </div>
                <span className="hero-scroll-text">Scroll to explore</span>
            </div>
        </section>
    );
};


export default HeroSection;
