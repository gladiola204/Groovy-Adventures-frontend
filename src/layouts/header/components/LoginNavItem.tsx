import NavItem from "./NavItem";
import userIconBlack from '../../../assets/userIcon-black.svg';
import userIconWhite from '../../../assets/userIcon-white.svg';
import useModalState, { ModalType } from "../../../hooks/useModalState";
import LoginModal from "../../../components/modals/LoginModal";

interface Props {
    colorVariant: 'black' | 'white';
}
const LoginNavItem: React.FC<Props> = ({ colorVariant }) => {
    const { openedModal, handleCloseModal, handleOpenModal } = useModalState();
    
    const userIcon = colorVariant === 'white' ? userIconWhite : userIconBlack;

    //{variant === 'search-page' ? <h3 className='header__login'>Login</h3> : null}
    return(
        <NavItem colorVersion={colorVariant} blockPadding={false}>
            <>
                <button className='flex-column header__button' onClick={() => handleOpenModal(ModalType.Login)}>
                    <img src={userIcon} aria-hidden='true' className='header__user-icon'/>
                    
                </button>
                <LoginModal isModalOpen={openedModal === ModalType.Login} closeModal={handleCloseModal}/>
            </>
        </NavItem> 
    )
};

export default LoginNavItem;