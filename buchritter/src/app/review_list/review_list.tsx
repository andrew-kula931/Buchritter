"use client"

import { useEffect, useState } from "react";
import { getReview, getReviews } from "@/server/api/review_req";
import Review from "@/app/review_list/review";

// Only gets one for now
// TODO: Fix any in useState
export default function ReviewList() {
  const [reviews, setReviews] = useState<any[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getReviews();
        setReviews(res);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving reviews:', error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div className="grow w-[60%] h-[80%] p-4">
      <div className="flex-grid items-start justify-center border-2 border-gray-700 rounded-sm">
        <ul className="p-2">
          {loading ? <p>Loading...</p>
            : (reviews!.map((r: any, idx: number) => (
              <li key={r.id}>
                <div>
                  <Review
                    title={r.title}
                    rating={r.rating}
                    tags={r.tags.map((tag: any) => tag.value)}
                    summary={r.summary}
                    image_path={r.image_path}
                  />
                </div>
              </li>
            )))
          }
        </ul>
      </div>
    </div>
  );
}