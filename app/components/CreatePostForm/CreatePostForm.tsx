// REMIX
import { useFetcher } from "@remix-run/react";
// EXTERNAL
import Editor from "../TextEditor/TextEditor";
// STYLES
import styles from "./CreatePostForm.module.css";
import FormButton from "../Forms/FormButton/FormButton";
import { useState } from "react";

type CreatePostFormProps = {
  image?: boolean;
};

export default function CreatePostForm({ image }: CreatePostFormProps) {
  const { Form } = useFetcher();
  const [data, setData] = useState<string>();

  const handleEditorInput = (input: string) => {
    setData(input);
  };

  const handleSubmit = () => {
    console.log(data);
  };

  if (image)
    return (
      <Form>
        <FormButton type="submit">Post</FormButton>
      </Form>
    );

  return (
    <Form className={styles.container} onSubmit={handleSubmit}>
      <Editor handleInput={handleEditorInput} />
      <FormButton type="submit" disabled={!data || data!.length <= 7}>
        Post
      </FormButton>
    </Form>
  );
}
