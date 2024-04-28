import { useMemo } from "react";
import useModalState, { ModalType } from "../../../hooks/useModalState";
import useDateState from "../hooks/useDateState";
import { format } from "date-fns";
import CalendarModal from "./CalendarModal";

interface Props {
    getButtonClass: (modalName: ModalType.Calendar) => string
}

const CalendarInput: React.FC<Props> = ({ getButtonClass }) => {
    const { handleOpenModal } = useModalState();
    const { Calendar } = ModalType;
    const { selectedRange } = useDateState();

    const displayDateRange = useMemo(() => {
        if(selectedRange?.from && !selectedRange?.to) {
            return `${format(selectedRange.from, 'y-MM-dd')} ${<span>-</span>} `
        } else if(selectedRange?.from && selectedRange?.to) {
            return `${format(selectedRange.from, 'y-MM-dd')} - ${format(selectedRange.to, 'y-MM-dd')}`
        }
        return 'Provide a date';
    }, [selectedRange]);

    return (
        <label>
            <button className={getButtonClass(Calendar)} onClick={() => handleOpenModal(Calendar)} type='button'>
                <div className='searchBar__label'>Date</div>
                <div className='searchBar__input'>
                    {displayDateRange}
                </div>
            </button>
            <CalendarModal />
        </label>
    )
};

export default CalendarInput;