import Modal from "@/components/Modal/Modal";
import Modals from "@/components/Modal/Modals";
import React, { useContext, useState, createContext, useMemo } from "react";
import useDisableScroll from "./useDisableScroll";


export const ModalContext = createContext<{
  modal: React.ReactElement<typeof Modal> | undefined;
  openModal: (modal: React.ReactElement<typeof Modal>) => void;
  closeModal: Function;
  isOpen: boolean;
}>({
  modal: undefined,
  openModal: () => {},
  closeModal: () => {},
  isOpen: false,
});

export const useOpenModal = () => useContext(ModalContext).openModal;
export const useCloseModal = () => useContext(ModalContext).closeModal;

export default function useModals() {
  return useContext(ModalContext);
}

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setState] = useState<
    React.ReactElement<typeof Modal> | undefined
  >();

  const [isOpen, setIsModalOpen] = useState(false);
  useDisableScroll(isOpen);

  const value = useMemo(
    () => ({
      modal,
      openModal: (modal: React.ReactElement<typeof Modal>) => {
        setState(modal);
        setIsModalOpen(true);
      },
      closeModal: () => setIsModalOpen(false),
      isOpen,
    }),
    [modal, setState, isOpen, setIsModalOpen]
  );
  return (
    <ModalContext.Provider value={value}>
      <>
        <Modals />
        {children}
      </>
    </ModalContext.Provider>
  );
};
