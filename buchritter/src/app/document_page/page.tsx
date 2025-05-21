"use server"

import Link from "next/link";

import CanvasController from "./canvas_controller";
import { FaHome } from "react-icons/fa";
import DocTitle from "./title";
import { getDoc } from '@/server/api/requests';

// export const dynamic = 'force-dynamic';

/**
 * A Text Editor page containing a basic navigation bar overtop a toolbar and editor.
 * 
 * CanvasController child component requires an 'id' in page url for document retreival.
 */
export default async function DocumentPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined }}) {
  const docId: number = Number(searchParams.id);
  const doc = await getDoc(docId);

  return (
    <div className="h-screen w-[100%] flex flex-col">
      <nav className="navBar sticky top-0 z-20">
        <DocTitle docId={doc?.id ?? 0} title={doc?.name ?? "Untitled"} />
        <Link href="/">
          <FaHome size={24} color="white" />
        </Link>
      </nav>

      <div className="flex-1 overflow-auto relative z-10">
        <CanvasController docRef={doc} />
      </div>

    </div>
  );
}
