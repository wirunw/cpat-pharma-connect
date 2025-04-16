
import React, { useRef } from 'react';
import { useRichEditor } from './editor/useEditor';
import { EditorToolbar } from './editor/toolbar/EditorToolbar';
import { EditorContent } from './editor/EditorContent';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editor = useRichEditor({ content, onChange });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt('ใส่ URL ของรูปภาพ');
    if (url) {
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
      <EditorToolbar
        editor={editor}
        onImageUpload={() => fileInputRef.current?.click()}
        onAddImage={addImage}
        onSetLink={setLink}
        onInsertTable={insertTable}
        onInsertHorizontalRule={insertHorizontalRule}
        onExportMarkdown={exportAsMarkdown}
        onExportJSON={exportAsJSON}
      />
      <EditorContent editor={editor} />
      <input 
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={uploadImage}
      />
    </div>
  );
};
