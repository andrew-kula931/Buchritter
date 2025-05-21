"use client";

import { useState, useRef, useEffect } from "react";
import { getDocuments, addDocument, moveItem, moveToRoot } from '../server/api/requests';
import { Trash, X } from 'lucide-react';
import File from '@/app/file';


/**
 * Menu that displays all documents in a vertical list.
 * Folders can be expanded while Files redirect to editor.
 */
export function DocFiles() {
  const [documents, setDocs] = useState<any[]>([]);
  const [loading, displayLoading] = useState(true);
  const [refresh, refreshPage] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const dragged = useRef<number>(null);
  const dropped = useRef<number>(null);
  const sendRoot = useRef<boolean>(false);
  const [root, showRoot] = useState(false);

  const moveFile = async () => {
    if (dragged.current != null && dropped.current != null && dropped.current != dragged.current) {
      await moveItem(dragged.current, dropped.current);
      dragged.current = null;
      dropped.current = null;
      refreshList();
    } else if (dragged.current != null && sendRoot) {
      await moveToRoot(dragged.current);
      dragged.current = null;
      sendRoot.current = false;
      refreshList();
    }
  }

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  }

  const getRootItems = () => documents.filter((doc) => !doc.parentId);

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
    <div className="flex flex-auto justify-center p-4">
      <div className="flex flex-col pt-2 w-full max-w-200">
        <div className="flex flex-row justify-between">
          <h2 className="text-[1.65rem] pb-2">Files</h2>
          <button onClick={toggleDeleteMode} className="p-2 text-red-500 hover:text-red-700">
            {(!deleteMode) ? <Trash size={24} /> : <X size={24} />}
          </button>
        </div>
        <ul>
          {loading ? <p>Loading...</p>
            : (getRootItems().map((doc, idx) => (
              <li key={doc.id}>
                <div>
                  <File
                    key={doc.id}
                    id={doc.id}
                    text={doc.name}
                    idx={idx}
                    deleteMode={deleteMode}
                    refreshList={refreshList}
                    type={doc.type}
                    updateDragged={(id: number) => {
                      dragged.current = id;
                      moveFile()
                      showRoot(false);
                    }}
                    updateDropped={(id: number) => { dropped.current = id; moveFile() }}
                    showRoot={() => showRoot(true)}
                    documents={documents}
                  />
                </div>
              </li>
            )))}

          {root && (
            <div className="p-2 bg-gray-700"
              onDragOver={e => e.preventDefault()}
              onDrop={() => sendRoot.current = true}>
              Move to Root
            </div>
          )}

          <div className="flex flex-row">
            <button className="p-2" onClick={createFileHandler}>Add Item</button>
            <button className="p-2" onClick={createFolderHandler}>Add Folder</button>
          </div>
        </ul>
      </div>
    </div>
  );
}