import { useState, useRef, useEffect } from "react";
import { deleteDocument, updateName, deleteFolder, getDocuments } from '../server/api/requests';
import { FiChevronDown } from "react-icons/fi";

/**
 * Functions as either a 'file' or a 'folder'. Clicking a file sends the user to the text editor page while
 * clicking the folder opens any content within. Both can be moved by dragging and dropping onto a valid location.
 */
export default function File({ id, text, idx, deleteMode, refreshList, type, updateDragged, updateDropped, showRoot, documents } : {
    id: number, 
    text:string, 
    idx:number, 
    deleteMode:boolean, 
    refreshList: () => void, 
    type: "file" | "folder",
    updateDragged: (id: number) => void, 
    updateDropped: (id: number) => void,
    showRoot: () => void,
    documents: any} ) 
  {
  const color = (idx % 2 === 0) ? "bg-gray-700" : "bg-gray-600";
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [isModalOpen, renderModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [folderText, setFolderText] = useState(text);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const openModal = () => renderModal(true);
  const closeModal = () => renderModal(false);

  const confirmFileDelete = async () => {
    deleteDocument(id);
    renderModal(false);
    refreshList();
  }

  const confirmFolderDelete = async () => {
    deleteFolder(id);
    renderModal(false);
    refreshList();
  }

  const handleClick = () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  }

  const handleFolderClick = () => {
    setIsOpen(!isOpen);
  }

  // Allows for folder editing
  const handleDoubleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  // Updates folder text
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFolderText(event.target.value);
  }

  const handleBlur = async () => {
    setIsEditing(false);
    updateName(id, folderText);
  }

  const getChildItems = (parentId: number) => 
    documents.filter((doc: any) => doc.parentId == parentId
  );

  /**
   * A popup menu to confirm the deletion of a file or folder.
   */
  const AlertModal = ({ isOpen, onClose, isFolder }: { isOpen: boolean, onClose: () => void, isFolder: boolean }) => {
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (event.target instanceof Node && !(event.target as Element).closest('.modal-content')) {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener('click', handleOutsideClick);
      } else {
        document.removeEventListener('click', handleOutsideClick);
      }

      return () => {
        document.removeEventListener('click', handleOutsideClick);
      }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="modal-content bg-gray-700 p-6 rounded-md shadow-lg w-1/3">
          <h2 className="text-xl">Delete {text}</h2>
          <p>Are you sure you want to delete {text}? This cannot be undone.</p>
          <div className="flex flex-row justify-between">
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={(isFolder) ? confirmFolderDelete : confirmFileDelete}
            >
              Delete
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
  (type === "file") ? 

  // File
  <ul className="p-0.5">
    {(!deleteMode) ?
      <div key={"normal"} 
        className={`p-2 ${color} 
        hover:bg-gray-500`} 
        onClick={handleClick} 
        draggable={true}
        onDrag={showRoot}
        onDragEnd={() => updateDragged(id)}
        >
        <a href={`/document_page?id=${id}`} ref={linkRef} style={{ display: 'none'}}>To Doc</a>
        {text}
      </div> :
      <div>
        <div key={"pulsing"} className={`p-2 bg-slate-500 hover:bg-gray-500 animate-pulse`} onClick={openModal}>
          {text}
        </div> 
        <AlertModal isOpen={isModalOpen} onClose={closeModal} isFolder={false} />
      </div>
    }
  </ul> :

  // Folder 
  <ul className="p-0.5">
    {(!deleteMode) ?
      <div className={`p-2 ${color} hover:bg-gray-500 flex flex-row cursor-pointer`} 
        key={"normal"} 
        onClick={() => {handleFolderClick()}}
        draggable={true} 
        onDragOver={e => { e.preventDefault() }}
        onDrag={showRoot}
        onDragEnd={() => updateDragged(id)}
        onDrop={() => { updateDropped(id) }}
        >
        <div onClick={!isEditing ? () => handleFolderClick() : undefined} onDoubleClick={handleDoubleClick}>
          {!isEditing ? (
            <div className="pr-1" >{folderText}</div>
          ): (
            <textarea 
              ref={inputRef}
              className="rounded px-1"
              value={folderText}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={1}
              autoFocus
            />
          )}
        </div>
        <FiChevronDown className={`mt-1 transition-transform duration-200 ${isOpen ? "rotate-0" : "rotate-90"}`} />
      </div> :
      <div>
        <div key={"pulsing"} className={`p-2 bg-slate-500 hover:bg-gray-500 animate-pulse`} onClick={openModal}>
          {text}
        </div> 
        <AlertModal isOpen={isModalOpen} onClose={closeModal} isFolder={true} />
      </div>
    }
    {isOpen && (
      <li className="ml-4 border-l border-gray-500 pl-4">
        {getChildItems(id).map((child: any, childIdx: number) => (
          <File 
            key={child.id}
            id={child.id}
            text={child.name}
            idx={childIdx}
            deleteMode={deleteMode}
            refreshList={refreshList}
            type={child.type}
            updateDragged={updateDragged}
            updateDropped={updateDropped}
            showRoot={showRoot}
            documents={documents}
          />
        ))}
      </li>
    )}
  </ul>
  );
}