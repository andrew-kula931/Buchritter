"use client";

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
  const [openFolders, setOpenFolders] = useState<{ [key: number]: boolean }>({});

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  }

  const toggleFolder = (folderId: number) => {
    setOpenFolders((prev) => ({ ...prev, [folderId]: !prev[folderId] }));
  }

  const getRootItems = () => documents.filter((doc) => !doc.parentId);

  const getChildItems = (parentId: number) => documents.filter((doc) => doc.parentId == parentId);

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

  const createFileHandler = async () => {
    await addDocument("file");
    refreshPage((prev) => !prev);
  };

  const createFolderHandler = async () => {
    await addDocument("folder");
    refreshPage((prev) => !prev);
  } 

  const refreshList = () => {
    refreshPage((prev) => !prev);
  }

  return (
    <div className="flex flex-auto justify-center">
      <div className="flex flex-col pt-2 w-[50vw]">
        <div className="flex flex-row justify-between">
          <h2 className="text-[1.65rem] pb-2">Files</h2>
          <button onClick={toggleDeleteMode} className="p-2 text-red-500 hover:text-red-700">
            {(!deleteMode) ? <Trash size={24}/> : <X size={24} />}
          </button>
        </div>
        <ul>
          {loading ? <p>Loading...</p> 
            : ( getRootItems().map((doc, idx) => (
              <li key={doc.id}>
                <div onClick={() => doc.type === "folder" && toggleFolder(doc.id)}>
                  <File 
                    key={doc.id} 
                    id={doc.id} 
                    text={doc.name} 
                    idx={idx} 
                    deleteMode={deleteMode} 
                    refreshList={refreshList} 
                    type={doc.type} 
                  />
                </div>

                {doc.type === "folder" && openFolders[doc.id] && (
                  <ul className="ml-4 border-l border-gray-500 pl-4">
                    {getChildItems(doc.id).map((child, childIdx) => (
                      <File 
                        key={child.id}
                        id={child.id}
                        text={child.name}
                        idx={childIdx}
                        deleteMode={deleteMode}
                        refreshList={refreshList}
                        type={child.type}
                      />
                    ))}
                  </ul>
                )} 
              </li>
          ))) }
          <div className="flex flex-row">
            <button className="p-2" onClick={createFileHandler}>Add Item</button>
            <button className="p-2" onClick={createFolderHandler}>Add Folder</button>
          </div>
        </ul>
      </div>
    </div>
  );
}