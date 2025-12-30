import { useEffect, useRef, useState } from 'react';

const InteractiveCat = () => {
    const catRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!catRef.current) return;

            // Calculate mouse position relative to viewport center
            // but we'll use window coordinates to determine look direction
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Normalize coordinates -1 to 1
            const x = (clientX / innerWidth) * 2 - 1;
            const y = (clientY / innerHeight) * 2 - 1;

            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Calculate eye pupil position based on mouse - limit the movement range
    const leftPupilX = mousePosition.x * 6;
    const leftPupilY = mousePosition.y * 6;
    const rightPupilX = mousePosition.x * 6;
    const rightPupilY = mousePosition.y * 6;

    return (
        <div ref={catRef} className="interactive-cat-container">
            <svg width="280" height="240" viewBox="0 0 280 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="cat-svg">
                {/* Cat Body/Background Glow */}
                <ellipse cx="140" cy="130" rx="120" ry="100" fill="var(--bg-secondary)" opacity="0.5" filter="blur(20px)" />

                {/* Head Shape */}
                <path d="M70 180 C 40 180, 20 130, 20 100 C 20 50, 60 20, 140 20 C 220 20, 260 50, 260 100 C 260 130, 240 180, 210 180 L 70 180 Z"
                    fill="#151515" stroke="var(--accent-primary)" strokeWidth="3" />

                {/* Ears */}
                <path d="M40 70 L 20 20 L 80 50" fill="#151515" stroke="var(--accent-primary)" strokeWidth="3" strokeLinejoin="round" />
                <path d="M240 70 L 260 20 L 200 50" fill="#151515" stroke="var(--accent-primary)" strokeWidth="3" strokeLinejoin="round" />

                {/* Eyes Container */}
                <g className="cat-eyes">
                    {/* Left Eye */}
                    <g transform="translate(90, 100)">
                        <ellipse cx="0" cy="0" rx="25" ry="35" fill="#FFFFFF" />
                        <circle cx={leftPupilX} cy={leftPupilY} r="12" fill="#000000" />
                        <circle cx={leftPupilX + 4} cy={leftPupilY - 4} r="3" fill="#FFFFFF" opacity="0.6" />
                    </g>

                    {/* Right Eye */}
                    <g transform="translate(190, 100)">
                        <ellipse cx="0" cy="0" rx="25" ry="35" fill="#FFFFFF" />
                        <circle cx={rightPupilX} cy={rightPupilY} r="12" fill="#000000" />
                        <circle cx={rightPupilX + 4} cy={rightPupilY - 4} r="3" fill="#FFFFFF" opacity="0.6" />
                    </g>
                </g>

                {/* Nose */}
                <path d="M130 150 L 150 150 L 140 160 Z" fill="var(--accent-secondary)" />

                {/* Whiskers */}
                <g stroke="var(--text-secondary)" strokeWidth="2" opacity="0.6">
                    <path d="M60 150 L 10 140" />
                    <path d="M60 160 L 10 160" />
                    <path d="M60 170 L 10 180" />

                    <path d="M220 150 L 270 140" />
                    <path d="M220 160 L 270 160" />
                    <path d="M220 170 L 270 180" />
                </g>
            </svg>
        </div>
    );
};

export default InteractiveCat;
