"use client";

import clsx from "clsx";
import {
  type ChangeEvent,
  type SelectHTMLAttributes,
  forwardRef,
  useRef,
} from "react";

import styles from "./Select.module.scss";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  optionData: { value: string | number; text: string }[];
  placeholder?: string;
  containerClassName?: string;
  errorText?: string;
}

export const Select = forwardRef<HTMLSelectElement, Props>((props, ref) => {
  const {
    optionData,
    placeholder,
    containerClassName,
    className,
    errorText,
    onChange,
    ...otherProps
  } = props;
  const placeholderRef = useRef<HTMLDivElement>(null);

  const handlePlaceholder = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!placeholder) return;
    if (event.target.value && placeholderRef.current) {
      placeholderRef.current.style.display = "none";
    }
    if (!event.target.value && placeholderRef.current) {
      placeholderRef.current.style.display = "block";
    }
  };

  return (
    <div className={containerClassName}>
      <div className={styles.component}>
        <select
          {...otherProps}
          className={clsx(styles.select, className)}
          onChange={(event) => {
            onChange?.(event);
            handlePlaceholder(event);
          }}
          ref={ref}
        >
          <option value="" />
          {optionData.map((item) => {
            return (
              <option
                value={item.value}
                key={item.text}
                className={styles.option}
              >
                {item.text}
              </option>
            );
          })}
        </select>
        {placeholder && (
          <div ref={placeholderRef} className={styles.placeholder}>
            {placeholder}
          </div>
        )}
      </div>
      {errorText && <p className={styles.errorText}>{errorText}</p>}
    </div>
  );
});

Select.displayName = "Select";
