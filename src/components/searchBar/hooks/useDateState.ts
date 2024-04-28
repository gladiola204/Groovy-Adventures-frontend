import { useState } from "react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";


const useDateState = () => {
    const [selectedRange, setSelectedRange] = useState<DateRange>();
    
    const handleRangeSelect: SelectRangeEventHandler = (range: DateRange | undefined) => {
        setSelectedRange(range);
    };
    return { selectedRange, handleRangeSelect }
};

export default useDateState;