"use client"

import { ToolBar } from "./toolbar";
import { RichTextEditor } from "./canvas";
import React, { useState } from "react";
import { Document } from '@/server/api/requests';

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
  align: "left" | "center" | "right";
}

/**
 * Controls passing state between the toolbar and the canvas. 
 * 
 * Requires an 'id' parameter in the page url to retrieve proper document information.
 */
export default function CanvasController({ docRef }: { docRef: Document }) {
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
      <div className="sticky top-0 z-10">
        <ToolBar updateState={updateState} state={state} updateVisualState={updateVisualState} visualState={visualState}/>
      </div>
      <div className="overflow-auto overscroll-contain">
        <RichTextEditor state={state} updateVisualState={updateVisualState} visualState={visualState} docRef={docRef}/>
      </div>
    </div>
  );
}