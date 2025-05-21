"use client"

import { Review } from "@/server/api/review_req";
import ReviewTile from "@/app/review_list/review_tile";

export default function ReviewList({ reviews }: { reviews: Review[] }) {

  return (
    <div className="grow w-[60%] h-[80%] p-4">
      <div className="flex-grid items-start justify-center border-2 border-gray-700 rounded-sm">
        <ul className="p-2 space-y-4">
          {reviews.map((r: any, idx: number) => (
              <li key={r.id}>
                <div>
                  <ReviewTile
                    title={r.title}
                    rating={r.rating}
                    tags={r.tags.map((tag: any) => tag.value)}
                    summary={r.summary}
                    image_path={r.image_path}
                  />
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}