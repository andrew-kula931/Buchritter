import { EditorState } from "./canvas_controller";
import { IconButton } from 'rsuite';
import { FaBold, FaCode } from 'react-icons/fa6';
import { FiItalic, FiUnderline } from 'react-icons/fi';
import { MdFormatListBulleted, MdStrikethroughS } from 'react-icons/md';
import { TbListNumbers } from 'react-icons/tb';

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
      <IconButton 
        className={`mr-2 pr-1 pl-1 rounded hover:bg-gray-500 ${visualState.bold ? "bg-gray-600" : "bg-[rgb(50,50,50)]"}`} 
        onClick={() => {updateState("bold", !state.bold); visualState.bold = !visualState.bold}}
        icon={<FaBold />}>
      </IconButton>
      <IconButton 
        className={`mr-2 pr-1 pl-1 rounded hover:bg-gray-500 ${visualState.italic ? "bg-gray-600" : "bg-[rgb(50,50,50)]"}`} 
        onClick={() => {updateState("italic", !state.italic); visualState.italic = !visualState.italic}}
        icon={<FiItalic />}>
      </IconButton>
      <IconButton 
        className={`mr-2 pr-1 pl-1 rounded hover:bg-gray-500 ${visualState.underline ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("underline", !state.underline); visualState.underline = !visualState.underline}}
        icon={<FiUnderline />}>
      </IconButton>
      <IconButton 
        className={`mr-2 pr-1 pl-1 rounded hover:bg-gray-500 ${visualState.lineThrough ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("lineThrough", !state.lineThrough); visualState.lineThrough = !visualState.lineThrough}}
        icon={<MdStrikethroughS />}>
      </IconButton>
      <IconButton 
        className={`mr-2 pr-1 pl-1 rounded hover:bg-gray-500 ${visualState.bulleted_list ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("bulleted_list", !state.bulleted_list); visualState.bulleted_list = !visualState.bulleted_list}}
        icon={<MdFormatListBulleted />}>
      </IconButton>
      <IconButton 
        className={`mr-2 pr-1 pl-1 rounded hover:bg-gray-500 ${visualState.numbered_list ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("numbered_list", !state.numbered_list); visualState.numbered_list = !visualState.numbered_list}}
        icon={<TbListNumbers />}>
      </IconButton>
      <IconButton 
        className={`mr-2 pr-1 pl-1 rounded hover:bg-gray-500 ${visualState.code ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("code", !state.code); visualState.code = !visualState.code}}
        icon={<FaCode />}>
      </IconButton>
    </div>
  );
}