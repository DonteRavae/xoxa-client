// EXTERNAL
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
// INTERNAL
import MenuBar from "./MenuBar/MenuBar";
// STYLES
import styles from "./TextEditor.module.css";

type TextEditorProps = {
  handleInput: (input: string) => void;
};

export default function TextEditor({ handleInput }: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "What's on your mind?",
        emptyEditorClass: styles["is-editor-empty"],
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
    onUpdate: ({ editor }) => {
      handleInput(editor.getHTML());
    },
  });

  return (
    <>
      <EditorContent editor={editor} />
      <MenuBar editor={editor} />
    </>
  );
}
