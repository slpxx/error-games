import React from "react";

type AboutProps = {
    title1: string;
    title2: string;
    tagline: string;
    description1: string;
    description2: string;
    description3: string;
};

export default function About({ tagline, title1, title2, description1, description2, description3 }: AboutProps) {
    return (
        <section id="about" className="min-h-screen flex flex-col items-center justify-center">
            <div id="title-container" className="max-w-4xl mx-auto flex flex-col py-4 px-6">
                <p className="text-2xl md:text-3xl font-semibold mb-6 text-left">
                    {tagline}
                </p>

                <div className="text-center">
                    <h2 className="text-6xl font-bold">
                        {title1}
                    </h2>
                    <h2 className="text-6xl font-bold">
                        {title2}
                    </h2>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center py-4">
                {/* 설명 */}
                <p className="text-lg">
                    {description1}
                </p>
                <p className="text-lg">
                    {description2}
                </p>
                <p className="text-lg">
                    {description3}
                </p>
            </div>
        </section>
    );
}