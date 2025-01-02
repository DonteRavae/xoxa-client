// EXTERNAL
import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faParagraph,
  faBold,
  faItalic,
  faStrikethrough,
  faCode,
  faQuoteRight,
  faListUl,
  faListOl,
  faRotateLeft,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
// STYLES
import styles from "./MenuBar.module.css";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={styles["control-group"]}>
      <div className={styles["button-group"]}>
        <button
          title="Paragraph"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? styles["is-active"] : ""}
        >
          <FontAwesomeIcon icon={faParagraph} />
        </button>
        <button
          title="Heading 1"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? styles["is-active"] : ""
          }
        >
          H1
        </button>
        <button
          title="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? styles["is-active"] : ""
          }
        >
          H2
        </button>
        <button
          title="Heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? styles["is-active"] : ""
          }
        >
          H3
        </button>
        <button
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? styles["is-active"] : ""}
        >
          <FontAwesomeIcon icon={faBold} />
        </button>
        <button
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? styles["is-active"] : ""}
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? styles["is-active"] : ""}
        >
          <FontAwesomeIcon icon={faStrikethrough} />
        </button>
        <button
          title="Code"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? styles["is-active"] : ""}
        >
          <FontAwesomeIcon icon={faCode} />
        </button>
        <button
          title="Code Block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? styles["is-active"] : ""}
        >
          <span className={styles["code-block"]}>
            <FontAwesomeIcon icon={faCode} />
          </span>
        </button>
        <button
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? styles["is-active"] : ""}
        >
          <FontAwesomeIcon icon={faQuoteRight} />
        </button>
        <button
          title="Bulleted List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? styles["is-active"] : ""}
        >
          <FontAwesomeIcon icon={faListUl} />
        </button>
        <button
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? styles["is-active"] : ""}
        >
          <FontAwesomeIcon icon={faListOl} />
        </button>
        <button
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
        <button
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
