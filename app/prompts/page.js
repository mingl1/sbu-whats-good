"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, Suspense } from "react";
import React from "react";
import Link from "next/link";
import PromptOutput from "../components/PromptOutput";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// Get three random recommendations; can add more if ya want
let timer;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export default function Prompts() {
  const [userPrompt, setUserPrompt] = useState("");
  const [allPrompts, setAllPrompts] = useState([]);
  const [threadId, setThreadId] = useState("");
  // const [aiResponse, setAiResponse] = useState("");
  const [assistantId, setAssistantId] = useState(
    "asst_62TDGnN62oH98zKeRxYBD2cb"
  );
  const [runId, setRunId] = useState("");
  const [recommendations, setRecommendations] = useState({
    rec1: "",
    rec2: "",
  });

  const searchParams = <Suspense>{useSearchParams()}</Suspense>;
  // meal is wat da user selects (unlimited, swipe, or dining)
  const meal = searchParams.get("meal");
  const recommend = () => {
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
      "Salad and fruits",
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
  };
  // Set inital recommended prompts so that client and server variables are da same
  useEffect(() => {
    setRecommendations(recommend());
  }, []);
  const addPrompt = useCallback(
    (userPrompt, aiAnswer) => {
      const newPrompt = {
        prompt: `${userPrompt}`,
        // REPLACE RESPONSE WITH DA ACTUAL RESPONSE FROM THE AI
        response: `${aiAnswer}`,
      };
      allPrompts.shift();
      const a = allPrompts;
      setAllPrompts([newPrompt, ...a]);
    },
    [allPrompts]
  );
  useEffect(() => {
    if (runId) {
      const getMessages = async () => {
        const messages = await axios.post(`/api/thread/run`, {
          runId,
          threadId,
        });
        console.log(messages.data);
        return messages.data.status === "completed";
      };
      timer = setInterval(async () => {
        let r = await getMessages();
        if (r) {
          const answer = await axios
            .get(`/api/messages?threadId=${threadId}`)
            .then((res) => {
              // console.log(res.data.messages.data[0].content[0]);
              return res.data.messages.data[0].content[0].text.value;
            })
            .catch((err) => {
              console.log(err);
            });
          // setAiResponse(answer.data.message.content);
          // console.log(answer);
          addPrompt(userPrompt, answer);

          // setAllPrompts([newPrompt, ...allPrompts]);
          setRunId("");
          return clearInterval(timer);
        }
      }, 1000);
      // getMessages();
    }
  }, [runId, threadId, userPrompt, allPrompts, addPrompt]);
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

  // Manages when Enter key is pressed (create a new prompt)
  const newPrompt = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick(userPrompt);
      e.target.value = "";
    }
  };
  const handleClick = async (userPrompt) => {
    const d = new Date();
    let day = d.getDay();
    setAllPrompts((prev) => [{ status: "loading" }, ...prev]);

    let instructions =
      "I have a " +
      plan +
      ". What are my food options given today is " +
      days[day] +
      "?";
    if (meal === "unlimited") {
      instructions +=
        "DO NOT GIVE ME ANY ITEMS THAT REQUIRES MONEY. I ONLY WANT TO SEE FOOD OPTIONS FROM WEST SIDE DINING, EAST SIDE DINING AND ROTH CAFE";
    } else if (meal === "dining") {
      instructions +=
        "DO NOT GIVE ME ANY ITEMS THAT REQUIRE MEAL SWIPES. I ONLY WANT TO SEE FOOD OPTIONS THAT HAS A PRICE IN MONEY";
    }
    if (!runId && !threadId) {
      const assistantId = "asst_62TDGnN62oH98zKeRxYBD2cb";
      const assistant = await axios.get(
        `/api/assistant?assistantId=${assistantId}`
      );
      const thread = await axios.post("/api/thread");
      const content = userPrompt;
      var formBody = new FormData();
      formBody.append("threadId", thread.data.id);
      formBody.append("content", content);
      const data = await axios.post("/api/messages", formBody);
      formBody.append("assistantId", assistantId);

      formBody.append("instructions", instructions);
      const runId = await axios.post("/api/run", formBody);
      console.log(runId.data);
      setThreadId(thread.data.id);
      setRunId(runId.data.id);
    } else if (!runId) {
      console.log("threadId", threadId);
      const formBody = new FormData();
      formBody.append("threadId", threadId);
      formBody.append("content", userPrompt);
      const data = await axios.post("/api/messages", formBody);
      formBody.append("assistantId", assistantId);
      const instructions =
        "I have a " +
        plan +
        ". What are my food options given today is " +
        days[day] +
        "?";
      formBody.append("instructions", instructions);
      // const runId = await axios.post("/api/run", formBody);
      // console.log(runId.data);
      // setRunId(runId.data.id);
    }
  };
  // Show output of the user prompts&response only when they exist
  let view;
  if (allPrompts.length > 0) {
    view = allPrompts.map((tuple, index) => {
      if (!tuple.prompt) {
        return (
          <Skeleton
            key={index}
            height={200}
            width={800}
            count={1}
            className="bg-[#211c1c] rounded-md"
          />
        );
      }
      return (
        <div key={index} className="w-full h-full">
          <p className="border-t border-gray-700 my-5 w-full"></p>
          <p className="max-w-[800px] max-h-full">{tuple.prompt}</p>
          <p className="border-t border-gray-700 my-5 w-full"></p>
          <PromptOutput text={`${tuple.response}`} isNew={index === 0} />
        </div>
      );
    });
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
            <div
              onClick={() => {
                setUserPrompt(recommendations.rec1);
                handleClick(recommendations.rec1);
              }}
              className="cursor-pointer p-1 bg-neutral-800 text-center rounded-md"
            >
              {recommendations.rec1}
            </div>
            <div
              onClick={() => {
                setUserPrompt(recommendations.rec2);
                handleClick(recommendations.rec2);
              }}
              className="cursor-pointer p-1 bg-neutral-800 text-center rounded-md"
            >
              {recommendations.rec2}
            </div>
            <div
              onClick={() => {
                setUserPrompt(recommendations.rec3);
                handleClick(recommendations.rec3);
              }}
              className="cursor-pointer p-1 bg-neutral-800 text-center rounded-md"
            >
              {recommendations.rec3}
            </div>
          </div>
        </div>
        <div className="flex flex-col overflow-auto items-start gap-4 max-h-[80vh]">
          {view}
        </div>
      </div>
    </div>
  );
}
