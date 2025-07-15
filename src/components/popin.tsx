'use client';

import { useEffect, useRef, useState } from 'react';

interface PopInProps {
    children: React.ReactNode;
    delay?: number; // milliseconds
}

export default function PopIn({ children, delay = 0 }: PopInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`transition-transform duration-700 ease-out ${
                isVisible ? 'animate-pop-in' : 'opacity-0 translate-y-6'
            }`}
            style={{ willChange: 'opacity, transform' }}
        >
            {children}
            <style jsx>{`
                @keyframes pop-in {
                    0% {
                        opacity: 0;
                        transform: translateY(24px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}