import Link from "next/link";

import CanvasController from "./canvas_controller";
import { FaHome } from "react-icons/fa";
import DocTitle from "./title";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function DocumentPage() {
  return (
    <div className="w-[100%]">
      <div className="navBar">
        <Suspense fallback={<p>Loading...</p>}>
          <DocTitle />
        </Suspense>
        <Link href="/">
          <FaHome size={24} color="white" /> 
        </Link>
      </div>

      <CanvasController/>

    </div>
  );
}
