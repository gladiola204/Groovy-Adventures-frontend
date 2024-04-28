import ReactModal from "react-modal"
import { Desktop, TabletAndBelow } from "../../../utils/mediaQueries"
import Dialog from "./Dialog"
import ModalNextSection from "./ModalNextSection";
import Modal from 'react-modal';
import ModalCloseButton from "./ModalCloseButton";
import { ReactNode, useEffect, useRef } from "react";

interface Props {
    children: JSX.Element[] | JSX.Element;
    classNameDialog: string;
    isModalOpen: boolean
    closeModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
    contentLabel: string;
    classNameModal: string;
    isNextButton?: boolean;
}

const DialogOrModal: React.FC<Props> = ({ children, isModalOpen, closeModal, classNameDialog, classNameModal, contentLabel, isNextButton = false }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const modalClassName = 'ReactModal__Modal '.concat(classNameModal);
    const dialogClassName = 'dialog '.concat(classNameDialog);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (isModalOpen) {
            dialog?.show();
            dialog?.classList.add('dialog--open');
        } else {
            dialog?.classList.add('dialog--before-close');
            setTimeout(() => {
                dialog?.close();
                dialog?.classList.remove('dialog--before-close', 'dialog--open');
            }, 1000);
        }
    }, [isModalOpen]);

    const closeButton = <ModalCloseButton closeModal={closeModal}/>;


    return(
        <>
            <TabletAndBelow>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel={contentLabel}
                    closeTimeoutMS={1000}
                    className = {modalClassName}
                    overlayClassName="Overlay"
                >
                    {closeButton}
                    {children}
                    {isNextButton ? <ModalNextSection closeModal={closeModal} /> : null}
                </Modal>
            </TabletAndBelow>
        
            <Desktop>
                <dialog ref={dialogRef} className={dialogClassName}>
                    {closeButton}
                    {children}
                </dialog>
            </Desktop>
        </>
    )
};

export default DialogOrModal;