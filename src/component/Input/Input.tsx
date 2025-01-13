"use client";

import clsx from "clsx";
import { type InputHTMLAttributes, forwardRef } from "react";

import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  errorText?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { containerClassName, className, type, errorText, ...otherProps } =
    props;

  return (
    <div className={containerClassName}>
      <div className={styles.component}>
        <input
          {...otherProps}
          className={clsx(styles.input, className)}
          type={type || "text"}
          ref={ref}
        />
      </div>
      {errorText && <p className={styles.errorText}>{errorText}</p>}
    </div>
  );
});
