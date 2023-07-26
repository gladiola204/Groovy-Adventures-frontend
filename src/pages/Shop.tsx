import '../sass/main.scss';
import iconImg from '../assets/groovyAdventuresIcon-black.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../assets/userIcon-black.svg';
import { IoSearchCircle } from 'react-icons/io5';
import { IoIosArrowDropdown } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SearchBar from '../components/Searchbar';


function Shop() {
    const [isOpen, setOpen] = useState(false);
    const [isSearchbarOpened, setIsSearchbarOpened] = useState(false);

    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    
    return(
        <>
            <a className="skip-to-content" href="#main">Skip to content</a>
            <header className='primary-header'>
                    <div className="logo">
                        <img src={iconImg} alt='Icon - hippie showing victory sign. Next to it is the inscription Groovy Adventures'/>
                    </div>

                    <nav>
                        <ul id='primary-navigation' className='primary-navigation underline-indicators' data-visible={isOpen}>
                            <li className='active'>
                                <button>
                                    Categories
                                    <span>
                                        <IoIosArrowDropdown size={35}/>
                                    </span>
                                </button>
                            </li>
                            <li aria-hidden='true'>
                                <span/>
                            </li>
                            <li>
                                <Link to='/login'>
                                    Login <img src={userIcon} aria-hidden='true' className='nav_icon'/>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            <main className='main__shop'>
                <h1>Let's hit the road and see
                    <span className='blockText'>where the universe takes us</span>
                </h1>
                
                <SearchBar />
            </main>
        </>
    );
};

export default Shop;