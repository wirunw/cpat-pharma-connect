
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import CodeBlock from '@tiptap/extension-code-block';
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  Heading4,
  Heading5,
  Heading6,
  Table as TableIcon,
  Code,
  SplitSquareHorizontal,
  Upload
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: 'เริ่มพิมพ์เนื้อหาของคุณที่นี่...',
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      HorizontalRule,
      CodeBlock,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('ใส่ URL ของรูปภาพ');
    if (url) {
      // Use insertContent instead of setImage which is not available
      editor.chain().focus().insertContent({
        type: 'image',
        attrs: { src: url }
      }).run();
    }
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        editor.chain().focus().insertContent({
          type: 'image',
          attrs: { src: result }
        }).run();
      };
      reader.readAsDataURL(file);
    }
    
    // Reset file input so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const setLink = () => {
    const url = window.prompt('ใส่ URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const insertTable = () => {
    editor.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const insertHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  const exportAsMarkdown = () => {
    // This is a simple conversion - for proper Markdown conversion you'd use a specific library
    const html = editor.getHTML();
    alert("HTML content copied to clipboard. For proper Markdown conversion, you would integrate a HTML-to-Markdown library.");
    navigator.clipboard.writeText(html);
  };

  const exportAsJSON = () => {
    const json = JSON.stringify(editor.getJSON());
    navigator.clipboard.writeText(json);
    alert("Editor content as JSON copied to clipboard");
  };

  return (
    <div className="border rounded-lg">
      <div className="border-b p-2 flex gap-2 flex-wrap">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-slate-200' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-slate-200' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        {/* Heading buttons */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-slate-200' : ''}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-slate-200' : ''}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-slate-200' : ''}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
        
        {/* List buttons */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-slate-200' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-slate-200' : ''}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        
        {/* Link button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={setLink}
          className={editor.isActive('link') ? 'bg-slate-200' : ''}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        
        {/* Image buttons */}
        <Button
          variant="ghost"
          size="sm"
          onClick={addImage}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-4 w-4" />
        </Button>
        <input 
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={uploadImage}
        />
        
        {/* Table button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={insertTable}
        >
          <TableIcon className="h-4 w-4" />
        </Button>
        
        {/* Horizontal rule button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={insertHorizontalRule}
        >
          <SplitSquareHorizontal className="h-4 w-4" />
        </Button>
        
        {/* Code block button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-slate-200' : ''}
        >
          <Code className="h-4 w-4" />
        </Button>
        
        {/* Export buttons */}
        <Button
          variant="outline"
          size="sm"
          onClick={exportAsMarkdown}
          className="ml-auto"
        >
          Markdown
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={exportAsJSON}
        >
          JSON
        </Button>
      </div>
      
      <ScrollArea className="h-[400px]">
        <EditorContent 
          editor={editor} 
          className="prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none"
        />
      </ScrollArea>
    </div>
  );
};
