import React from "react";

type AboutProps = {
    title: string;
    tagline: string;
    description: string;
};

export default function About({ title, tagline, description }: AboutProps) {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center py-20">
            <div className="max-w-4xl px-6 text-center">
                {/* 타이틀 */}
                <h2 className="text-4xl md:text-5xl font-bold mb-12">{title}</h2>

                {/* 슬로건 */}
                <p className="text-2xl md:text-3xl font-semibold mb-8 leading-snug">
                    {tagline}
                </p>

                {/* 설명 */}
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                    {description}
                </p>
            </div>
        </section>
    );
}