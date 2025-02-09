"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { Transforms, createEditor, Descendant, Element, BaseEditor, Editor } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import { withHistory } from 'slate-history'

export const docStyle = {
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
};

type CustomElement = { type: 'paragraph' | 'code' | null; children: CustomText[] };
type CustomText = { text: string }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export function RichTextEditor({ updateState, state }: { updateState: (key: any, value: any) => void; state: any }) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>([
    { type: 'paragraph', children: [{ text: 'A line of text. '}]}
  ]);

  const DefaultElement = (props: any) => {
    return <p {...props.attributes}>{props.children}</p>
  }

  const CodeElement = (props: any) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  };

  const Leaf = (props: any) => {
    return (
      <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
      >
        {props.children}
      </span>
    )
  }

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, []);

  const CustomEditor = {
    isBoldActive(editor: Editor) {
      const marks: any = Editor.marks(editor);
      return marks ? marks.bold === true : false;
    },

    toggleBold(editor: Editor) {
      const isActive = CustomEditor.isBoldActive(editor);
      if (isActive) {
        Editor.removeMark(editor, 'bold');
      } else {
        Editor.addMark(editor, 'bold', true);
      }
    },

  }

  return (
    <div className="flex justify-center w-screen p-2">
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <Editable 
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck 
          className="border p-2 min-h-[100px] w-4xl" 
          autoFocus
          onKeyDown={event => {
            // All single keystroke configurations
            if (event.key === 'Tab') {
              event.preventDefault();
              editor.insertText('\t');
            }

            // All control based keystroke configurations
            if (!event.ctrlKey) {
              return
            }

            switch (event.key) {
              case 'b': {
                event.preventDefault();
                CustomEditor.toggleBold(editor);
                break;
              }
            }
          }}
          />
      </Slate>
    </div>
  );
}


export function ToolBar({ updateState, state }: { updateState: (key: any, value: any) => void; state: any }) {
  return(
    <div className="bg-[rgb(50,50,50)] h-auto p-2 flex flex-row">
      <div className="pr-2">Toolbar: </div>
      <button className={`mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700 ${state.bold ? "bg-gray-700" : "bg-[rgb(50,50,50)]"}`} onClick={() => updateState("bold", !state.bold)}>Bold</button>
      <button className="mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700" onClick={() => updateState("italic", !state.italic)}>Italic</button>
      <button className="mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700" onClick={() => updateState("underline", !state.underline)}>Underline</button>
      <button className="mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700">Bullet Point</button>
      <button className="mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700">Numbered List</button>
    </div>
  );
}

/*
export function Canvas(state: any) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState("");

  const keyDown = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === "Tab") {
      event.preventDefault();

      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const value = textarea.value;
      const newValue = value.substring(0, start) + '\t' + value.substring(start);

      //Updates state rather than textarea value
      setText(newValue);

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }
      })
    }
  }

  return(
    <div style={docStyle.document}>
      <textarea
        className="textareaDefault w-760px p-10px bg-[rgb(66, 66, 66)]"
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={keyDown}
        rows={40}
        cols={40}
        style={{
          borderRadius: "5px", 
          fontSize: "16px",
          tabSize: 8,
        }}
      />
    </div>
  );
}
*/