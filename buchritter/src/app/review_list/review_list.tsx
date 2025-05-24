"use client"

import { Review } from "@/server/api/review_req";
import ReviewTile from "@/app/review_list/review_tile";

export default function ReviewList({ reviews, editCallback }: { reviews: Review[], editCallback: (reviewId: number) => void }) {
  const handleReviewClick= (id: number) => {
    editCallback(id)
  }

  return (
    <div className="grow w-[60%] h-[80%] p-4">
      <div className="flex-grid items-start justify-center border-2 border-gray-700 rounded-sm">
        <ul className="p-2 space-y-4">
          {reviews.map((r: Review, idx: number) => (
              <li key={r.id}>
                <div>
                  <ReviewTile
                    id={r.id}
                    title={r.title}
                    rating={r.rating}
                    tags={r.tags.map((tag: any) => tag.value)}
                    summary={r.summary}
                    image_path={r.image_path}
                    editClick={handleReviewClick}
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