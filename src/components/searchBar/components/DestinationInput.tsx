import React, { useEffect, useRef } from "react";
import { Desktop, TabletAndBelow } from "../../../utils/mediaQueries";
import useModalState, { ModalType } from "../../../hooks/useModalState";
import useDestinationState from "../hooks/useDestinationState";
import DestinationModal from "./DestinationModal";

interface Props {
    getButtonClass: (modalName: ModalType.Destination) => string
}

const DestinationInput: React.FC<Props> = ({ getButtonClass }) => {
    const { openedModal, handleCloseModal, handleOpenModal } = useModalState();
    const { destination, handleChangeDestination } = useDestinationState();
    const { Destination } = ModalType;
    const inputRef = useRef<HTMLInputElement>(null);
    
    const btnClass = getButtonClass(Destination);
    const label = <div className='searchBar__label'>Where</div>;

    const openModalAndChangeDest = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleOpenModal(Destination);
        handleChangeDestination(e);
    } 

    useEffect(() => {
        if (openedModal === Destination && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    }, [openedModal]);

    return(
        <>
            <Desktop>
                <label className={btnClass}>
                    {label}
                    
                    <input ref={inputRef} type='text' placeholder='Add destination' className='searchBar__input' onChange={openModalAndChangeDest} value={destination}/>
                </label>
            </Desktop>
        
            <TabletAndBelow>
                <button className={btnClass} onClick={() => handleOpenModal(Destination)} type='button'>
                    {label}

                    <div className='searchBar__input'>Add destination</div>
                </button>
            </TabletAndBelow>

            <DestinationModal />
        </>

    )
};

export default DestinationInput;