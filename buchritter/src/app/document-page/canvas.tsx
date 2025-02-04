"use client";

import React, { useRef, useState } from "react";

export const docStyle = {
  document: {
    width: "800px",
    minHeight: "1060px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "rgb(66, 66, 66)",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
  },
};

export function Canvas(state: any) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");

  const keyDown = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === "Tab") {
      event.preventDefault();

      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const value = textarea.value;
      const newValue = value.substring(0, start) + '\t' + value.substring(start);

      //Updates state rather than textarea value
      setText(newValue);

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }
      })
    }
  }

  return(
    <div style={docStyle.document}>
      <textarea
        className="textareaDefault w-760px p-10px bg-[rgb(66, 66, 66)]"
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={keyDown}
        rows={40}
        cols={40}
        style={{
          borderRadius: "5px", 
          fontSize: "16px",
          tabSize: 8,
        }}
      />
    </div>
  );
}

export function ToolBar({ updateState, state }: { updateState: (key: any, value: any) => void; state: any }) {
  return(
    <div className="bg-[rgb(50,50,50)] h-auto p-2 flex flex-row">
      <div className="pr-2">Toolbar: </div>
      <div className="pr-2" onClick={() => updateState("bold", !state.bold)}>Bold</div>
      <div className="pr-2" onClick={() => updateState("italic", !state.italic)}>Italic</div>
      <div className="pr-2" onClick={() => updateState("underline", !state.underline)}>Underline</div>
      <div className="pr-2">Bullet Point</div>
      <div className="pr-2">Numbered List</div>
    </div>
  );
}