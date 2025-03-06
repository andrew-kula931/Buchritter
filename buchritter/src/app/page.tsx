"use client"

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getDocuments, addDocument } from '../server/api/requests';

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
    </div>
  );
}

function File({ id, text, idx } : {id: number, text:string, idx:number}) {
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
      <a href={`/document_page?id=${id}`} ref={linkRef} style={{ display: 'none'}}>To Doc</a>
      {text}
    </div>
  </li>
  );
}

function DocFiles() {
  const [documents, setDocs] = useState<any[]>([]);
  const [loading, displayLoading] = useState(true);
  const [refresh, refreshPage] = useState(false);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        displayLoading(true);
        const data = await getDocuments();
        setDocs(data);
      } catch (error) {
        console.error('Error retrieving documents:', error);
      } finally {
        displayLoading(false);
      }
    }

    fetchDocs();
  }, [refresh]);

  const createDocHandler = async () => {
    await addDocument();
    refreshPage((prev) => !prev);
  };

  return (
    <div className="flex flex-auto justify-center">
      <div className="flex flex-col pt-2 w-[95vw]">
        <h2 className="text-[1.65rem] pb-2">Files</h2>
        <ul>
          {loading ? <p>Loading...</p> 
            : documents.map((doc, idx) => (
              <File key={doc.id} id={doc.id} text={doc.name} idx={idx}/>
          ))}
          <button className="p-2" onClick={createDocHandler}>Add Item</button>
        </ul>
      </div>
    </div>
  );
}