import Image from "next/image";
import FadeIn from "@/components/fadeIn";

type HeroProps = {
    bg: string;
    title1: string;
    title2: string;
    downloads: string;
};

export default function Hero({ bg, title1, title2, downloads }: HeroProps) {
    return (
        <section
            id="hero"
            className="min-h-screen flex flex-col items-center justify-center"
        >
            <FadeIn>
                <div className="flex flex-col items-center justify-center">
                    <Image src={bg} alt="대문이미지" width={400} height={400} />
                    <div className="max-2xl text-center text-3xl font-bold mb-6">
                        <h2>
                            {title1}
                        </h2>
                        <h2>
                            {title2}
                        </h2>
                    </div>

                    <div className="text-lg mb-1">누적 다운로드 수</div>
                    <div className="text-4xl font-bold drop-shadow-lg">
                        {downloads}
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}