import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import "../app/globals.css";

export default function DocumentPage() {
  return (
    <div>
      <div className="navBar">
        <h1>Hello from the document!</h1>
        <Link href="/">Click here to go back</Link>
      </div>
      <Canvas />
    </div>
  );
}

//Document Page
function Canvas() {
  const docStyle = {
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
      border: "1px solid gray"
    },
  };

  const [text, setText] = useState("");

  return(
    <div style={docStyle.document}>
      <input style={docStyle.title}/>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={37}
        cols={40}
        style={{
          width: "760px", 
          padding: "10px", 
          borderRadius: "5px", 
          border: "1px solid gray", 
          fontSize: "16px",
          background: "rgb(66, 66, 66)"
        }}
      />
      <p>{text}</p>
    </div>
  );
}