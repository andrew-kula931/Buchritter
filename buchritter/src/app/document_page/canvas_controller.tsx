"use client"

import { ToolBar, RichTextEditor } from "./canvas";
import React, { useState } from "react";

export interface EditorState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  lineThrough: boolean;
  align: "left" | "center" | "right" | "justify";
}

export default function CanvasController() {
  const [state, setState] = useState<EditorState>({
    bold: false,
    italic: false,
    underline: false,
    lineThrough: false,
    align: "left"
  });

  const updateState = (key: keyof typeof state, value: boolean | string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <ToolBar updateState={updateState} state={state}/>
      <RichTextEditor updateState={updateState} state={state} />
    </div>
  );
}
//<Canvas state={state}/>