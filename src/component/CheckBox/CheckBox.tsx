"use client";

import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

import styles from "./CheckBox.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const CheckBox = (props: Props) => {
  const { label, className, ...otherProps } = props;
  return (
    <label className={clsx(styles.component, className)}>
      <input {...otherProps} className={styles.input} type="checkbox" />
      <span className={styles.alternativeInput} />
      <span className={styles.labelText}>{label}</span>
    </label>
  );
};
