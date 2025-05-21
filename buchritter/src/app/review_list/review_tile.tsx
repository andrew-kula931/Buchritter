"use client"

import { useState } from "react";

export default function ReviewTile({title, rating, tags, summary, image_path}: 
  {title: String, rating: number, tags: String[], summary: String, image_path: string | undefined}) 
  {

  const [expanded, setExpanded] = useState<boolean>();

  return (
    <div className="flex flex-col pt-1 pr-1 pl-1 w-[500px] bg-gray-600 rounded">
      <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col">
          <p className="pl-1 pt-1 text-2xl">{title} - {rating.toString()}</p>
          <p className="pl-2 pb-1 text-sm">{tags.join(", ")}</p>
        </div>
        <img className="p-1" src={image_path} alt={"Placeholder Image"}></img> 
      </div>
      {expanded &&
        <div className="p-1">
          <hr></hr>
          <p className="pt-1">{summary}</p>
        </div>
      }
    </div>
  );
}

