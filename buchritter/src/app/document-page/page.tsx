import Link from "next/link";

import { Canvas, docStyle } from "./canvas";

export default function DocumentPage() {
  return (
    <div>
      <div className="navBar">
        <textarea
          className="textareaDefault"
          style={docStyle.title}
          defaultValue="Doc Name"
        />
        <Link href="/">Click here to go back</Link>
      </div>
      <div className="bg-white !text-green-500 border-2">
        Some text
      </div>
      <Canvas />
    </div>
  );
}
