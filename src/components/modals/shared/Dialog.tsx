import { ReactNode, forwardRef, useEffect, useRef } from "react";
import ModalCloseButton from "./ModalCloseButton";

interface Props {
    children: ReactNode[] | JSX.Element;
    classNameModal: string;
    closeDialog: () => void,
    shouldBeOpen: boolean,
}

const Dialog: React.FC<Props> = (({ children, closeDialog, shouldBeOpen }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    
    useEffect(() => {
        const dialog = dialogRef.current;

        if (shouldBeOpen) {
            dialog?.showModal();
            dialog?.classList.add('dialog--open');
        } else {
            dialog?.classList.add('dialog--before-close');
            setTimeout(() => {
                dialog?.close();
                dialog?.classList.remove('dialog--before-close', 'dialog--open');
            }, 1000);
        }
    }, [shouldBeOpen]);

    return(
        <dialog ref={dialogRef} className='dialog'>
            <ModalCloseButton closeModal={closeDialog}/>
            {children}
        </dialog>
    )
});

export default Dialog;