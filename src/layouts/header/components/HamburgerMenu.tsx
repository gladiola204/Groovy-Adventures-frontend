import Hamburger from "hamburger-react";

interface Props {
    isOpen: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const HamburgerMenu: React.FC<Props> = ({ isOpen, setOpen }) => {

    return(
        <button  className='header__mobile-nav-toggle' aria-controls='navigation' aria-expanded={isOpen}>
            <span className='sr-only'>Menu </span>
            <Hamburger toggled={isOpen} toggle={setOpen} size={200}/>
        </button>
    )
};

export default HamburgerMenu;