"use client";
import React from "react";
import Link from "next/link";

const DiningOptions = ({ label, meal }) => {
  return (
    <Link
      href={{ pathname: "/prompts", query: { meal: `${meal}` } }}
      className="shrink mb-2 text-2xl bg-gray-700 p-6 rounded-md hover:bg-slate-400"
    >
      {label}
    </Link>
  );
};

export default DiningOptions;
