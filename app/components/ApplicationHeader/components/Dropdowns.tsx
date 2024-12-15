// REACT
import { ReactNode } from "react";
// STYLES
import styles from "./Dropdowns.module.css";

export enum DropdownOptions {
  Notification,
  Community,
}

type DropdownProps = {
  kind: DropdownOptions;
  children: ReactNode;
};

export default function DropdownMenu({ kind, children }: DropdownProps) {
  if (kind === DropdownOptions.Community)
    return (
      <div className={styles.dropdown}>
        <h3>Your Communities</h3>
        {children}
      </div>
    );
  return (
    <div className={styles.dropdown}>
      <h3>Your Notifications</h3>
      {children}
    </div>
  );
}
