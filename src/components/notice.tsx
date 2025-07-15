export default function Notice() {
    return (
        <section id="notice" className="min-h-screen flex flex-col justify-center items-center">
            <div className="max-w-4xl w-full px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">NOTICE</h2>
                <h3 className="text-3xl font-bold mb-8">
                    반지하게임즈의 최신 소식을 살펴보세요.
                </h3>
                <div className="flex flex-col md:flex-row gap-10 justify-center items-center max-w-4xl mx-auto">
                    {/* Instagram Card */}
                    <a
                        href="https://www.instagram.com/seoul2033/?hl=ko"
                        className="group relative w-80 h-52 bg-[#2a2a2a] rounded-lg p-6 pt-16 block"
                    >
                        <svg className="absolute top-6 left-6 w-8 h-8" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M336 96c21.2 0 41.3 8.4 56.5 23.5S416 154.8 416 176v160c0 21.2-8.4 41.3-23.5 56.5S357.2 416 336 416H176c-21.2 0-41.3-8.4-56.5-23.5S96 357.2 96 336V176c0-21.2 8.4-41.3 23.5-56.5S154.8 96 176 96h160m0-32H176c-61.6 0-112 50.4-112 112v160c0 61.6 50.4 112 112 112h160c61.6 0 112-50.4 112-112V176c0-61.6-50.4-112-112-112z"></path>
                            <path d="M360 176c-13.3 0-24-10.7-24-24s10.7-24 24-24c13.2 0 24 10.7 24 24s-10.8 24-24 24zM256 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64m0-32c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z"></path>
                        </svg>
                        <div className="relative mt-2 text-left">
                            <h3 className="text-2xl font-bold">Instagram</h3>
                            <p className="text-gray-300 text-sm mt-1">
                                반지하의 인스타그램! 반지하의 소식과 이벤트를 만나 보세요.
                            </p>
                        </div>
                    </a>

                    {/* Youtube Card */}
                    <a
                        href="https://www.youtube.com/channel/UCEQPpWLgJ5Ce222EiBg2dbc"
                        className="group relative w-80 h-52 bg-[#2a2a2a] rounded-lg p-6 pt-16 block"
                    >
                        <svg className="absolute top-6 left-6 w-8 h-8" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M941.3 296.1a112.3 112.3 0 0 0-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0 0 82.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z"></path>
                        </svg>
                        <div className="relative mt-2 text-left">
                            <h3 className="text-2xl font-bold">Youtube Channel</h3>
                            <p className="text-gray-300 text-sm mt-1">
                                반지하의 공식 유튜브 채널입니다.
                            </p>
                        </div>
                    </a>

                    {/* Email Card */}
                    <a
                        href="mailto:banjihagames.help@gmail.com"
                        className="group relative w-80 h-52 bg-[#2a2a2a] rounded-lg p-6 pt-16 block"
                    >
                        <svg className="absolute top-6 left-6 w-8 h-8" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <div className="relative mt-2 text-left">
                            <h3 className="text-2xl font-bold">E-Mail</h3>
                            <p className="text-gray-300 text-sm mt-1">
                                다양한 문의 사항을 접수해 주세요!
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
