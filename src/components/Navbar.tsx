'use client';

import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
                isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* 로고 */}
                <div
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => scrollToSection('hero')}
                >
                    Error Games
                </div>

                {/* 메뉴 */}
                <div className="space-x-8 hidden md:flex text-sm font-medium">
                    <button onClick={() => scrollToSection('about')}>ABOUT</button>
                    <button onClick={() => scrollToSection('games')}>GAMES</button>
                    <button onClick={() => scrollToSection('contact')}>CONTACT</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;