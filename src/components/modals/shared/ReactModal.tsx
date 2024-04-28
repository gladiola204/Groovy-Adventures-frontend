import Modal from 'react-modal';
import ModalCloseButton from "./ModalCloseButton";
import { ReactNode } from 'react';


interface Props {
    isModalOpen: boolean
    closeModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
    children: ReactNode[] | JSX.Element;
    contentLabel: string;
    classNameModal: string;
}

const ReactModal: React.FC<Props> = ({ children, closeModal, isModalOpen, contentLabel, classNameModal }) => {
    const className = 'ReactModal__Modal '.concat(classNameModal);

    return (
        <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel={contentLabel}
        closeTimeoutMS={1000}
        className = {className}
        overlayClassName="Overlay"
        >
            <ModalCloseButton closeModal={closeModal}/>
            {children}
        </Modal>
    )
};

export default ReactModal;