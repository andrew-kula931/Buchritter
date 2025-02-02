"use client";

import { useState } from "react";

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
  title: {
    fontSize: "24px",
    marginBottom: "10px",
    backgroundColor: "rgb(66, 66, 66)",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
};

export function Canvas() {
  const [text, setText] = useState("");

  return(
    <div style={docStyle.document}>
      <textarea
        className="textareaDefault"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={40}
        cols={40}
        style={{
          width: "760px", 
          padding: "10px", 
          borderRadius: "5px", 
          fontSize: "16px",
          background: "rgb(66, 66, 66)",
        }}
      />
    </div>
  );
}