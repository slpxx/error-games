import Image from "next/image";
import FadeIn from "@/components/fadeIn";

export default function Notice() {
  return (
    <section
      id="notice"
      className="flex flex-col justify-center items-center py-16 sm:py-20"
    >
      <FadeIn>
        <div className="max-w-4xl w-full px-6 text-center">
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center max-w-4xl mx-auto">
            {/* X Card */}
            <a
              href="https://x.com/_ErrorGames_"
              className="group card-fade-up relative w-80 h-52 bg-[#2a2a2a] rounded-lg p-6 pt-16 block transition duration-300 ease-out hover:-translate-y-2 hover:bg-[#303030] hover:shadow-[0_16px_40px_rgba(255,255,255,0.10)]"
              style={{ animationDelay: "80ms" }}
            >
              <Image
                src="/icons/X_logo.png"
                alt="X Logo"
                width={32}
                height={32}
                className="absolute top-6 left-6 transition duration-300 group-hover:scale-110"
                priority
              />

              <div className="relative mt-2 text-left">
                <h3 className="text-2xl font-bold">X (Twitter)</h3>
                <p className="text-gray-300 text-sm mt-1">
                  X에서 개발 뉴스 빠르게 만나보세요.
                </p>
              </div>
            </a>

            {/* Instagram Card */}
            <a
              href="https://www.instagram.com/errorgamescom/"
              className="group card-fade-up relative w-80 h-52 bg-[#2a2a2a] rounded-lg p-6 pt-16 block transition duration-300 ease-out hover:-translate-y-2 hover:bg-[#303030] hover:shadow-[0_16px_40px_rgba(255,255,255,0.10)]"
              style={{ animationDelay: "180ms" }}
            >
              <Image
                src="/icons/Instagram_logo.png"
                alt="X Logo"
                width={32}
                height={32}
                className="absolute top-6 left-6 transition duration-300 group-hover:scale-110"
                priority
              />

              <div className="relative mt-2 text-left">
                <h3 className="text-2xl font-bold">Instagram</h3>
                <p className="text-gray-300 text-sm mt-1">
                  인스타그램에서 이벤트를 만나보세요.
                </p>
              </div>
            </a>

            {/* Youtube Card */}
            <a
              href="https://www.youtube.com/@errorgames403"
              className="group card-fade-up relative w-80 h-52 bg-[#2a2a2a] rounded-lg p-6 pt-16 block transition duration-300 ease-out hover:-translate-y-2 hover:bg-[#303030] hover:shadow-[0_16px_40px_rgba(255,255,255,0.10)]"
              style={{ animationDelay: "280ms" }}
            >
              <Image
                src="/icons/YouTube_logo.png"
                alt="X Logo"
                width={32}
                height={32}
                className="absolute top-6 left-6 transition duration-300 group-hover:scale-110"
                priority
              />

              <div className="relative mt-2 text-left">
                <h3 className="text-2xl font-bold">YouTube</h3>
                <p className="text-gray-300 text-sm mt-1">
                  유튜브에서 다양한 소식 함께하세요.
                </p>
              </div>
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
