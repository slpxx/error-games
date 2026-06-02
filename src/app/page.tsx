import Hero from "@/components/hero";
import Games from "@/components/games";
import Notice from "@/components/notice";
import React from "react";
import {gameList} from "@/data/data";

export default function Home() {
    return (
        <div className="scroll-smooth">
            <Hero title1="게임의 가치는 재미!" title2="가치있는 게임을 만들기 위해 노력하겠습니다."/>

            <Games games={gameList} />

            <Notice/>
        </div>
    );
}
