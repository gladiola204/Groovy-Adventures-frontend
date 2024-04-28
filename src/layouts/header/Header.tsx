import MainHeader from './MainHeader';
import SearchPageHeader from './SearchPageHeader';
import HomePageHeader from './HomePageHeader';
import '../../sass/main.scss';

export type HeaderVariants = 'main' | 'search-page' | 'home-page';

interface Props {
    variant: HeaderVariants
};

const Header: React.FC<Props> = ({ variant }) => {
    switch (variant) {
        case 'home-page':
            return <HomePageHeader/>;
        case 'search-page':
            return <SearchPageHeader/>;
        default:
            return <MainHeader/>;
    }
}

export default Header;