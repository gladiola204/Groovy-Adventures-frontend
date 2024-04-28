interface ModalNextSectionProps {
    closeModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void
}

const ModalNextSection: React.FC<ModalNextSectionProps> = ({ closeModal }) => {
    return (
      <div className='ReactModal__next-section'>
        <button onClick={closeModal} className='ReactModal__next-button'>Next</button>
      </div>
    );
};

export default ModalNextSection;