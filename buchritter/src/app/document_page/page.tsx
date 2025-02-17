import Link from "next/link";

import CanvasController from "./canvas_controller";
import { FaHome } from "react-icons/fa";


export default function DocumentPage() {

  return (
    <div>
      <div className="navBar">
        <textarea
          className="textareaDefault text-2xl"
          rows={1}
          cols={30}
          maxLength={30}
          defaultValue="Doc Name"
        />
        <Link href="/">
          <FaHome size={24} color="white" /> 
        </Link>
      </div>

      <CanvasController />

    </div>
  );
}
