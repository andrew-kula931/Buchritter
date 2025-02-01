import Link from "next/link";
import { useState } from "react";
import styles from './doc.module.css';

import "../app/globals.css";

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
  },
};

export default function DocumentPage() {
  return (
    <div>
      <div className="navBar">
        <textarea
          className={styles.textareaDefault}
          style={docStyle.title}
          defaultValue="Doc Name"
        />
        <Link href="/">Click here to go back</Link>
      </div>
      <Canvas />
    </div>
  );
}

function Canvas() {
  const [text, setText] = useState("");

  return(
    <div style={docStyle.document}>
      <textarea
        className={styles.textareaDefault}
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