import { EditorState } from "./canvas_controller";
import { IconButton } from 'rsuite';
import { FaBold, FaCode } from 'react-icons/fa6';
import { FiItalic, FiUnderline } from 'react-icons/fi';
import { MdFormatListBulleted, MdStrikethroughS, MdFormatAlignLeft, MdFormatAlignCenter, MdFormatAlignRight } from 'react-icons/md';
import { TbListNumbers } from 'react-icons/tb';

/**
 * Small Toolbar the wraps the width of the screen. Has toggleable buttons for 
 * bold, italic, underline, bulleted_list, numbered_list, and code
 */
export function ToolBar({ updateState, state, updateVisualState, visualState }:
   { updateState: (key: any, value: boolean | string) => void; state: EditorState;
     updateVisualState: (key: any, value: boolean | string) => void; visualState: EditorState; }) {

  const formatting: string = "mr-2 pr-1 pl-1 rounded hover:bg-gray-500";

  return(
    <div className="bg-[rgb(50,50,50)] h-auto p-2 flex flex-row w-[100%]">
      <div className="pr-2">Toolbar: </div>

      {/* Bold Button */}
      <IconButton 
        className={`${formatting} ${visualState.bold ? "bg-gray-600" : "bg-[rgb(50,50,50)]"}`} 
        onClick={() => {updateState("bold", !state.bold); visualState.bold = !visualState.bold}}
        icon={<FaBold />}>
      </IconButton>

      {/* Italic Button */}
      <IconButton 
        className={`${formatting} ${visualState.italic ? "bg-gray-600" : "bg-[rgb(50,50,50)]"}`} 
        onClick={() => {updateState("italic", !state.italic); visualState.italic = !visualState.italic}}
        icon={<FiItalic />}>
      </IconButton>

      {/* Underline Button */}
      <IconButton 
        className={`${formatting} ${visualState.underline ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("underline", !state.underline); visualState.underline = !visualState.underline}}
        icon={<FiUnderline />}>
      </IconButton>

      {/* LineThrough Button */}
      <IconButton 
        className={`${formatting} ${visualState.lineThrough ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("lineThrough", !state.lineThrough); visualState.lineThrough = !visualState.lineThrough}}
        icon={<MdStrikethroughS />}>
      </IconButton>

      {/* Bulleted_list Button */}
      <IconButton 
        className={`${formatting} ${visualState.bulleted_list ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("bulleted_list", !state.bulleted_list); visualState.bulleted_list = !visualState.bulleted_list}}
        icon={<MdFormatListBulleted />}>
      </IconButton>

      {/* Numbered_list Button */}
      <IconButton 
        className={`${formatting} ${visualState.numbered_list ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("numbered_list", !state.numbered_list); visualState.numbered_list = !visualState.numbered_list}}
        icon={<TbListNumbers />}>
      </IconButton>

      {/* Code Button */}
      <IconButton 
        className={`${formatting} ${visualState.code ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("code", !state.code); visualState.code = !visualState.code}}
        icon={<FaCode />}>
      </IconButton>
      
      {/* Left Alignment Button */}
      <IconButton 
        className={`${formatting} ${visualState.align == "left" ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("align", "left"); visualState.align = "left"}}
        icon={<MdFormatAlignLeft />}>
      </IconButton>

      {/* Center Alignment Button */}
      <IconButton 
        className={`${formatting} ${visualState.align == "center" ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("align", "center"); visualState.align = "center"}}
        icon={<MdFormatAlignCenter />}>
      </IconButton>

      {/* Right Alignment Button */}
      <IconButton 
        className={`${formatting} ${visualState.align == "right" ? "bg-gray-600" : "bg-[rgb(50,50,50)]" }`} 
        onClick={() => {updateState("align", "right"); visualState.align = "right"}}
        icon={<MdFormatAlignRight />}>
      </IconButton>
    </div>
  );
}
