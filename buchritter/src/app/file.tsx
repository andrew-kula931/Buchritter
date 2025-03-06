import { useState, useRef, useEffect } from "react";
import { getDocuments, addDocument, deleteDocument } from '../server/api/requests';

export default function File({ id, text, idx, deleteMode, refreshList } : {id: number, text:string, idx:number, deleteMode:boolean, refreshList: () => void }) {
  const color = (idx % 2 === 0) ? "bg-gray-700" : "bg-gray-600";
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [isModalOpen, renderModal] = useState(false);
  
  const openModal = () => renderModal(true);
  const closeModal = () => renderModal(false);

  const confirmDelete = async () => {
    await deleteDocument(id);
    renderModal(false);
    refreshList();
  }

  const handleClick = () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  }

  const AlertModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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
              onClick={confirmDelete}
            >
              Delete
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
  <li className="p-0.5">
    {(!deleteMode) ?
      <div key={"normal"} className={`p-2 ${color} hover:bg-gray-500`} onClick={handleClick}>
        <a href={`/document_page?id=${id}`} ref={linkRef} style={{ display: 'none'}}>To Doc</a>
        {text}
      </div> :
      <div>
        <div key={"pulsing"} className={`p-2 bg-slate-500 hover:bg-gray-500 animate-pulse`} onClick={openModal}>
          {text}
        </div> 
        <AlertModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    }
  </li>
  );
}