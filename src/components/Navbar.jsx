import React from "react";

export default function Navbar() {
  return (
    <div className="w-full bg-transparent flex items-center justify-between px-6 py-4">
      <div className="text-2xl font-bold">Eclipse</div>
      <div className="hidden md:flex gap-6 text-sm text-gray-300">
        <button className="hover:text-white">Features</button>
        <button className="hover:text-white">Pricing</button>
        <button className="hover:text-white">FAQs</button>
      </div>
      <div className="ml-4">
        <button className="text-sm bg-white text-black px-4 py-1 rounded-full">Start now →</button>
      </div>
    </div>
  );
}
