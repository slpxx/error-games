import Hero from "@/components/hero";
import About from "@/components/about";
import Games from "@/components/games";
import Notice from "@/components/notice";
import React from "react";
import {gameList} from "@/data/data";

export default function Home() {
    return (
        <div className="scroll-smooth">
            <Hero bg="/image/banjihagames-logo.png" title1="반지하게임즈는" title2="독창적이고, 용기를 가지고, 재미있게 일합니다!" downloads="1,850,000" />

            <About
                tagline="ABOUT"
                title1="아류로 성공하느니"
                title2="오리지널로 망하자!"
                description1="반지하게임즈는 2017년도에 설립된 인디 게임 스타트업으로,"
                description2="반지하게임즈의 원동력인 반지하 자취방에서 즐겁게 게임을"
                description3="만들던 초심을 잊지 말자는 뜻을 담고 있습니다."
            />

            <Games games={gameList} />

            <Notice/>
        </div>
    );
}