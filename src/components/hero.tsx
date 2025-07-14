"use client";

import React from "react";

type HeroProps = {
    bg: string;
    titleLines: string[];
    downloads: string;
};

export default function Hero({ bg, titleLines, downloads }: HeroProps) {
    return (
        <section
            id="hero"
            className="h-screen relative bg-cover bg-center bg-no-repeat flex items-center justify-center"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >

            {/* 콘텐츠 */}
            <div className="relative z-10 text-center px-4">
                <h1 className="text-3xl md:text-5xl font-bold leading-relaxed mb-6 space-y-2">
                    {titleLines.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </h1>

                <div className="text-lg mb-1">누적 다운로드 수</div>
                <div className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                    {downloads}
                </div>
            </div>
        </section>
    );
}