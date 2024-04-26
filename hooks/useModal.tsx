'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface IModalContext {
  showModal: boolean;
  modalContent: ReactNode;
  title: string;
  openModal: (content: ReactNode, title: string) => void;
  closeModal: () => void;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalContext = createContext({} as IModalContext);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [title, setTitle] = useState('');

  const openModal = (content: ReactNode, title: string) => {
    document.body.style.position = 'fixed';
    document.body.style.top = '0';
    document.body.style.right = '0';
    document.body.style.left = '0';
    setShowModal(true);
    setModalContent(content);
    setTitle(title);
  };

  const closeModal = () => {
    document.body.style.position = 'static';
    setShowModal(false);
    setModalContent(null);
    setTitle('');
  };

  return (
    <ModalContext.Provider value={{ showModal, modalContent, title, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
