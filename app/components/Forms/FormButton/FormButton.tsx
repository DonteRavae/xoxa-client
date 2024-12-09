// REACT
import { ReactNode } from "react";
// STYLES
import styles from "./FormButton.module.css";

interface FormButtonProps {
  type: "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
}

export default function FormButton({
  type,
  disabled,
  children,
}: FormButtonProps) {
  return (
    <button className={styles["form-button"]} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
