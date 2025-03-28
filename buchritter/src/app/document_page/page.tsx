import Link from "next/link";

import CanvasController from "./canvas_controller";
import { FaHome } from "react-icons/fa";
import DocTitle from "./title";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

/**
 * A Text Editor page containing a basic navigation bar overtop a toolbar and editor.
 * 
 * CanvasController child component requires an 'id' in page url for document retreival.
 */
export default function DocumentPage() {
  return (
    <div className="h-screen w-[100%] flex flex-col">
      <div className="navBar sticky top-0 z-20">
        <Suspense fallback={<p>Loading...</p>}>
          <DocTitle />
        </Suspense>
        <Link href="/">
          <FaHome size={24} color="white" /> 
        </Link>
      </div>

      <div className="flex-1 overflow-auto relative z-10">
        <CanvasController/>
      </div>

    </div>
  );
}
