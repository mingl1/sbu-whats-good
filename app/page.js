import DiningOptions from "./components/DiningOptions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-6xl font-bold text-center">What's Good @ SBU 🍕</h1>
      <div className="flex flex-col items-center mt-20 gap-4">
        <h1 className="mb-8 text-4xl">Choose Your Meal Plan</h1>
        <DiningOptions label="Unlimited" meal="unlimited" />
        <DiningOptions label="Meal Swipe & Dining Dollars" meal="swipe" />
        <DiningOptions label="Dining Dollars" meal="dining" />
      </div>
      <p className="text-lg text-center bottom-1 absolute">
        @ HopperHacks2024 by Edwin and Ming
      </p>
    </main>
  );
}
