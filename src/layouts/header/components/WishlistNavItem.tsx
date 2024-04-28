import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { TiHeartOutline as HeartIcon } from 'react-icons/ti';

interface Props {
    colorVersion: 'black' | 'white'
}

const WishlistNavItem: React.FC<Props> = ({ colorVersion }) => {
    return(
        <NavItem colorVersion={colorVersion} blockPadding={false}>
            <Link to='/wishlist' className='flex-column header__button'>
                <HeartIcon className='header__heart-icon'/>
            </Link>
        </NavItem> 
    )
};

export default WishlistNavItem;