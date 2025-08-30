import Hero from "@/components/hero";
import About from "@/components/about";
import Games from "@/components/games";
import Notice from "@/components/notice";
import React from "react";
import {gameList} from "@/data/data";

export default function Home() {
    return (
        <div className="scroll-smooth">
            <Hero title1="게임의 가치는 재미!" title2="가치있는 게임을 만들기위해 노력하겠습니다."/>

            <About
                title1="멈추지 않는 도전"
                title2="재미를 완성합니다."
                description1="ERROR Co.,Ltd.는 2022년도에 설립된 1인 법인으로,"
                description2="수많은 시행착오와 실패를 두려워하지 않고 '재미'를 향해 나아가는 철학을 담고 있습니다."
                description3="이를 바탕으로, 게임을 통해 여러분들께 즐거움을 전해드리고 싶습니다."
            />

            <Games games={gameList} />

            <Notice/>
        </div>
    );
}