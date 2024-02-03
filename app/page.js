import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl font-bold text-center">What's Good @ SBU 🍕</h1>
      <div className="flex flex-col items-center mt-20 gap-4">
        <h1 className="mb-8 text-5xl">Choose Your Meal Plan</h1>
        <button className="mb-2 text-2xl bg-gray-700 p-6 rounded-md hover:bg-slate-400">Unlimited</button>
        <button className="mb-2 text-2xl bg-gray-700 p-6 rounded-md hover:bg-slate-400">Meal Swipe & Dining Dollars</button>
        <button className="mb-2 text-2xl bg-gray-700 p-6 rounded-md hover:bg-slate-400">Dining Dollars</button>
      </div>
      <p className="text-lg text-center bottom-1 absolute">
        @ Hopper hacks 2024 hackathon project by Edwin and Ming
      </p>
    </main>
  );
}
