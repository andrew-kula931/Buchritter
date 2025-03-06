"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getDocuments, addDocument, deleteDocument } from '../server/api/requests';
import { Trash, X } from 'lucide-react';
import File from '@/app/file';

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


function DocFiles() {
  const [documents, setDocs] = useState<any[]>([]);
  const [loading, displayLoading] = useState(true);
  const [refresh, refreshPage] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  }

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

  const refreshList = () => {
    refreshPage((prev) => !prev);
  }

  return (
    <div className="flex flex-auto justify-center">
      <div className="flex flex-col pt-2 w-[95vw]">
        <div className="flex flex-row justify-between">
          <h2 className="text-[1.65rem] pb-2">Files</h2>
          <button onClick={toggleDeleteMode} className="p-2 text-red-500 hover:text-red-700">
            {(!deleteMode) ? <Trash size={24}/> : <X size={24} />}
          </button>
        </div>
        <ul>
          {loading ? <p>Loading...</p> 
            : documents.map((doc, idx) => (
              <File key={doc.id} id={doc.id} text={doc.name} idx={idx} deleteMode={deleteMode} refreshList={refreshList}/>
          ))}
          <button className="p-2" onClick={createDocHandler}>Add Item</button>
        </ul>
      </div>
    </div>
  );
}