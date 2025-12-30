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
                const maxDistance = viewportHeight * 2.5;
                const normalizedDistance = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
                
                const scale = 1 - Math.abs(normalizedDistance) * 0.2;
                const rotateX = normalizedDistance * 12;
                const translateZ = -Math.abs(normalizedDistance) * 150;
                const opacity = 1 - Math.abs(normalizedDistance) * 0.25;
                
                const section_elem = section as HTMLElement;
                section_elem.style.transform = `perspective(2000px) rotateX(${rotateX}deg) scale(${scale}) translateZ(${translateZ}px)`;
                section_elem.style.opacity = `${Math.max(0.6, opacity)}`;
                
                if (isSnapping.current) {
                    section_elem.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                } else {
                    section_elem.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';
                }
            });
        };

        const snapToSection = () => {
            const sections = document.querySelectorAll('section');
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            const viewportTop = scrollY;
            const viewportBottom = scrollY + viewportHeight;

            let closestSection: HTMLElement | null = null;
            let closestIndex = -1;
            let minDistance = Infinity;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollY;
                const sectionBottom = sectionTop + rect.height;
                
                const distance = Math.min(
                    Math.abs(viewportTop - sectionTop),
                    Math.abs(viewportBottom - sectionBottom),
                    Math.abs(viewportTop - sectionBottom),
                    Math.abs(viewportBottom - sectionTop)
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    closestSection = section as HTMLElement;
                    closestIndex = index;
                }
            });

            if (closestIndex === -1 || !closestSection) return;

            const rect = closestSection.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const sectionHeight = rect.height;
            const relativeScrollPos = scrollY - sectionTop;

            let targetSection: HTMLElement | null = null;

            if (scrollDirection.current === 'down') {
                if (relativeScrollPos > sectionHeight * 0.3) {
                    if (closestIndex < sections.length - 1) {
                        targetSection = sections[closestIndex + 1] as HTMLElement;
                    }
                } else if (relativeScrollPos < -viewportHeight * 0.2) {
                    targetSection = closestSection;
                }
            } else if (scrollDirection.current === 'up') {
                if (relativeScrollPos < sectionHeight * 0.3) {
                    if (closestIndex > 0) {
                        targetSection = sections[closestIndex - 1] as HTMLElement;
                    }
                } else if (relativeScrollPos > sectionHeight + viewportHeight * 0.2) {
                    targetSection = closestSection;
                }
            }

            if (targetSection) {
                isSnapping.current = true;
                targetSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { isSnapping.current = false; }, 1000);
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
