"use client";

import clsx from "clsx";
import { type InputHTMLAttributes, forwardRef } from "react";

import styles from "./TextArea.module.scss";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  errorText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { containerClassName, className, type, errorText, ...otherProps } =
    props;

  return (
    <div className={containerClassName}>
      <div className={styles.component}>
        <textarea
          {...otherProps}
          className={clsx(styles.textArea, className)}
          ref={ref}
        />
      </div>
      {errorText && <p className={styles.errorText}>{errorText}</p>}
    </div>
  );
});
