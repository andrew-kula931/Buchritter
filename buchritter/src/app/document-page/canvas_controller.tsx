"use client"

import { Canvas, ToolBar } from "./canvas";
import React, { useState } from "react";

export default function CanvasController() {
  const [state, setState] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: "left"
  });

  const updateState = (key: keyof typeof state, value: any) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <ToolBar updateState={updateState} state={state}/>
      <Canvas state={state}/>
    </div>
  );
}