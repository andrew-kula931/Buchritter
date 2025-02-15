"use client"

import Link from "next/link";
import { useState } from "react";
import { useRef } from 'react';

export default function Home() {
  return (
    <>
      <TitleBar />
      <DocFiles />
    </>
  );
}

function TitleBar() {
  return (
    <div className="navBar">
      <div style={{fontSize: 40}}>Buch Ritter</div>
      <Link href="/document_page">Go to Document</Link>
    </div>
  );
}

function File({ text, idx } : {text:string, idx:number}) {
  const color = (idx % 2 === 0) ? "bg-gray-700" : "bg-gray-600";
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  }

  return (
  <li>
    <div className={`p-2 ${color} hover:bg-gray-500`} onClick={handleClick}>
      <a href="/document_page" ref={linkRef} style={{ display: 'none'}}>To Doc</a>
      {text}
    </div>
  </li>
  );
}

function DocFiles() {
  const [items, setItems] = useState(["Item 1"]);

  const addItem = () => {
    setItems([...items, `Item ${items.length + 1}`]);
  }

  return (
    <div className="flex flex-auto justify-center">
      <div className="flex flex-col pt-2 w-[95vw]">
        <h2 className="text-[1.65rem] pb-2">Files</h2>
        <ul>
          {items.map((item, index) => (
            <File key={index} text={item} idx={index}/>
          ))}
          <button className="p-2" onClick={addItem}>Add Item</button>
        </ul>
      </div>
    </div>
  );
}