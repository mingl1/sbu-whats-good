"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const prompts = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [allPrompts, setAllPrompts] = useState([]);
  const searchParams = useSearchParams();
  // meal is wat da user selects (unlimited, swipe, or dining)
  const meal = searchParams.get("meal");

  let plan;
  if(meal === "unlimited") {
    plan = "Unlimited Meal Plan";
  } else if(meal === "swipe") {
    plan = "Meal Swipes & Dining Dollars Meal Plan";
  } else if(meal === "dining") {
    plan = "Dining Dollars Meal Plan";
  }

  const changeUserPrompt = (e) => {
    setUserPrompt(e.target.value);
    console.log(userPrompt);
  };

  const addPrompt = (userPrompt) => {
    const newPrompt = {
        prompt: `${userPrompt}`,
        response: "hallaow chicekn nuggets are good and u suck"
    };

    setAllPrompts([newPrompt, ...allPrompts]);
  }

  const newPrompt = (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        addPrompt(userPrompt);
        e.target.value = "";
    }
  }                
  
  let view;
  if(allPrompts.length > 0) {
    view = allPrompts.map((tuple, index) => (
        <div key={index} className="w-full">
            <p className="border-t border-gray-700 my-5 w-full"></p>
            <p>{tuple.prompt}</p>
            <p className="border-t border-gray-700 my-5 w-full"></p>
            <p className="mb-5">{tuple.response}</p>
        </div>
    ))
  }

  return (
    <div className="flex flex-col shrink-0 justify-center items-center">
        <div className="flex flex-col w-auto">
            <div className="mt-10 mb-10">
                <div className="flex justify-between">
                    <p className="mb-2">
                        {plan}
                    </p>
                    <Link href={{ pathname: "/"}}>🍕</Link>
                </div>
                <textarea
                    onKeyDown={newPrompt}
                    onChange={changeUserPrompt}
                    placeholder="Ask about your food options at Stony Brook University!"
                    className="resize-none outline-none font-sans font-xs w-[800px] h-min p-2 bg-neutral-800 rounded-md border-solid border-2 border-[#586A6A]"
                ></textarea>      
                <div className="flex justify-center max-w-[800] gap-2">
                    <div className="p-1 bg-neutral-800 text-center rounded-md">
                    Asian cusine near East Side
                    </div>
                    <div className="p-1 bg-neutral-800 text-center rounded-md">
                    Coffee and drinks
                    </div>
                </div>
            </div>
            <div className="flex flex-col max-h-[500px] overflow-scroll items-start gap-4">
                {view}
            </div>
        </div>
    </div>
  );
};

export default prompts;
