import { IoSearchCircle as SearchIcon } from 'react-icons/io5';

const SearchButton: React.FC = () => {
    return(
        <button className='search-button'>
            Start to search...
            <SearchIcon className='search-button__icon'/>
        </button>
    )
};  

export default SearchButton;