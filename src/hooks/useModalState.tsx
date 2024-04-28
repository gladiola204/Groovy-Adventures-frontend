import { useState } from 'react';

export enum ModalType {
  Destination = 'destination',
  Calendar = 'calendar',
  Counter = 'counter',
  Categories = 'categories',
  Login = 'login',
  ShoppingCart = 'shopping-cart',
  Payment = 'payment'
}

const useModalState = () => {
  const [openedModal, setOpenedModal] = useState<ModalType | null>(null);

  const handleOpenModal = (modalType: ModalType) => {
    setOpenedModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenedModal(null);
  };

  return {
    openedModal,
    handleCloseModal,
    handleOpenModal,
  };
};

export default useModalState;