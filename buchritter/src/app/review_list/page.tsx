import Link from 'next/link';

import {FaHome} from 'react-icons/fa';
import ReviewList from '@/app/review_list/review_list';

export default function ReviewPage() {
  return (
    <div className="h-screen w-[100%] flex flex-col">
      <div className="navBar sticky top-0 z-20">
        <div className="text-2xl p-1.5">Literature Reviews</div>
        <Link href="/">
          <FaHome size={24} color="white" /> 
        </Link>
      </div>

      {/* Placeholder div, replace with list */}
      <div className="flex justify-center p-4">
        <ReviewList/>
      </div>
    </div>
  );
}