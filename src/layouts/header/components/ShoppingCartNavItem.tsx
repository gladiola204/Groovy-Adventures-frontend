import { Link } from "react-router-dom";
import { Desktop, TabletAndBelow } from "../../../utils/mediaQueries";
import NavItem from "./NavItem";
import shoppingCartIcon from '../../assets/bacpack-icon.svg';
import useModalState from "../../../hooks/useModalState";

interface Props {
    colorVariant: 'black' | 'white';
}

const ShoppingCartNavItem: React.FC<Props> = ({ colorVariant }) => {
    const { handleOpenModal } = useModalState();
    const renderShoppingCartIcon = <img src={shoppingCartIcon} aria-hidden='true' className='header__shopping-cart-icon'/>;

    return (
        <NavItem colorVersion={colorVariant} blockPadding={false}>
            <>
                <Desktop>
                    <button className='flex-column header__button' onClick={() => handleOpenModal('shopping-cart')}>
                        {renderShoppingCartIcon}
                    </button>
                </Desktop>
                <TabletAndBelow>
                    <Link to='/backpack' className='flex-column header__button'>
                        {renderShoppingCartIcon}
                    </Link>
                </TabletAndBelow>
            </>
        </NavItem> 
    )
};

export default ShoppingCartNavItem;