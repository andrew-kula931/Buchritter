"use server"

import Link from 'next/link';

import { FaHome } from 'react-icons/fa';
import ReviewDetails from '@/app/review_list/review_details';
import ReviewListController from '@/app/review_list/list_controller';
import { getReviews, Review } from '@/server/api/review_req';
import { getTags } from '@/server/api/review_req';

export default async function ReviewPage() {
  const tags = await getTags();
  const res = await getReviews() as unknown as Review[];

  return (
    <div className="h-screen w-[100%] flex flex-col">
      <nav className="navBar sticky top-0 z-20">
        <div className="text-2xl p-1.5">Literature Reviews</div>
        <Link href="/">
          <FaHome size={24} color="white" />
        </Link>
      </nav>

      <div className="flex flex-row w-screen">
        <ReviewListController tags={tags.map((t) => t.value)} reviews={res} />
        <ReviewDetails tags={tags} />
      </div>
    </div>
  );
}