import Link from "next/link";

import { Canvas, ToolBar, ToolBarProvider, docStyle } from "./canvas";

export default function DocumentPage() {

  //TODO: Providers cause unnecessary rebuilds
  //Replace it with a parent component that passes
  //down state values and callbacks

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
        <Link href="/">Click here to go back</Link>
      </div>

      <ToolBarProvider>
        <ToolBar />
        <Canvas />
      </ToolBarProvider>
    </div>
  );
}
