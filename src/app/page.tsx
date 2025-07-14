
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <section id="hero" className="h-screen bg-black text-white flex items-center justify-center">
          <h1 className="text-4xl font-bold">반지하게임즈 클론</h1>
        </section>

        <section id="about" className="h-screen bg-gray-100 flex items-center justify-center">
          <h2 className="text-3xl font-semibold">About Us</h2>
        </section>

        <section id="games" className="h-screen bg-white flex items-center justify-center">
          <h2 className="text-3xl font-semibold">Our Games</h2>
        </section>

        <section id="contact" className="h-screen bg-gray-200 flex items-center justify-center">
          <h2 className="text-3xl font-semibold">Contact</h2>
        </section>
      </main>
    </div>
  );
}
