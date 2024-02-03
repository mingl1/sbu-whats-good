"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const prompts = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const searchParams = useSearchParams();
  // meal is wat da user selects (unlimited, swipe, or dining)
  const meal = searchParams.get("meal");

  const changeUserPrompt = (e) => {
    setUserPrompt(e.target.value);
    console.log(userPrompt);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10">
        <p className="mb-2">
          Ask about the food options at Stony Brook University!
        </p>
        <textarea
          onChange={changeUserPrompt}
          className="resize-none outline-none font-sans font-xs w-[800px] h-min p-2 bg-neutral-800 rounded-md border-solid border-2 border-[#586A6A]"
        ></textarea>
      </div>
      <div className="grid grid-cols-2 gap-2 max-w-[800] mb-5">
        <div className="w-[400px] p-1 bg-neutral-800 text-center rounded-md">
          Item 1
        </div>
        <div className="w-[400px] p-1 bg-neutral-800 text-center rounded-md">
          Item 2
        </div>
        <div className="w-[400px] p-1 bg-neutral-800 text-center rounded-md">
          Item 3
        </div>
        <div className="w-[400px] p-1 bg-neutral-800 text-center rounded-md">
          Item 4
        </div>
      </div>
      <div className="flex justify-start">
        <div class="">stuff</div>
      </div>
    </div>
  );
};

export default prompts;
