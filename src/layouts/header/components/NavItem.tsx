import clsx from 'clsx';

interface NavItemProps {
    children: JSX.Element;
    key?: number,
    colorVersion?: 'black' | 'white',
    blockPadding?: boolean 
}

const NavItem: React.FC<NavItemProps> = ({ children, key, colorVersion = 'white', blockPadding = true }) => {
    const classNavItem = clsx('header__nav-item', {
        'header__nav-item--dark-border': colorVersion === 'black',
        'header__nav-item--block-padding': blockPadding === false
    });
    
    return (
        <li className={classNavItem} key={key}>
            {children}
        </li>
    )
}

export default NavItem;