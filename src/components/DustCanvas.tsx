"use client";

import { useEffect, useRef } from "react";

class Particle {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    alpha: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = -Math.random() * 0.3 - 0.1; // 위로 올라감
        this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.001;

        if (this.alpha < 0) {
            this.alpha = 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    isAlive(): boolean {
        return this.y + this.radius > 0 && this.alpha > 0;
    }
}

export default function DustCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let frameCount = 0;

        const animate = () => {
            frameCount++;

            ctx.clearRect(0, 0, width, height);

            if (frameCount % 4 === 0 && particlesRef.current.length < 100) {
                particlesRef.current.push(new Particle(width, height));
            }

            particlesRef.current.forEach((p) => {
                p.update();
                p.draw(ctx);
            });

            particlesRef.current = particlesRef.current.filter((p) => p.isAlive());

            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current!);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[-1]"
        />
    );
}
