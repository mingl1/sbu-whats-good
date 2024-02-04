"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import React from 'react'
import Link from "next/link";
import PromptOutput from '../components/PromptOutput';

// Get three random recommendations; can add more if ya want
function recommend() {
    const recommendations = [
        "Asian cuisine",
        "Coffee and drinks",
        "Small snack",
        "Desserts and sweets",
        "Healthy and hearty",
        "Hamburger and sandwiches",
        "Vegetarian",
        "Vegan",
        "Halal",
        "Salad and fruits"
      ];
    
      let index1 = Math.floor(Math.random() * recommendations.length);
      let rec1 = recommendations[index1];
      recommendations.splice(index1, 1);
      let index2 = Math.floor(Math.random() * recommendations.length);
      let rec2 = recommendations[index2];
      recommendations.splice(index2, 1);
      let index3 = Math.floor(Math.random() * recommendations.length);
      let rec3 = recommendations[index3];

      return { rec1, rec2, rec3 };
}

const prompts = () => {
  const [userPrompt, setUserPrompt] = useState("");
  const [allPrompts, setAllPrompts] = useState([]);
  const [recommendations, setRecommendations] = useState({ rec1: "", rec2: "" });

  const searchParams = useSearchParams();
  // meal is wat da user selects (unlimited, swipe, or dining)
  const meal = searchParams.get("meal");

  // Set inital recommended prompts so that client and server variables are da same
  useEffect(() => {
    setRecommendations(recommend());
  }, []);

  let plan;
  if (meal === "unlimited") {
    plan = "Unlimited Meal Plan";
  } else if (meal === "swipe") {
    plan = "Meal Swipes & Dining Dollars Meal Plan";
  } else if (meal === "dining") {
    plan = "Dining Dollars Meal Plan";
  }

  // Controls state variable
  const changeUserPrompt = (e) => {
    setUserPrompt(e.target.value);
    console.log(userPrompt);
  };

  // Adds a new user prompt and updates allPrompts
  const addPrompt = (userPrompt) => {
    const newPrompt = {
      prompt: `${userPrompt}`,
      // REPLACE RESPONSE WITH DA ACTUAL RESPONSE FROM THE AI
      response: `${userPrompt}`
    };

    setAllPrompts([newPrompt, ...allPrompts]);
  };

  // Manages when Enter key is pressed (create a new prompt)
  const newPrompt = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPrompt(userPrompt);
      e.target.value = "";
    }
  };

  // Show output of the user prompts&response only when they exist
  let view;
  if (allPrompts.length > 0) {
    view = allPrompts.map((tuple, index) => (
      <div key={index} className="w-full">
        <p className="border-t border-gray-700 my-5 w-full"></p>
        <p className="max-w-[800px]">{tuple.prompt}</p>
        <p className="border-t border-gray-700 my-5 w-full"></p>
        <PromptOutput text={`${tuple.response}`} isNew={(index === 0)} />
      </div>
    ));
  }

  return (
    <div className="flex flex-col shrink-0 justify-center items-center">
      <div className="flex flex-col w-auto">
        <div className="mt-10 mb-10">
          <div className="flex justify-between">
            <p className="mb-2">{plan}</p>
            <Link href="/">Wolfieats🍕</Link>
          </div>
          <textarea
            onKeyDown={newPrompt}
            onChange={changeUserPrompt}
            placeholder="Ask about your food options at Stony Brook University!"
            className="resize-none outline-none font-sans font-xs w-[800px] h-min p-2 bg-neutral-800 rounded-md border-solid border-2 border-[#586A6A]"
          ></textarea>
          <div className="flex justify-center max-w-[800] gap-2">
            <div onClick={() => addPrompt(recommendations.rec1)} className="cursor-pointer p-1 bg-neutral-800 text-center rounded-md">
              {recommendations.rec1}
            </div>
            <div onClick={() => addPrompt(recommendations.rec2)} className="cursor-pointer p-1 bg-neutral-800 text-center rounded-md">
              {recommendations.rec2}
            </div>
            <div onClick={() => addPrompt(recommendations.rec3)} className="cursor-pointer p-1 bg-neutral-800 text-center rounded-md">
              {recommendations.rec3}
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
