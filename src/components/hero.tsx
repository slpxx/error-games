"use client";

import React from "react";
import Image from "next/image";

type HeroProps = {
    bg: string;
    titleLines: string[];
    downloads: string;
};

export default function Hero({ bg, titleLines, downloads }: HeroProps) {
    return (
        <section
            id="hero"
            className="min-h-screen flex flex-col items-center justify-center"
        >
            <Image src={bg} alt="이미지" width={400} height={400} />
            <h3 className="text-3xl font-bold leading-relaxed mb-6 text-center">
                {titleLines.map((line, i) => (
                    <p key={i}>{line}</p>
                ))}
            </h3>

            <div className="text-lg mb-1">누적 다운로드 수</div>
            <div className="text-4xl font-bold drop-shadow-lg">
                {downloads}
            </div>
        </section>
    );
}