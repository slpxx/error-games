import Hero from "@/components/hero";
import About from "@/components/about";
import Games from "@/components/games";
import Notice from "@/components/notice";

export default function Home() {
    return (
        <div className="font-sans scroll-smooth">
            <Hero bg="/image/banjihagames-logo.png" titleLines={["반지하게임즈는","독창적이고, 용기를 가지고, 재미있게 일합니다!"]} downloads="1,850,000" />

            <About
                tagline="ABOUT"
                title1="아류로 성공하느니"
                title2="오리지널로 망하자!"
                description1="반지하게임즈는 2017년도에 설립된 인디 게임 스타트업으로,"
                description2="반지하게임즈의 원동력인 반지하 자취방에서 즐겁게 게임을"
                description3="만들던 초심을 잊지 말자는 뜻을 담고 있습니다."
            />

            <Games games={[
                { title: "서울 2033", img: "/games/seoul2033.jpg", desc: "디스토피아 RPG" },
                { title: "주사위 제국", img: "/games/dice-empire.jpg", desc: "턴제 전략" },
                // TODO 추가 게임...
            ]} />

            <Notice contacts={[
                { label: "비즈니스 문의", email: "contact@errorgames.com" },
                { label: "개발팀 연락처", email: "dev@errorgames.com" }
            ]} />

            <footer className="bg-black text-white py-10 border-t border-gray-700 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-gray-400 text-sm">
                        © 2024 Error Games. All rights reserved.
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        세상에 없던 런 게임을 만드는 Error Games입니다.
                    </p>
                </div>
            </footer>
        </div>
    );
}