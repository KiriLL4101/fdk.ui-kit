import { forwardRef, InputHTMLAttributes } from "react";

import { ReactComponent as CheckSVG } from "./Success.svg";
import { ReactComponent as IndeterminateSVG } from "./Minus.svg";

import styles from "./Checkbox.module.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  error?: boolean;
  hovered?: boolean;
  children?: never;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate }, ref) => {
    return (
      <div className={styles.container}>
        <input
          ref={ref}
          className={styles.checkbox}
          type="checkbox"
          disabled={indeterminate}
        />
        <div className={styles.background}>
          {indeterminate ? (
            <IndeterminateSVG className={styles.indeterminate} />
          ) : (
            <CheckSVG className={styles.check} />
          )}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
