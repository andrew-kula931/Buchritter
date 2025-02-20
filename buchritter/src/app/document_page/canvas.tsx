"use client";

import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { Transforms, createEditor, Descendant, Element, BaseEditor, Editor } from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderElementProps } from "slate-react";
import { withHistory, HistoryEditor } from 'slate-history'
import { EditorState } from './canvas_controller';
import { getDoc, updateDocument } from '../../server/api/requests';
import { Prisma } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

//Styling
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

//Typescript interfacing
type CustomElement = { type: 'paragraph' | 'code' | 'bulleted-list' | 'numbered-list'; children: CustomText[] };
type CustomText = { text: string }
type Document = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
  body: JsonValue;
} | null

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}

/**
 * This RichText Editor consits of a A-4 document sized text area.
 * State refers to the object containing all configurable values:
 * @param - Bold, Italic, Underline
 */
export function RichTextEditor({ updateState, state }: { updateState: (key: any, value: boolean | string) => void; state: EditorState }) {

  // Page setup
  const [doc, updateDoc] = useState<Document | null>(null);
  const [value, setValue] = useState<Descendant[]>([
    { type: 'paragraph', children: [{ text: ''}]}
  ]);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);

  // The following two effects pulls information from the database and displays it on the canvas
  useEffect(() => {
    const fetchData = async () => {
      const document: Document = await getDoc();
      updateDoc(document);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (doc) {
      const parsedContent: Descendant[] = (typeof doc.body === "string") ? JSON.parse(doc.body) : doc.body as Descendant[];
      setValue(parsedContent);
    }
  }, [doc]);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);


  //Main value changer (Listener)
  useEffect(() => {
    editor.children = value;
    editor.onChange();
  }, [value]);

  // Misc. event listeners
  useEffect(() => {
    CustomEditor.toggleBold(editor);
  }, [state.bold]);

  useEffect(() => {
    CustomEditor.toggleItalic(editor);
  }, [state.italic]);

  useEffect(() => {
    CustomEditor.toggleUnderline(editor);
  }, [state.underline]);

  // Custom Elements for the editor
  const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>
  };

  const CodeElement = (props: RenderElementProps) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  };

  const BulletedList = (props: RenderElementProps) => {
    return (
      <ul {...props.attributes} className="ml-6 list-disc">
        <li>{props.children}</li>
      </ul>
    )
  };

  const Leaf = (props: any) => {
    return (
      <span
        {...props.attributes}
        style={{ 
          fontWeight: props.leaf.bold ? 'bold' : 'normal',
          fontStyle: props.leaf.italic ? 'italic' : 'normal',
          textDecoration: props.leaf.underline ? 'underline' : 'none'
        }}
      >
        {props.children}
      </span>
    )
  }

  // Rendering Callbacks
  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      case 'bulleted-list':
        return <BulletedList {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, []);

  // This is where all of the editor functions are handled
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

    isItalicActive(editor: Editor) {
      const marks: any = Editor.marks(editor);
      return marks ? marks.italic === true : false;
    },

    toggleItalic(editor: Editor) {
      const isActive = CustomEditor.isItalicActive(editor);
      if (isActive) {
        Editor.removeMark(editor, 'italic');
      } else {
        Editor.addMark(editor, 'italic', true);
      }
    },

    isUnderlineActive(editor: Editor) {
      const marks: any = Editor.marks(editor);
      return marks ? marks.underline === true : false;
    },

    toggleUnderline(editor: Editor) {
      const isActive = CustomEditor.isUnderlineActive(editor);
      if (isActive) {
        Editor.removeMark(editor, 'underline');
      } else {
        Editor.addMark(editor, 'underline', true);
      }
    },

    isCodeActive(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: n => Element.isElement(n) && n.type === 'code',
      });

      return !!match;
    },

    toggleCode(editor: Editor) {
      const isActive = CustomEditor.isCodeActive(editor);

      Transforms.setNodes(
        editor,
        { type: isActive ? 'paragraph' : 'code' },
        { match: n => Element.isElement(n) && Editor.isBlock(editor, (n as CustomElement)) }
      )
    },

    isBulletedActive(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: n => Element.isElement(n) && n.type === 'bulleted-list',
      });

      return !!match;
    },

    toggleBulleted(editor: Editor) {
      const isActive = CustomEditor.isBulletedActive(editor);

      Transforms.setNodes(
        editor,
        { type: isActive ? 'paragraph' : 'bulleted-list' },
        { match: n => Element.isElement(n) && Editor.isBlock(editor, (n as CustomElement)) }
      )
    }
  }

  return (
    <div className="flex justify-center w-screen p-2">
      <Slate 
        editor={editor} 
        initialValue={value} 
        onChange={ newValue => {
          setValue;
          const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
          );

          if (isAstChange && doc) {
            if (saveTimeout.current) clearTimeout(saveTimeout.current);
            saveTimeout.current = setTimeout(() => {
              const content = JSON.stringify(newValue);
              updateDocument(doc.id, content);
            }, 1500);
          }}
          }>
        <Editable 
          style={{ height: '500px' }}
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

              case 'i': {
                event.preventDefault();
                CustomEditor.toggleItalic(editor);
                break;
              }

              case 'u': {
                event.preventDefault();
                CustomEditor.toggleUnderline(editor);
                break;
              }

              case '`': {
                event.preventDefault();
                CustomEditor.toggleCode(editor);
                break;
              }

              case 'e': {
                event.preventDefault();
                CustomEditor.toggleBulleted(editor);
                break;
              }
            }
          }}
          />
      </Slate>
    </div>
  );
}


export function ToolBar({ updateState, state }: { updateState: (key: any, value: boolean | string) => void; state: EditorState }) {
  return(
    <div className="bg-[rgb(50,50,50)] h-auto p-2 flex flex-row">
      <div className="pr-2">Toolbar: </div>
      <button className={`mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700 ${state.bold ? "bg-gray-700" : "bg-[rgb(50,50,50)]"}`} onClick={() => updateState("bold", !state.bold)}>Bold</button>
      <button className={`mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700 ${state.italic ? "bg-gray-700" : "bg-[rgb(50,50,50)]"}`} onClick={() => updateState("italic", !state.italic)}>Italic</button>
      <button className={`mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700 ${state.underline ? "bg-gray-700" : "bg-[rgb(50,50,50)]" }`} onClick={() => updateState("underline", !state.underline)}>Underline</button>
      <button className="mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700">Bullet Point</button>
      <button className="mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700">Numbered List</button>
    </div>
  );
}
