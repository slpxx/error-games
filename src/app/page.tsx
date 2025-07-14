
export default function Home() {
    return (
        <main className="min-h-screen font-sans">
            <section id="hero" className="h-screen flex items-center justify-center">
                <h1 className="text-4xl font-bold">반지하게임즈 클론</h1>
            </section>

            <section id="about" className="h-screen flex items-center justify-center">
                <h2 className="text-3xl">About Us</h2>
            </section>

            <section id="games" className="h-screen flex items-center justify-center">
                <h2 className="text-3xl">Our Games</h2>
            </section>

            <section id="contact" className="h-screen flex items-center justify-center">
                <h2 className="text-3xl">Contact</h2>
            </section>
        </main>
    );
}