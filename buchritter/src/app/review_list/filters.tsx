"use client"

import { MdOutlineRefresh } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { PiLessThanOrEqual } from "react-icons/pi";
import { useState } from 'react';

const tags = ["Movie", "Manga", "Book", "Show", "Journal", "Anime", "Comic"];

export default function FilterMenu() {
  const [rotate, setRotate] = useState(false);
  const [selected, setSelected] = useState("Movie");

  const refreshSpin = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 500);
  }

  return (
    <div className="m-4 w-[20%] min-w-[300px] flex-col p-3 space-y-4 divide-y divide-gray-800 border-2 rounded-sm border-gray-800 bg-gray-900">

      <div className="flex-col">
        {/* Title and Refresh Button */}
        <div className="flex flex-row justify-between">
          <div className="text-xl">Filters</div>
          <button
            type="button"
            onClick={refreshSpin}
            className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg 
              border border-transparent text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-transform"
          >
            <MdOutlineRefresh className={`transition-transform duration-500 ${rotate ? 'rotate-[360deg]' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Search Bar */}
        <div className="grow items-center pt-2 pb-4">
          <div className="space-y-3 relative">
            <CiSearch className="absolute h-[30px] w-[30px] pl-3 pt-3 text-gray-500" />
            <input
              type="text"
              className="py-3 pl-10 px-4 w-full rounded-lg text-sm bg-gray-800"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      {/* Rating Range */}
      <div className="flex flex-row items-center justify-between pb-4">
        <div>Rating</div>
        <div className="flex flex-row items-center space-x-2">
          <input
            id="lowerRating"
            className="py-2 pl-2 w-[50px] rounded-lg text-sm bg-gray-800"
            placeholder="0"
          />
          <PiLessThanOrEqual />
          <div>Rating</div>
          <PiLessThanOrEqual />
          <input
            id="upperRating"
            className="py-2 pl-2 w-[50px] rounded-lg text-sm bg-gray-800"
            placeholder="5"
          />
        </div>
      </div>

      {/* Tag Selection */}
      <div className="flex flex-row items-center justify-between pb-4">
        <div>Tags</div>
        <div className="w-[80%] flex flex-wrap gap-2 justify-end">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelected(tag)}
              className={`px-4 py-1 rounded-md text-sm ${selected === tag
                ? "bg-blue-600 text-white"
                : 'bg-gray-400 text-gray-800 hover:bg-gray-300'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>



      <div>Date</div>
    </div>
  );
}