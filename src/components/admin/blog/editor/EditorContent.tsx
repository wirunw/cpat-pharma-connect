
import React from 'react';
import { Editor, EditorContent as TiptapContent } from '@tiptap/react';
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditorContentProps {
  editor: Editor;
}

export const EditorContent = ({ editor }: EditorContentProps) => {
  return (
    <ScrollArea className="h-[400px]">
      <TiptapContent 
        editor={editor} 
        className="prose prose-sm max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </ScrollArea>
  );
};
