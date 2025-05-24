"use client"

import { useState, useRef } from 'react';
import { Review, Configurations, getReviews } from '@/server/api/review_req';
import ReviewList from '@/app/review_list/review_list';
import FilterMenu from '@/app/review_list/filters';
import ReviewDetails from '@/app/review_list/review_details';
import FloatingAddIcon from '@/app/components/add_icon';

// Need to set up the filter menu by allowing filters to trigger a requery
export default function ReviewListController({ tags, reviews }: { tags: Configurations[], reviews: Review[] }) {
    const [modal, setModal] = useState<boolean>(false);
    const [allReviews, setReviews] = useState<Review[] | undefined>(undefined);
    const currentReview = useRef<Review | undefined>(undefined);

    const handleUpdate = async (update: boolean) => {
        if (update) {
            const reviews = await getReviews() as unknown as Review[];
            setReviews(reviews);
        }
    }

    return (
        <div className="flex flex-row w-screen">
            <FilterMenu 
                tags={tags.map((t) => t.value)} 
            />

            <ReviewList 
                reviews={allReviews ?? reviews} 
                editCallback={(id: number) => {
                    currentReview.current = reviews.filter((r) => r.id == id)[0];
                    setModal(true);
                }} 
            />
            
            <ReviewDetails 
                isOpen={modal} 
                tagConfigs={tags} 
                reviewRef={currentReview.current ?? undefined}
                onClose={(update: boolean) => {
                    handleUpdate(update);
                    setModal(false);
                }}
            />

            <FloatingAddIcon 
                onClick={() => {
                    currentReview.current = undefined;
                    setModal(true);
                }}
            />
        </div>
    );
}