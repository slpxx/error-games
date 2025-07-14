
export default function Home() {
    return (
        <main className="min-h-screen font-sans scroll-smooth">
            {/* Hero Section */}
            <section
                id="hero"
                className="h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/bg-hero.jpg')"
                }}
            >
                {/* 배경 오버레이 */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* 메인 콘텐츠 */}
                <div className="relative z-10 text-center text-white px-4">
                    <h3 className="text-3xl font-bold mb-6 tracking-wider">
                        <p>반지하게임즈는</p>
                        <p>독창적이고, 용기를 가지고, 재미있게 일합니다!</p>
                    </h3>
                    <div>
                        누적다운로드 수
                    </div>
                    <div className="text-3xl font-bold">
                        1,850,000
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="min-h-screen flex items-center justify-center py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12">About</h2>
                    <p className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
                        아류로 성공하느니 오리지널로 망하자!
                    </p>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        반지하게임즈는 2017년도에 설립된 인디 게임 스타트업으로,
                        반지하게임즈의 원동력인 반지하 자취방에서 즐겁게 게임을
                        만들던 초심을 잊지 말자는 뜻을 담고 있습니다.
                    </p>
                </div>
            </section>

            {/* Games Section */}
            <section id="games" className="min-h-screen py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Games</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">

                    </div>
                </div>
            </section>

            {/* Notice Section */}
            <section id="notice" className="min-h-screen flex items-center justify-center py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12">NOTICE</h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">비즈니스 문의</h3>
                            <a
                                href="mailto:contact@errorgames.com"
                                className="text-lg text-gray-300 hover:text-white transition-colors duration-200"
                            >
                                contact@errorgames.com
                            </a>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold mb-4">개발팀 연락처</h3>
                            <a
                                href="mailto:dev@errorgames.com"
                                className="text-lg text-gray-300 hover:text-white transition-colors duration-200"
                            >
                                dev@errorgames.com
                            </a>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-700">
                        <p className="text-gray-400 text-sm">
                            © 2024 Error Games. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                            세상에 없던 런 게임을 만드는 Error Games입니다.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}