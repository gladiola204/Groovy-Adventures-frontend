import '../../sass/main.scss';
import CategoriesModal from '../../components/modals/CategoriesModal';
import useModalState from '../../hooks/useModalState';
import clsx from 'clsx';
import Logo from './components/Logo';
import HamburgerMenu from './components/HamburgerMenu';
import useToggleHamburgerMenu from './useToggleHamburgerMenu';
import LoginNavItem from './components/LoginNavItem';
import ShoppingCartNavItem from './components/ShoppingCartNavItem';
import WishlistNavItem from './components/WishlistNavItem';
import useCategoriesState from '../../hooks/useCategoriesState';

const MainHeader: React.FC = () => {
    const { openedModal, handleCloseModal } = useModalState();
    const { isHamburgerMenuOpen, setIsHamburgerMenuOpen } = useToggleHamburgerMenu();
    const { categories } = useCategoriesState();

    const colorVariant = 'white';

    return(
        <header className={clsx('header','header--tours-list')}>
                <Logo colorVariant={colorVariant}/>

                <HamburgerMenu isOpen={isHamburgerMenuOpen} setOpen={setIsHamburgerMenuOpen}/>

                <nav>
                    <ul id='navigation' className={clsx('header__nav-item-list', 'header__nav-item-list--tours-list')} data-visible={isHamburgerMenuOpen}>
                        <LoginNavItem colorVariant={colorVariant}/>
                        <ShoppingCartNavItem colorVariant={colorVariant}/>
                        <WishlistNavItem colorVersion={colorVariant}/>

                        <CategoriesModal isModalOpen={openedModal === 'categories'} closeModal={handleCloseModal} categories={categories}/>
                    </ul>
                </nav>
        </header>
    )
}

export default MainHeader;