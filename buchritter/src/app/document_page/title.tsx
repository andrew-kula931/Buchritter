'use client'

import { updateName } from "@/server/api/requests";
import { useEffect, useState, useRef } from "react";

/**
 * Title bar at the top of the document page
 * 
 * Can be edited and saves automatically.
 */
export default function DocTitle({ docId, title }: { docId: number, title: string }) {
  const [name, setName] = useState<string>(title);
  const initRender = useRef(true);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (initRender.current) {
      initRender.current = false;
      return;
    }

    const updateDatabase = () => {
      updateName(Number(docId), name);
    };

    updateDatabase()

  }, [name])

  return (
    <textarea
      className="textareaDefault text-2xl"
      rows={1}
      cols={30}
      maxLength={30}
      defaultValue={name}
      onChange={ newName => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);
        saveTimeout.current = setTimeout(() => {
          setName(newName.target.value);
        }, 1500);
      }}
    />
  );
}