"use client";

import React, { createContext, useContext, useRef, useState, ReactNode } from "react";

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

//Local states specific to the canvas and toolbar
interface ToolBarStates {
  bold: boolean;
  italic: boolean;
}

//Inits a undefined state
const ToolBarContext = createContext<{ state: ToolBarStates; setState: React.Dispatch<React.SetStateAction<ToolBarStates>> } | undefined>(undefined);

//Context Provider (Defines the previous state)
export function ToolBarProvider({ children } : { children: ReactNode }) {
  const [state, setState] = useState<ToolBarStates>({ bold: false, italic: false});

  return (
    <ToolBarContext.Provider value={{ state, setState }}>
      {children}
    </ToolBarContext.Provider>
  );
}

//A getter for the state
function ToolBarState() {
  const context = useContext(ToolBarContext);
  if (!context) throw new Error("ToolBarContext is not defined");
  return context;
}


export function Canvas() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");
  const { state, setState } = ToolBarState();

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

export function ToolBar() {
  //Uses the page level state for the toolbar
  const { state, setState } = ToolBarState();

  const boldClick = () => {
    setState((prevState) => ({
      ...prevState,
      bold: !prevState.bold,
    }));
  }

  const italicClick = () => {
    setState((prevState) => ({
      ...prevState,
      italic: !prevState.italic,
    }));
  }

  return(
    <div className="bg-[rgb(50,50,50)] h-auto p-2 flex flex-row">
      <div className="pr-2">Toolbar: </div>
      <div className="pr-2" onClick={boldClick}>Bold</div>
      <div className="pr-2" onClick={italicClick}>Italic</div>
      <div className="pr-2">Bullet Point</div>
      <div className="pr-2">Numbered List</div>
    </div>
  );
}