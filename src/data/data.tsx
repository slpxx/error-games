export type Game = {
    id: string;
    title: string;
    image: string;
    appStore: string | null;
    playStore: string | null;
};

export const gameList: Game[] = [
    {
        id: 'DungeonPool',
        title: '출시 예정',
        image: '/image/DungeonPool.png',
        appStore: null,
        playStore: null,
    },
];

/*
export const gameList: Game[] = [
    {
        id: 'seoul2033',
        title: '서울 2033',
        image: '/image/seoul-2033.png',
        appStore: 'https://apps.apple.com/kr/app/%EC%84%9C%EC%9A%B8-2033/id1439604101',
        playStore: 'https://play.google.com/store/apps/details?id=com.banjihagames.seoul2033&hl=ko',
    },
    {
        id: 'seoul2033backer',
        title: '서울 2033:후원자',
        image: '/image/seoul-2033-sponsor.png',
        appStore: 'https://apps.apple.com/kr/app/%EC%84%9C%EC%9A%B8-2033-%ED%9B%84%EC%9B%90%EC%9E%90/id1447640916',
        playStore: 'https://play.google.com/store/apps/details?id=com.banjihagames.seoul2033_backer&hl=ko',
    },
    {
        id: 'peace-land',
        title: '중고로운 평화나라',
        image: '/image/peace-land.png',
        appStore: null,
        playStore: 'https://play.google.com/store/apps/details?id=com.semibasement.jaquanpaik.joongrous_peaceland&hl=ko',
    },
];
*/