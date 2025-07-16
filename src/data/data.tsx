export type Game = {
    id: string;
    title: string;
    image: string;
    appStore: string;
    playStore: string;
};

export const gameList: Game[] = [
    {
        id: 'farmstone',
        title: '수확의 정석',
        image: '/image/farm_stone.png',
        appStore: 'https://apps.apple.com/kr/app/%EC%84%9C%EC%9A%B8-2033/id1439604101',
        playStore: 'https://play.google.com/store/apps/details?id=com.banjihagames.seoul2033&hl=ko',
    },
    {
        id: 'seoul2033',
        title: '서울 2033',
        image: '/image/seoul-2033.png',
        appStore: 'https://apps.apple.com/kr/app/%EC%84%9C%EC%9A%B8-2033-%ED%9B%84%EC%9B%90%EC%9E%90/id1447640916',
        playStore: 'https://play.google.com/store/apps/details?id=com.banjihagames.seoul2033_backer&hl=ko',
    },
    {
        id: 'seoul2033backer',
        title: '서울 2033:후원자',
        image: '/image/seoul-2033-sponsor.png',
        appStore: 'https://apps.apple.com/kr/app/%EC%97%B0%EC%B0%A8-%EC%82%AC%EC%9C%A0-%ED%9E%88%EC%96%B4%EB%A1%9C/id1579157040',
        playStore: 'https://play.google.com/store/apps/details?id=com.banjihagames.wony_heroes&hl=ko',
    },
];