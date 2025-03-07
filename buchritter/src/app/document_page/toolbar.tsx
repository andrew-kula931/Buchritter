import { EditorState } from "./canvas_controller";

/**
 * Small Toolbar the wraps the width of the screen. Has toggleable buttons for bold, italic, underline, bulleted_list,
 * numbered_list, and code
 */
export function ToolBar({ updateState, state, updateVisualState, visualState }:
   { updateState: (key: any, value: boolean | string) => void; state: EditorState;
     updateVisualState: (key: any, value: boolean | string) => void; visualState: EditorState; }) {
  return(
    <div className="bg-[rgb(50,50,50)] h-auto p-2 flex flex-row w-[100%]">
      <div className="pr-2">Toolbar: </div>
      <button className={`mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700 ${visualState.bold ? "bg-gray-700" : "bg-[rgb(50,50,50)]"}`} 
        onClick={() => {updateState("bold", !state.bold); visualState.bold = !visualState.bold}}>Bold</button>
      <button className={`mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700 ${visualState.italic ? "bg-gray-700" : "bg-[rgb(50,50,50)]"}`} 
        onClick={() => {updateState("italic", !state.italic); visualState.italic = !visualState.italic}}>Italic</button>
      <button className={`mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700 ${visualState.underline ? "bg-gray-700" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("underline", !state.underline); visualState.underline = !visualState.underline}}>Underline</button>
      <button className={`mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700 ${visualState.bulleted_list ? "bg-gray-700" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("bulleted_list", !state.bulleted_list); visualState.bulleted_list = !visualState.bulleted_list}}>Bullet Point</button>
      <button className={`mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700 ${visualState.numbered_list ? "bg-gray-700" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("numbered_list", !state.numbered_list); visualState.numbered_list = !visualState.numbered_list}}>Numbered List</button>
      <button className={`mr-2 pr-1 pl-1 border-2 rounded hover:bg-gray-700 ${visualState.code ? "bg-gray-700" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("code", !state.code); visualState.code = !visualState.code}}>Code</button>
    </div>
  );
}