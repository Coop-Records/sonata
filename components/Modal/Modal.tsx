/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback } from "react";
import clsx from "clsx";
import { animated, useTransition } from "react-spring";
import styles from "./Modal.module.css";
import useModals from "@/hooks/useModal";

export type Props = {
  children: React.ReactElement;
  onClose?: Function;
  title?: React.ReactNode;
  classNames?: {
    container?: string;
    modal?: string;
    content?: string;
    title?: string;
    closeIcon?: string;
    header?: string;
    footer?: string;
  };
  hideCloseButton?: boolean;
  subtitle?: React.ReactNode;
  hideHeader?: boolean;
  footerContent?: React.ReactElement;
  isOpen?: boolean;
  close?: Function;
};

export default function Modal({
  onClose,
  children,
  title,
  classNames,
  hideCloseButton = false,
  hideHeader,
  footerContent,
  isOpen: open,
  close,
}: Props) {
  const { isOpen: modalsIsOpen, closeModal: modalsCloseModal } = useModals();
  const isModalOpen = open ?? modalsIsOpen;
  const closeModal = close ?? modalsCloseModal;

  const handleClose = useCallback(() => {
    if (onClose) onClose();
    if (closeModal) closeModal();
  }, [onClose, closeModal]);

  const transitions = useTransition(isModalOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const overlayTransitions = useTransition(isModalOpen, {
    from: { opacity: 0 },
    enter: { opacity: 0.8 },
    leave: { opacity: 0 },
  });

  return transitions((style: any, item: any) =>
    item ? (
      <animated.div
        className={clsx(styles.modal, classNames?.modal)}
        style={style}
      >
        {overlayTransitions((overlayStyle: any) => (
          <animated.div
            className={styles.overlay}
            onClick={handleClose}
            style={overlayStyle}
          />
        ))}
        <div className={clsx(styles.container, classNames?.container)}>
          {!hideHeader && (
            <div className={clsx(styles.header, classNames?.header)}>
              <div className={styles.titleSection}>
                <div className={classNames?.title}>{title}</div>
              </div>
              {!hideCloseButton && <button onClick={handleClose}>x</button>}
            </div>
          )}
          <div className={clsx(styles.content, classNames?.content)}>
            {React.cloneElement(children, { close: handleClose })}
          </div>
          {footerContent && (
            <div className={clsx(styles.footer, classNames?.footer)}>
              {footerContent}
            </div>
          )}
        </div>
      </animated.div>
    ) : null
  );
}
