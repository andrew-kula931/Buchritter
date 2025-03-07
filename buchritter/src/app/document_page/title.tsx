"use client"

import { useSearchParams } from "next/navigation";
import { getDoc, updateName } from "@/server/api/requests";
import { useEffect, useState, useRef } from "react";

export default function DocTitle() {
  const searchParams = useSearchParams();
  const docId = searchParams.get("id") ?? 0;

  const [name, setName] = useState("");
  const initRender = useRef(true);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const document = await getDoc(Number(docId));
      setName(document?.name || "Untitled");
    };

    fetchData();
  }, []);

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