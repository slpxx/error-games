import FadeIn from "@/components/fadeIn";

type HeroProps = {
    title1: string;
    title2: string;
};

export default function Hero({ title1, title2 }: HeroProps) {
    return (
        <section
            id="hero"
            className="min-h-[38vh] flex flex-col items-center justify-start pt-24 pb-10 sm:pt-28 sm:pb-12"
        >
            <FadeIn>
                <div className="flex flex-col items-center justify-center">
                    <div className="max-2xl text-center text-3xl font-bold mb-6 text-glow-pulse">
                        <h2>
                            {title1}
                        </h2>
                        <h2>
                            {title2}
                        </h2>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}
