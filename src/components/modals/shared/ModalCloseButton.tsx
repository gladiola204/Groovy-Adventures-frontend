import { GrFormClose } from 'react-icons/gr';


interface ModalCloseButtonProps {
    closeModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({ closeModal }) => {
    return (
        <button onClick={closeModal} className="close-button" type="button">
            <GrFormClose size={30}/>
        </button>
    );
};

export default ModalCloseButton;