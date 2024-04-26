'use client';

import Button from '@/components/Button';
import { useModal } from '@/hooks/useModal';
import React from 'react';

const Modal: React.FC = () => {
  const { showModal, modalContent, title, closeModal } = useModal();

  return showModal ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="w-full max-w-lg bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-start p-2 border-b">
            <div className="text-lg font-semibold">{title}</div>
            <Button onClick={closeModal} className="text-lg font-semibold">
              X
            </Button>
          </div>
          <div className="text-lg">{modalContent}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
