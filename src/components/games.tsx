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
                                <div
                                    className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-xl overflow-hidden shadow-md group"
                                >
                                    {/* 이미지 */}
                                    <Image
                                        src={game.image}
                                        alt={game.title}
                                        fill
                                        className="object-cover transition duration-300"
                                    />

                                    {/* 어두운 배경 레이어 */}
                                    <div
                                        className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition duration-300"/>

                                    {/* 아이콘 컨테이너 */}
                                    <div
                                        className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300">
                                        {/* iOS 버튼 */}
                                        <a
                                            href={game.appStore}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-110 transition"
                                        >
                                            <svg
                                                className="w-7 h-7 text-black"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12.367 8.501c-0.020-2.026 1.652-2.998 1.727-3.046-0.94-1.375-2.404-1.564-2.926-1.585-1.246-0.126-2.431 0.734-3.064 0.734-0.631 0-1.607-0.715-2.64-0.696-1.358 0.020-2.61 0.79-3.31 2.006-1.411 2.448-0.361 6.076 1.014 8.061 0.672 0.972 1.473 2.064 2.525 2.025 1.013-0.040 1.396-0.656 2.621-0.656s1.569 0.656 2.641 0.635c1.090-0.020 1.781-0.991 2.448-1.966 0.772-1.128 1.089-2.219 1.108-2.275-0.024-0.011-2.126-0.816-2.147-3.236zM10.353 2.555c0.558-0.677 0.935-1.617 0.832-2.555-0.804 0.033-1.779 0.536-2.356 1.212-0.518 0.6-0.971 1.557-0.85 2.476 0.898 0.070 1.815-0.456 2.373-1.132z"/>
                                            </svg>
                                        </a>

                                        {/* Android 버튼 */}
                                        <a
                                            href={game.playStore}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-110 transition"
                                        >
                                            <svg
                                                className="w-7 h-7 text-black"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M14 6c-0.55 0-1 0.45-1 1v4c0 0.55 0.45 1 1 1s1-0.45 1-1v-4c0-0.55-0.45-1-1-1zM2 6c-0.55 0-1 0.45-1 1v4c0 0.55 0.45 1 1 1s1-0.45 1-1v-4c0-0.55-0.45-1-1-1zM3.5 11.5c0 0.828 0.672 1.5 1.5 1.5v0 2c0 0.55 0.45 1 1 1s1-0.45 1-1v-2h2v2c0 0.55 0.45 1 1 1s1-0.45 1-1v-2c0.828 0 1.5-0.672 1.5-1.5v-5.5h-9v5.5z"></path>
                                                <path
                                                    d="M12.472 5c-0.152-1.373-0.922-2.559-2.025-3.276l0.5-1.001c0.123-0.247 0.023-0.547-0.224-0.671s-0.547-0.023-0.671 0.224l-0.502 1.004-0.13-0.052c-0.446-0.148-0.924-0.229-1.42-0.229s-0.974 0.081-1.42 0.229l-0.13 0.052-0.502-1.004c-0.123-0.247-0.424-0.347-0.671-0.224s-0.347 0.424-0.224 0.671l0.5 1.001c-1.103 0.716-1.873 1.903-2.025 3.276v0.5h8.972v-0.5h-0.028zM6.5 4c-0.276 0-0.5-0.224-0.5-0.5s0.223-0.499 0.499-0.5c0 0 0.001 0 0.001 0s0.001-0 0.001-0c0.276 0.001 0.499 0.224 0.499 0.5s-0.224 0.5-0.5 0.5zM9.5 4c-0.276 0-0.5-0.224-0.5-0.5s0.223-0.499 0.499-0.5c0 0 0.001 0 0.001 0s0.001-0 0.002-0c0.276 0.001 0.499 0.224 0.499 0.5s-0.224 0.5-0.5 0.5z"/>
                                            </svg>
                                        </a>
                                    </div>
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
