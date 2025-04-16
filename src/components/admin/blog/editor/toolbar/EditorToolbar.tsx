
import React from 'react';
import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Table as TableIcon,
  Code,
  SplitSquareHorizontal,
  Upload
} from "lucide-react";
import { EditorToolbarButton } from './EditorToolbarButton';

interface EditorToolbarProps {
  editor: Editor;
  onImageUpload: () => void;
  onAddImage: () => void;
  onSetLink: () => void;
  onInsertTable: () => void;
  onInsertHorizontalRule: () => void;
  onExportMarkdown: () => void;
  onExportJSON: () => void;
}

export const EditorToolbar = ({
  editor,
  onImageUpload,
  onAddImage,
  onSetLink,
  onInsertTable,
  onInsertHorizontalRule,
  onExportMarkdown,
  onExportJSON,
}: EditorToolbarProps) => {
  return (
    <div className="border-b p-2 flex gap-2 flex-wrap">
      <EditorToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        icon={<Bold className="h-4 w-4" />}
      />
      <EditorToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        icon={<Italic className="h-4 w-4" />}
      />
      
      {/* Heading buttons */}
      <EditorToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        icon={<Heading1 className="h-4 w-4" />}
      />
      <EditorToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        icon={<Heading2 className="h-4 w-4" />}
      />
      <EditorToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        icon={<Heading3 className="h-4 w-4" />}
      />
      
      {/* List buttons */}
      <EditorToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        icon={<List className="h-4 w-4" />}
      />
      <EditorToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        icon={<ListOrdered className="h-4 w-4" />}
      />
      
      {/* Media buttons */}
      <EditorToolbarButton
        onClick={onSetLink}
        isActive={editor.isActive('link')}
        icon={<LinkIcon className="h-4 w-4" />}
      />
      <EditorToolbarButton
        onClick={onAddImage}
        icon={<ImageIcon className="h-4 w-4" />}
      />
      <EditorToolbarButton
        onClick={onImageUpload}
        icon={<Upload className="h-4 w-4" />}
      />
      <EditorToolbarButton
        onClick={onInsertTable}
        icon={<TableIcon className="h-4 w-4" />}
      />
      <EditorToolbarButton
        onClick={onInsertHorizontalRule}
        icon={<SplitSquareHorizontal className="h-4 w-4" />}
      />
      <EditorToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        icon={<Code className="h-4 w-4" />}
      />
      
      {/* Export buttons */}
      <div className="ml-auto flex gap-2">
        <EditorToolbarButton
          onClick={onExportMarkdown}
          icon={<span className="text-xs font-medium">MD</span>}
        />
        <EditorToolbarButton
          onClick={onExportJSON}
          icon={<span className="text-xs font-medium">JSON</span>}
        />
      </div>
    </div>
  );
};
