import '../../sass/main.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import NavItem from './components/NavItem';
import clsx from 'clsx';
import Logo from './components/Logo';
import HamburgerMenu from './components/HamburgerMenu';
import useToggleHamburgerMenu from './useToggleHamburgerMenu';

const navItems = [
    {
        label: 'About us',
        path: '#about-us',
    },
    {
        label: 'Contact',
        path: '#contact',
    },
    {
        label: 'Shop',
        path: '/search',
        isPill: true,
    },
];

const HomePageHeader: React.FC = () => {
    const { isHamburgerMenuOpen, setIsHamburgerMenuOpen } = useToggleHamburgerMenu();

    const renderNavItems = navItems.map(({path, label, isPill = false}, index) => {
        const link = <Link to={path} className='header__nav-link'>{label}</Link>;

        const renderLink = isPill ? 
            <div className='header__nav-pill'>{link}</div> 
            : link;

        return (
            <NavItem key={index} colorVersion='white'>
                {renderLink}
            </NavItem>
        )
    });

    return(
        <header className={clsx('header')}>
                <Logo colorVariant='black'/>


                <nav>
                    <HamburgerMenu isOpen={isHamburgerMenuOpen} setOpen={setIsHamburgerMenuOpen}/>

                    <ul id='navigation' className={clsx('header__nav-item-list')} data-visible={isHamburgerMenuOpen}>
                        {renderNavItems}
                    </ul>
                </nav>
            </header>
    )
}

export default HomePageHeader;