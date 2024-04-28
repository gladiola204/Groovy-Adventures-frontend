import Layout from '../layouts/Layout';
import SearchBar from '../components/searchBar/Searchbar';
import 'react-datepicker/dist/react-datepicker.css';
import '../sass/main.scss';

function Search() {
    return(
        <Layout headerVariant='search-page' mainClassName='search-dest'>
            <h1 className='search-dest__header'>Let's hit the road and see
                <span className='blockText'>where the universe takes us</span>
            </h1>
            
            <SearchBar />
        </Layout>
    );
};

export default Search;