import Image from "next/image";
import FadeIn from "@/components/fadeIn";
import {Game} from "@/data/data";

type GamesProps = {
    games: Game[];
};

export default function Games({ games }: GamesProps) {
    return (
        <section id="games" className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            <FadeIn>
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">GAMES</h2>
                    <p className="text-center mb-12 text-lg font-medium">
                        반지하게임즈의 다양한 게임을 만나 보세요.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-10">
                        {games.map((game, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center text-center"
                            >
                                <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-md group">
                                    <Image
                                        src={game.image}
                                        alt={game.title}
                                        fill
                                        className="object-cover transition duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50" />
                                </div>
                                <p className="mt-3 text-sm sm:text-base font-bold">{game.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}
