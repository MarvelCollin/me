export { }; // Force module
import React, { useEffect, useRef } from 'react';
import '../styles/background.css';

const Background = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = 0;
        let mouseY = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            baseX: number;
            baseY: number;
            density: number;
            color: string;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = Math.random() * 2 + 1;
                this.density = (Math.random() * 30) + 1;
                const colors = ['rgba(99, 102, 241, 0.5)', 'rgba(168, 85, 247, 0.5)', 'rgba(236, 72, 153, 0.5)'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 150;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * this.density;
                const directionY = forceDirectionY * force * this.density;

                if (distance < maxDistance) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        const dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        const dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        const initParticles = () => {
            particles = [];
            // Create a grid of particles
            const numberOfParticles = (canvas.width * canvas.height) / 15000;
            for (let i = 0; i < numberOfParticles; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }

            // Connect particles
            connect();

            animationFrameId = requestAnimationFrame(animate);
        };

        const connect = () => {
            if (!ctx) return;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = dx * dx + dy * dy;

                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        const opacity = 1 - (distance / 20000);
                        if (opacity > 0) {
                            ctx.strokeStyle = `rgba(140, 100, 255, ${opacity * 0.2})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particles[a].x, particles[a].y);
                            ctx.lineTo(particles[b].x, particles[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
        };

        const handleCanvasMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        window.addEventListener('mousemove', handleCanvasMouseMove);
        window.addEventListener('resize', resizeCanvas);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleCanvasMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="background-wrapper">
            {/* Global Gradients */}
            <div className="app-background" />
            {/* Canvas Layer */}
            <canvas ref={canvasRef} className="background-canvas" />
            {/* Gradient Orbs (Global) */}
            <div className="hero-orb hero-orb-primary" style={{ top: '-10%', left: '-5%', position: 'absolute' }} />
            <div className="hero-orb hero-orb-secondary" style={{ bottom: '-10%', right: '-5%', position: 'absolute' }} />
            <div className="hero-orb hero-orb-tertiary" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute' }} />
            {/* Global Texture Overlays */}
            <div className="app-grid-overlay" />
            <div className="app-noise-overlay" />
        </div>
    );
};

export default Background;
