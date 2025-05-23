"use client";

import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { Transforms, createEditor, Descendant, Element, BaseEditor, Editor } from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderElementProps } from "slate-react";
import { withHistory, HistoryEditor } from 'slate-history'
import { EditorState } from './canvas_controller';
import { getDoc, updateDocument, Document } from '../../server/api/requests';

//Styling of the text area
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
type CustomElement = { type: 'paragraph' | 'code' | 'bulleted-list' | 'numbered-list'; align?: 'left' | 'center' | 'right'; children: CustomText[] };
type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; lineThrough?: boolean}

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
 * @param - Bold, Italic, Underline, Bulleted List, Numbered List, Code
 */
export function RichTextEditor({ state, updateVisualState, visualState, docRef }:
   { state: EditorState; updateVisualState: (key: any, value: boolean | string) => void; 
    visualState: EditorState; docRef: Document }) {

  // Page state variables and setup
  const [doc, updateDoc] = useState<Document>(docRef);
  const [value, setValue] = useState<Descendant[]>([
    { type: 'paragraph', children: [{ text: ''}]}
  ]);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  function resetState(state: EditorState) {
    state.bold = false;
    state.italic = false;
    state.underline = false;
    state.lineThrough = false;
    state.bulleted_list = false;
    state.numbered_list = false;
    state.code = false;
    state.align = "left";
  }

  // Displays the content onto the canvas
  useEffect(() => {
    if (doc) {
      if (doc.body) {
        const parsedContent: Descendant[] = (typeof doc.body === "string") ? JSON.parse(doc.body) : doc.body as Descendant[];
        setValue(parsedContent ?? '');
      } else {
        setValue([{ type: 'paragraph', children: [{ text: '' }]}]);
      }
    }
  }, [doc]);

  // Initializes the editor and applies history configurations
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);


  // Main listener for text changes
  useEffect(() => {
    editor.children = value;
    editor.onChange();
  }, [value]);


  // Event listeners will only trigger on keystrokes and not on clicks
  useEffect(() => {
    CustomEditor.toggleBold(editor);
  }, [state.bold]);

  useEffect(() => {
    CustomEditor.toggleItalic(editor);
  }, [state.italic]);

  useEffect(() => {
    CustomEditor.toggleUnderline(editor);
  }, [state.underline]);

  useEffect(() => {
    CustomEditor.toggleLineThrough(editor);
  }, [state.lineThrough]);

  useEffect(() => {
    CustomEditor.toggleBulleted(editor);
  }, [state.bulleted_list]);

  useEffect(() => {
    CustomEditor.toggleNumbered(editor);
  }, [state.numbered_list]);

  useEffect(() => {
    CustomEditor.toggleCode(editor);
  }, [state.code]);

  useEffect(() => {
    CustomEditor.changeAlignment(editor, state.align);
  }, [state.align]);

  /**
   * Listener to update the toolbar state on user click.
   * @returns void
   */
  const handleSelection = () => {
    if (!editor.selection) return;

    const nodeEntry = Editor.above(editor, {
      match: (n) => Editor.isBlock(editor, (n as CustomElement)),
    });

    if (nodeEntry) {
      const [node] = nodeEntry;
      let type = 'paragraph';
      resetState(visualState);

      switch ((node as CustomElement).type) {
        case "bulleted-list":
          visualState.bulleted_list = true;
          type = 'bulleted-list';
          break;
        case "numbered-list":
          visualState.numbered_list = true;
          type = 'numbered-list';
          break;
        case "code":
          visualState.code = true;
          type = 'code';
          break;
        default:
          break;
      }

      updateVisualState(type, true);

      updateVisualState("align", (node as CustomElement).align ?? "left");

      if (node.children?.some(child => (child as CustomText).bold)) {
        updateVisualState('bold', true);
      }
      if (node.children?.some(child => (child as CustomText).italic)) {
        updateVisualState('italic', true);
      }
      if (node.children?.some(child => (child as CustomText).underline)) {
        updateVisualState('underline', true);
      }
      if (node.children?.some(child => (child as CustomText).lineThrough)) {
        updateVisualState('lineThrough', true);
      };
    } 
  };

  // Custom Elements for the editor
  // Defines html rendering properties and passes in styling as a param
  const DefaultElement = (props: RenderElementProps) => {
    const style = {
      textAlign: props.element.align || "left",
    };

    return <p {...props.attributes} style={style} >{props.children}</p>
  };

  const CodeElement = (props: RenderElementProps) => {
    const style = {
      textAlign: props.element.align || "left",
    };

    return (
      <pre {...props.attributes} style={style} >
        <code>{props.children}</code>
      </pre>
    )
  };

  const BulletedList = (props: RenderElementProps) => {
    const style = {
      textAlign: props.element.align || "left",
    };
    
    return (
      <ul {...props.attributes} style={style} className="ml-6 list-disc list-inside">
        <li>{props.children}</li>
      </ul>
    )
  };

  const NumberedList = (props: RenderElementProps) => {
    const style = {
      textAlign: props.element.align || "left",
    };

    return (
      <ol {...props.attributes} style={style} className="ml-6 list-decimal list-inside">
        <li>{props.children}</li>
      </ol>
    )
  };

  // Leaves are the individual sections of styling within the editor.
  // For example, two characters that are bold are a seperate leaf than the
  // bold and italic character next to them.
  const Leaf = (props: any) => {
    return (
      <span
        {...props.attributes}
        style={{ 
          fontWeight: props.leaf.bold ? 'bold' : 'normal',
          fontStyle: props.leaf.italic ? 'italic' : 'normal',
          textDecoration: [ props.leaf.underline ? 'underline' : '', 
            props.leaf.lineThrough ? 'line-through' : '' ]
            .filter(Boolean).join(" ") || 'none',
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
        return <CodeElement {...props}/>
      case 'bulleted-list':
        return <BulletedList {...props} />
      case 'numbered-list':
        return <NumberedList {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />
  }, []);


  /**
   * Contains unique editor logic which handles text modifications.
   * Functions primarily as a control flow as methods are defined rather
   * than element/leaf definitions.
   */
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

    isLineThroughActive(editor: Editor) {
      const marks: any = Editor.marks(editor);
      return marks ? marks.lineThrough === true : false;
    },

    toggleLineThrough(editor: Editor) {
      const isActive = CustomEditor.isLineThroughActive(editor);
      if (isActive) {
        Editor.removeMark(editor, 'lineThrough');
      } else {
        Editor.addMark(editor, 'lineThrough', true);
      }
    },

    changeAlignment(editor: Editor, alignment: "left" | "center" | "right") {
      Transforms.setNodes(
        editor,
        { align: alignment },
        { match: n => Element.isElement(n) && Editor.isBlock(editor, (n as CustomElement))}
      )
    },

    isCodeActive(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: n => Element.isElement(n) && n.type === 'code',
      });

      return !!match;
    },

    toggleCode(editor: Editor) {
      const isActive = CustomEditor.isCodeActive(editor);

      updateVisualState('numbered_list', false);
      updateVisualState('bulleted_list', false);

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

      updateVisualState('numbered_list', false);
      updateVisualState('code', false);

      Transforms.setNodes(
        editor,
        { type: isActive ? 'paragraph' : 'bulleted-list' },
        { match: n => Element.isElement(n) && Editor.isBlock(editor, (n as CustomElement)) }
      )
    },

    isNumberedActive(editor: Editor) {
      const [match] = Editor.nodes(editor, {
        match: n => Element.isElement(n) && n.type === 'numbered-list',
      });

      return !!match;
    },

    toggleNumbered(editor: Editor) {
      const isActive = CustomEditor.isNumberedActive(editor);

      updateVisualState('bulleted_list', false);
      updateVisualState('code', false);

      Transforms.setNodes(
        editor,
        { type: isActive ? 'paragraph' : 'numbered-list' },
        { match: n => Element.isElement(n) && Editor.isBlock(editor, (n as CustomElement)) }
      )
    }
  }

  return (
    <div className="flex justify-center w-[100%] p-2">
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
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
          className="border p-8 min-h-[1123px] w-[784px]" 
          autoFocus
          onSelect={() => handleSelection()}
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
                visualState.bold = !visualState.bold;
                break;
              }

              case 'i': {
                event.preventDefault();
                CustomEditor.toggleItalic(editor);
                visualState.italic = !visualState.italic;
                break;
              }

              case 'u': {
                event.preventDefault();
                CustomEditor.toggleUnderline(editor);
                visualState.underline = !visualState.underline;
                break;
              }

              case '5': {
                event.preventDefault();
                CustomEditor.toggleLineThrough(editor);
                visualState.lineThrough = !visualState.lineThrough;
                break;
              }

              case '`': {
                event.preventDefault();
                CustomEditor.toggleCode(editor);
                visualState.code = !visualState.code;
                break;
              }

              case 'e': {
                event.preventDefault();
                CustomEditor.toggleBulleted(editor);
                visualState.bulleted_list = !visualState.bulleted_list;
                break;
              }

              case 'o': {
                event.preventDefault();
                CustomEditor.toggleNumbered(editor);
                visualState.numbered_list = !visualState.numbered_list;
                break;
              }
            }
          }}
          />
      </Slate>
    </div>
  );
}

