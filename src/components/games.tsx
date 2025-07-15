import React from "react";

type Game = {
    title: string;
    img: string;
    desc: string;
};

type GamesProps = {
    games: Game[];
};

export default function Games({ games }: GamesProps) {
    return (
        <section id="games" className="min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">GAMES</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {games.map((game, i) => (
                        <div
                            key={i}
                            className="relative group overflow-hidden rounded-lg shadow-md border border-gray-700 hover:scale-[1.02] transition-transform duration-300"
                        >
                            <img
                                src={game.img}
                                alt={game.title}
                                className="w-full h-64 object-cover brightness-90 group-hover:brightness-75 transition duration-300"
                            />

                            <div className="absolute bottom-0 left-0 p-4 z-10">
                                <h3 className="text-xl font-bold mb-1">{game.title}</h3>
                                <p className="text-sm text-gray-300">{game.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
