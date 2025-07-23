export default function Footer() {
    return (
        <footer className="m-20 space-y-10">
            <div className="flex flex-col items-center justify-center text-center space-y-1">
                <p className="font-bold text-lg mb-2">ERROR Co.,Ltd.</p>
                <p className="text-sm">대표: 심영우</p>
                <p className="text-sm">사업자 등록번호: 403-81-85298</p>
                <p className="text-sm">
                    50113 경상남도 거창군 웅양면 노현리 210-2 (주식회사 이알알오알)
                </p>
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-1 text-yellow-300">
                <p className="font-bold text-sm">서비스 이용 약관</p>
                <p className="font-bold text-sm">개인정보처리방침</p>
                <p className="font-bold text-sm">개발자 연락처: +82 10 5404 5303</p>
                <p className="font-bold text-sm">
                    문의:
                    <a
                        href="mailto:errorgamescom@errorcoltd.com"
                        className="hover:underline ml-1"
                    >
                        errorgamescom@errorcoltd.com
                    </a>
                </p>
            </div>
        </footer>
    );
}