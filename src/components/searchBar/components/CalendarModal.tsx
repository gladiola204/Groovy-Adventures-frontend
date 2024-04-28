import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import '../../sass/main.scss';
import ModalNextSection from '../../modals/shared/ModalNextSection';
import ReactModal from '../../modals/shared/ReactModal';
import useModalState, { ModalType } from '../../../hooks/useModalState';
import useDateState from '../hooks/useDateState';


const CalendarModal: React.FC = () => {
    const { openedModal, handleCloseModal } = useModalState();
    const { Calendar } = ModalType;
    const { selectedRange, handleRangeSelect } = useDateState();
    const newDate = new Date();

    return (
        <ReactModal closeModal={handleCloseModal} isModalOpen={openedModal === Calendar} classNameModal='ReactModal__Modal--calendar modal-calendar' contentLabel='Calendar'>
            
            <div className='modal-calendar__calendar'>
                <DayPicker 
                    numberOfMonths={2} 
                    mode="range" 
                    selected={selectedRange} 
                    onSelect={handleRangeSelect} 
                    fromMonth={newDate} 
                    toMonth={new Date(newDate.getFullYear() + 1, newDate.getMonth())} 
                    pagedNavigation 
                    disabled={{from: new Date(newDate.getFullYear(), newDate.getMonth(), 1), to: newDate}} modifiersClassNames={{ selected: 'my-selected' }} 
                    fixedWeeks/>
            </div>

            <ModalNextSection closeModal={handleCloseModal} />
        </ReactModal>
    );
};
  
export default CalendarModal;