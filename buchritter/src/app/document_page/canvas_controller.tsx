"use client"

import { ToolBar, RichTextEditor } from "./canvas";
import React, { useState } from "react";

/**
 * Bold -> Boolean
 * 
 * Italic -> Boolean 
 * 
 * Underline -> Boolean
 * 
 * LineThrough -> Boolean
 * 
 * Bulleted_list -> Boolean
 * 
 * Numbered_list -> Boolean
 * 
 * Code -> Boolean
 * 
 * Align -> 'left' | 'center' | 'right' | 'justify'
 */
export interface EditorState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  lineThrough: boolean;
  bulleted_list: boolean;
  numbered_list: boolean;
  code: boolean;
  align: "left" | "center" | "right" | "justify";
}

export default function CanvasController() {
  const [state, setState] = useState<EditorState>({
    bold: false,
    italic: false,
    underline: false,
    lineThrough: false,
    bulleted_list: false,
    numbered_list: false,
    code: false,
    align: "left"
  });

  const [visualState, setVisualState] = useState<EditorState>({
    bold: false,
    italic: false,
    underline: false,
    lineThrough: false,
    bulleted_list: false,
    numbered_list: false,
    code: false,
    align: "left"
  });

  const updateState = (key: keyof typeof state, value: boolean | string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const updateVisualState = (key: keyof typeof state, value: boolean | string) => {
    setVisualState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <ToolBar updateState={updateState} state={state} updateVisualState={updateVisualState} visualState={visualState}/>
      <RichTextEditor updateState={updateState} state={state} updateVisualState={updateVisualState} visualState={visualState}/>
    </div>
  );
}
//<Canvas state={state}/>