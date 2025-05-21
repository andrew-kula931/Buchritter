"use client"

import ReviewList from '@/app/review_list/review_list';
import FilterMenu from '@/app/review_list/filters';
import { Review } from '@/server/api/review_req';

// Need to set up the filter menu by allowing filters to trigger a requery
export default function ReviewListController({ tags, reviews }: { tags: string[], reviews: Review[] }) {
    return (
        <div className="flex flex-row w-screen">
            <FilterMenu tags={tags} />
            <ReviewList reviews={reviews} />
        </div>
    );
}