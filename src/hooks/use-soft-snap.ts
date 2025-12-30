import { useEffect, useRef } from 'react';

export const useSoftSnap = () => {
    const timeoutRef = useRef<number | null>(null);
    const lastScrollY = useRef(0);
    const scrollDirection = useRef<'up' | 'down'>('down');
    const isSnapping = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY.current) {
                scrollDirection.current = 'down';
            } else if (currentScrollY < lastScrollY.current) {
                scrollDirection.current = 'up';
            }
            
            lastScrollY.current = currentScrollY;

            updateSectionPerspectives();

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(() => {
                if (!isSnapping.current) {
                    snapToSection();
                }
            }, 150);
        };

        const updateSectionPerspectives = () => {
            const sections = document.querySelectorAll('section');
            const viewportHeight = window.innerHeight;
            const scrollY = window.scrollY;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const sectionCenter = rect.top + rect.height / 2;
                const viewportCenter = viewportHeight / 2;
                const distanceFromCenter = sectionCenter - viewportCenter;
                const maxDistance = viewportHeight * 2;
                const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
                
                const scale = 1 - Math.abs(normalizedDistance) * 0.15;
                const rotateX = normalizedDistance * 8;
                const translateZ = -Math.abs(normalizedDistance) * 100;
                const opacity = 1 - Math.abs(normalizedDistance) * 0.3;
                
                (section as HTMLElement).style.transform = `
                    perspective(2000px) 
                    rotateX(${rotateX}deg) 
                    scale(${scale}) 
                    translateZ(${translateZ}px)
                `;
                (section as HTMLElement).style.opacity = `${Math.max(0.4, opacity)}`;
                (section as HTMLElement).style.transition = 'transform 0.1s ease-out, opacity 0.1s ease-out';
            });
        };

        const snapToSection = () => {
            const sections = document.querySelectorAll('section');
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            let currentSectionIndex = -1;
            let minDistance = Infinity;
            
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const sectionCenter = rect.top + rect.height / 2;
                const distance = Math.abs(sectionCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    currentSectionIndex = index;
                }
            });

            if (currentSectionIndex === -1) return;

            const currentSection = sections[currentSectionIndex] as HTMLElement;
            const rect = currentSection.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const scrollProgress = (scrollY - sectionTop) / rect.height;

            let targetSection: HTMLElement | null = null;

            if (scrollDirection.current === 'down' && scrollProgress > 0.12) {
                if (currentSectionIndex < sections.length - 1) {
                    targetSection = sections[currentSectionIndex + 1] as HTMLElement;
                }
            } else if (scrollDirection.current === 'up' && scrollProgress < 0.88) {
                if (scrollProgress < 0.5 && currentSectionIndex > 0) {
                    targetSection = sections[currentSectionIndex - 1] as HTMLElement;
                }
            }

            if (!targetSection && Math.abs(rect.top) > 10) {
                targetSection = currentSection;
            }

            if (targetSection) {
                isSnapping.current = true;
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                setTimeout(() => {
                    isSnapping.current = false;
                }, 1000);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateSectionPerspectives();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
};
