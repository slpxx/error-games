"use client";

import Image from "next/image";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* 로고 */}
        <div className="cursor-pointer" onClick={() => scrollToSection("hero")}>
          <Image
            src="/image/logo-unity.png"
            alt="Logo"
            width={120} // 원하는 크기로 조정
            height={40}
            priority
          />
        </div>

        {/* 메뉴 */}
        <div className="space-x-6 hidden md:flex text-sm font-medium">
          <button
            className="hover:cursor-pointer font-bold"
            onClick={() => scrollToSection("about")}
          >
            ABOUT
          </button>
          <button
            className="hover:cursor-pointer font-bold"
            onClick={() => scrollToSection("games")}
          >
            GAMES
          </button>
          <button
            className="hover:cursor-pointer font-bold"
            onClick={() => scrollToSection("notice")}
          >
            NOTICE
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
