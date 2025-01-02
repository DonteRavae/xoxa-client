// REACT
import { forwardRef, ReactNode } from "react";
// STYLES
import styles from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
};

export default forwardRef<HTMLDialogElement, ModalProps>(function InternalModal(
  { children },
  ref
) {
  return (
    <dialog ref={ref} className={styles.container}>
      {children}
    </dialog>
  );
});
