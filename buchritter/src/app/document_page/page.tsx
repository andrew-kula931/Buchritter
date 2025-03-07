import Link from "next/link";

import CanvasController from "./canvas_controller";
import { FaHome } from "react-icons/fa";
import DocTitle from "./title";

export default function DocumentPage() {

  return (
    <div className="w-[100%]">
      <div className="navBar">
        <DocTitle />
        <Link href="/">
          <FaHome size={24} color="white" /> 
        </Link>
      </div>

      <CanvasController/>

    </div>
  );
}
