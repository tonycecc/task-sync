export default function HomePage() {
    return (
      <main className="min-h-screen bg-[#F9E9EC] flex flex-col items-center justify-center">
        <section className="text-center max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#577590] mb-6">
            Welcome to Task Syncss
          </h1>
          <p className="text-lg md:text-xl text-[#577590]/90 mb-8">
            Stay organized, boost productivity, and accomplish more with our intuitive task management tool.
          </p>
          <a
            href="/signup"
            className="inline-block bg-[#F3CA40] text-[#577590] font-semibold px-6 py-3 rounded-full hover:bg-[#F2A541] transition-colors"
          >
            Get Started
          </a>
        </section>
          <section className="w-full max-w-6xl px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-[#F08A4B] font-bold text-lg mb-2">Easy Task Tracking</h2>
            <p className="text-gray-700">
              Quickly add tasks, set priorities, and track progress with minimal effort.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-[#F08A4B] font-bold text-lg mb-2">Collaboration</h2>
            <p className="text-gray-700">
              Share tasks with teammates or family. Assign responsibilities and stay in sync effortlessly.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h2 className="text-[#F08A4B] font-bold text-lg mb-2">Smart Reminders</h2>
            <p className="text-gray-700">
              Get timely notifications and never miss an important task or deadline again.
            </p>
          </div>
        </section>
      </main>
    );
  }
  