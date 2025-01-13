"use client";

import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import styles from "./RadioButton.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export const RadioButton = (props: Props) => {
	const { label, className, ...otherProps } = props;
	return (
		<label className={clsx(styles.component, className)}>
			<input {...otherProps} className={styles.input} type="radio" />
			<span className={styles.alternativeInput} />
			<span className={styles.labelText}>{label}</span>
		</label>
	);
};
