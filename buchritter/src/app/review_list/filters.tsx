"use client"

import { MdOutlineRefresh } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useState } from 'react';
import { Plus } from 'lucide-react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


const tags = ["Movie", "Manga", "Book", "Show", "Journal", "Anime", "Comic"];

export default function FilterMenu() {
  const [rotate, setRotate] = useState(false);
  const [selected, setSelected] = useState<string[]>(["Movie"]);
  const [ratings, setRatings] = useState<number[]>([0,5]);

  const refreshSpin = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 500);
  }

  const ratingChange = (event: Event, newValue: number[]) => {
    setRatings(newValue);
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
            className="py-1 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg 
              border border-transparent text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-transform"
          >
            <MdOutlineRefresh className={`transition-transform duration-500 ${rotate ? 'rotate-[360deg]' : ''}`} />
            <div className="pt-1">
              Refresh
            </div>
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
        <div className="flex flex-row spacing-4">
          <p className="pr-6 pt-1.5">{ratings[0]}</p>
          <Box className="pr-4" sx={{width: 180}}>
            <Slider
              getAriaLabel={() => 'Title'} 
              value={ratings}
              onChange={ratingChange}
              min={0}
              max={5}
              step={0.1}
              disableSwap
            />
          </Box>
          <p className="pt-1.5 w-[30px]">{ratings[1]}</p>
        </div>
      </div>

      {/* Tag Selection */}
      <div className="flex flex-row items-center justify-between pb-4">
        <div>Tags</div>
        <div className="w-[80%] flex flex-wrap gap-2 justify-end">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => 
                setSelected((prevSelected) =>
                  prevSelected.includes(tag)
                    ? prevSelected.filter((t) => t !== tag)
                    : [...prevSelected, tag]
                )
              }
              className={`px-4 py-1 rounded-md text-sm ${selected.includes(tag)
                ? "bg-blue-600 text-white"
                : 'bg-gray-400 text-gray-800 hover:bg-gray-300'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}