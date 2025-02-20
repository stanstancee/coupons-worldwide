"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, LinkIcon, Smile } from "lucide-react";
import { useState, useCallback } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  disabled,
  placeholder = "Description",
}: RichTextEditorProps) {
  const [charCount, setCharCount] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      onChange(newContent);
      // Update character count - strip HTML tags for accurate count
      const textContent = editor.getText();
      setCharCount(textContent.length);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[120px] px-3 py-2",
        placeholder: placeholder,
      },
    },
  });

  const addEmoji = useCallback(
    (emoji: { native: string }) => {
      if (editor) {
        editor.chain().focus().insertContent(emoji.native).run();
      }
    },
    [editor]
  );

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg">
      <EditorContent editor={editor} />
      <div className="flex items-center justify-between border-t p-2">
        <div className="flex items-center gap-0.5">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                  type="button"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                disabled={disabled}
              >
                <Smile className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Picker
                data={data}
                onEmojiSelect={addEmoji}
                theme="light"
                previewPosition="none"
                skinTonePosition="none"
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={disabled}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
              type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={disabled}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
              type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={disabled}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
              type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={disabled}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
              type="button"
            size="sm"
            onClick={() => {
              const url = window.prompt("URL");
              if (url) {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setMark("link", { href: url })
                  .run();
              }
            }}
            disabled={disabled}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">{charCount} / 500</div>
      </div>
    </div>
  );
}
