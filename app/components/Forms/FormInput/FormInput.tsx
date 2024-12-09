// REACT
import {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  useEffect,
  useState,
} from "react";
// STYLES
import styles from "./FormInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

interface FormInputProps extends ComponentProps<"input"> {
  label: string;
  information?: string;
  errorMessage?: string;
  validationMessage?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  {
    id,
    value,
    label,
    required,
    information,
    errorMessage,
    validationMessage,
    handleChange,
    ...otherProps
  }: FormInputProps,
  ref
) {
  const [shrinkLabel, setShrinkLabel] = useState<boolean>(false);

  useEffect(() => {
    (value as string).length ? setShrinkLabel(true) : setShrinkLabel(false);
  }, [value]);

  return (
    <div className={styles.container}>
      <input
        id={id}
        ref={ref}
        value={value}
        {...otherProps}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className={`${shrinkLabel ? styles.shrink : ""} ${
          errorMessage ? styles["error-message"] : ""
        }`}
      >
        {label}
        {required && <span className={styles["required-indicator"]}>*</span>}
        {errorMessage && (
          <span aria-live="assertive" className={styles["error-message"]}>
            - {errorMessage}
          </span>
        )}
        {information && (
          <div className={styles.tooltip}>
            <FontAwesomeIcon
              icon={faCircleInfo}
              aria-label="Password Criteria"
            />
            <p className={styles.information}>{information}</p>
          </div>
        )}
      </label>
      <p
        className={`${styles["validation-message"]} ${
          validationMessage ? styles.active : ""
        }`}
      >
        {validationMessage}
      </p>
    </div>
  );
});
