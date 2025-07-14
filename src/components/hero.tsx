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
            {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* 콘텐츠 */}
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-3xl md:text-5xl font-bold leading-relaxed mb-6 space-y-2">
                    {titleLines.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </h1>

                <div className="text-lg text-gray-300 mb-1">누적 다운로드 수</div>
                <div className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                    {downloads}
                </div>
            </div>
        </section>
    );
}