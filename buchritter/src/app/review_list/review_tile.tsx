"use client"

import { useState } from "react";
import { FiEdit2 } from 'react-icons/fi';
import { Review } from '@/server/api/review_req';

export default function ReviewTile({ reviewRef, editClick}: 
  { reviewRef: Review, editClick: (id: number) => void }) 
  {

  const [expanded, setExpanded] = useState<boolean>(false);
  const [editIcon, setEditIcon] = useState<boolean>(false);

  return (
    <div className="flex flex-col pt-1 pr-1 pl-1 w-[500px] bg-gray-600 rounded"
      onMouseEnter={() => setEditIcon(true)} 
      onMouseLeave={() => setEditIcon(false)}
    >
      <div className="flex flex-row justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col">
          <div className="flex flex-row justify-start pl-1 pt-1">
            <p className=" text-2xl">{reviewRef.title} - {reviewRef.rating.toString()}</p>
            <FiEdit2 className={`pl-2 hover:text-gray-400 ${editIcon ? "opacity-100" : "opacity-0"}`} 
              size={24} 
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                editClick(reviewRef.id);
              }}/>
          </div>
          <p className="pl-2 pb-1 text-sm">{reviewRef.tags.map(t => t.value).join(", ")}</p>
        </div>
        <img className="p-1" src={reviewRef.image_path} alt={"Placeholder Image"}></img> 
      </div>

      {/* Bottom menu that is only opened when the review tile is clicked */}
      {expanded &&
        <div className="p-1">
          <hr></hr>
          <p className="pt-2 pb-2">{reviewRef.summary}</p>
          <a className="text-blue-400 hover:underline" target="_blank" href={reviewRef.link} >{reviewRef.link}</a>
        </div>
      }
    </div>
  );
}

