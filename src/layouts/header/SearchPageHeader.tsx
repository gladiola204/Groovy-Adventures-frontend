import '../../sass/main.scss';
import { IoIosArrowDropdown as ArrowIcon } from 'react-icons/io';
import NavItem from './components/NavItem';
import CategoriesModal from '../../components/modals/CategoriesModal';
import useModalState from '../../hooks/useModalState';
import clsx from 'clsx';
import HamburgerMenu from './components/HamburgerMenu';
import LoginNavItem from './components/LoginNavItem';
import Logo from './components/Logo';
import ShoppingCartNavItem from './components/ShoppingCartNavItem';
import WishlistNavItem from './components/WishlistNavItem';
import useToggleHamburgerMenu from './useToggleHamburgerMenu';
import useCategoriesState from '../../hooks/useCategoriesState';

const SearchPageHeader: React.FC = () => {
    const { openedModal, handleCloseModal, handleOpenModal } = useModalState();
    const { categories } = useCategoriesState();
    const { isHamburgerMenuOpen, setIsHamburgerMenuOpen } = useToggleHamburgerMenu();
    const colorVariant = 'black';

    const categoriesNavItem = (
        <NavItem colorVersion={colorVariant}>
            <>
                <button className='flex-row flex-row--small-gap header__button' onClick={() => handleOpenModal('categories')}>
                    <h3 className='header__categories'>Categories</h3>
                    <div className='flex-row'>
                        <ArrowIcon className={clsx('header__arrow', {
                        "header__arrow--active": openedModal === 'categories'})}/>
                    </div>
                </button>
            </>
        </NavItem>
    )

    return(
        <header className={clsx('header','header--tours-list')}>
                <Logo colorVariant={colorVariant}/>

                <HamburgerMenu isOpen={isHamburgerMenuOpen} setOpen={setIsHamburgerMenuOpen}/>

                <nav>
                    <ul id='navigation' className={clsx('header__nav-item-list', 'header__nav-item-list--tours-list')} data-visible={isHamburgerMenuOpen}>
                        {categoriesNavItem}
                        
                        <LoginNavItem colorVariant={colorVariant}/>
                        <ShoppingCartNavItem colorVariant={colorVariant}/>
                        <WishlistNavItem colorVersion={colorVariant}/>

                        <CategoriesModal isModalOpen={openedModal === 'categories'} closeModal={handleCloseModal} categories={categories}/>
                    </ul>
                </nav>
        </header>
    )
}

export default SearchPageHeader;