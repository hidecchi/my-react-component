"use client";

import {
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "area[href]",
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  "select:not([disabled]):not([aria-hidden])",
  "textarea:not([disabled]):not([aria-hidden])",
  "button:not([disabled]):not([aria-hidden])",
  "iframe",
  "object",
  "embed",
  "[contenteditable]",
  '[tabindex]:not([tabindex^="-"])',
];

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export type ModalHandler = {
  handleOpen: (event: MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
};

export const Modal = forwardRef<ModalHandler, ModalProps>(
  function Modal(props, ref) {
    const { children, ...otherProps } = props;
    const [open, setOpen] = useState<boolean>(false);
    const modalContentsRef = useRef<HTMLDivElement>(null);
    const openButtonRef = useRef<HTMLButtonElement | null>(null);

    const handleOpen = useCallback((event: MouseEvent<HTMLButtonElement>) => {
      setOpen(true);
      // モーダルを開くときに押下したボタンを記憶しておく
      openButtonRef.current = event.currentTarget;
    }, []);

    const handleClose = useCallback(() => {
      setOpen(false);
      // モーダル外の要素のhiddenを解除
      document
        .getElementById("main-container")
        ?.setAttribute("aria-hidden", "false");
      // モーダルを開くときに押下したボタンをフォーカス
      openButtonRef.current?.focus();
    }, []);

    // フォーカストラップ1
    const onFocusTopDiv = () => {
      if (modalContentsRef.current) {
        const focusableElements = modalContentsRef.current.querySelectorAll(
          FOCUSABLE_ELEMENTS.join(","),
        );
        const lastFocusableElements =
          focusableElements[focusableElements.length - 1];
        if (lastFocusableElements instanceof HTMLElement) {
          lastFocusableElements.focus();
        }
      }
    };
    // フォーカストラップ2
    const onFocusBottomDiv = () => {
      if (modalContentsRef.current) {
        const focusableElements = modalContentsRef.current.querySelectorAll(
          FOCUSABLE_ELEMENTS.join(","),
        );
        const firstFocusableElements = focusableElements[0];
        if (firstFocusableElements instanceof HTMLElement) {
          firstFocusableElements.focus();
        }
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        handleOpen,
        handleClose,
      }),
      [handleOpen, handleClose],
    );

    useEffect(() => {
      // モーダルを開く時に最初のフォーカス可能要素にフォーカス
      // モーダル外の要素をhiddenに
      if (open && modalContentsRef.current) {
        const firstFocusableElements =
          modalContentsRef.current.querySelectorAll(
            FOCUSABLE_ELEMENTS.join(","),
          )[0];
        if (firstFocusableElements instanceof HTMLElement) {
          firstFocusableElements.focus();
          document
            .getElementById("main-container")
            ?.setAttribute("aria-hidden", "true");
        }
      }
    }, [open]);

    if (!open) return null;

    return createPortal(
      <div
        aria-modal="true"
        role="dialog"
        {...otherProps}
        className={styles.component}
      >
        <div>
          <div className={styles.backSpace} onClick={handleClose} />
          <div tabIndex={0} onFocus={onFocusTopDiv} />
          <div ref={modalContentsRef}>{children}</div>
          <div tabIndex={0} onFocus={onFocusBottomDiv} />
        </div>
      </div>,
      document.body,
    );
  },
);
