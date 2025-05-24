"use client"

import { useState } from "react";
import { FiEdit2 } from 'react-icons/fi';

export default function ReviewTile({id, title, rating, tags, summary, image_path, editClick}: 
  {id: number, title: String, rating: number, tags: String[], summary: String, image_path: string | undefined, editClick: (id: number) => void }) 
  {

  const [expanded, setExpanded] = useState<boolean>();
  const [editIcon, setEditIcon] = useState<boolean>(false);

  return (
    <div className="flex flex-col pt-1 pr-1 pl-1 w-[500px] bg-gray-600 rounded"
      onMouseEnter={() => setEditIcon(true)} 
      onMouseLeave={() => setEditIcon(false)}
    >
      <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col">
          <div className="flex flex-row justify-start pl-1 pt-1">
            <p className=" text-2xl">{title} - {rating.toString()}</p>
            <FiEdit2 className={`pl-2 hover:text-gray-400 ${editIcon ? "opacity-100" : "opacity-0"}`} 
              size={24} 
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                editClick(id);
              }}/>
          </div>
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

