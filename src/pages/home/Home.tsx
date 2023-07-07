import { Link } from 'react-router-dom';
import iconImg from '../../assets/icon-black.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileRetro, faSignsPost, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import hippieIcon from '../../assets/hippie-icon.png';
import Hamburger from 'hamburger-react'
import '../../sass/main.scss';
import { useState } from 'react';

function Home() {
    const [isOpen, setOpen] = useState(false);

    return(
        <div>
            <a className="skip-to-content" href="#main">Skip to content</a>

            <header className='primary-header'>
                <div className="logo">
                    <a href='#home'>
                        <img src={iconImg} alt='Icon - hippie showing victory sign. Next to it is the inscription Groovy Adventures'/>
                    </a>
                    
                </div>

                <button  className='mobile-nav-toggle' aria-controls='primary-navigation' aria-expanded={isOpen}>
                    <span className='sr-only'>Menu </span>
                    <Hamburger toggled={isOpen} toggle={setOpen} size={200}/>
                </button>

                <nav>
                    <ul id='primary-navigation' className='primary-navigation underline-indicators' data-visible={isOpen}>
                        <li className='active'>
                            <a href='#about-us'>About us</a>
                        </li>
                        <li aria-hidden='true'>
                            <span/>
                        </li>
                        <li>
                            <a href='#contact'>Contact</a>
                        </li>
                        <li>
                            <button>
                                <Link to='/shop'>Shop</Link>
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            
            <main id='main'>
                <div className="snapScroller">
                    <section id='home'>
                        <div className='hero-section'>
                            <div className='text-section'>
                                <h1>
                                    Experience the <span> Magic of the 60s</span>
                                    <span className='hop-text'>Hop on our Hippie Bus Tours</span>
                                </h1>
                            </div>
                        </div>
                    </section>

                    <section id='about-us'>
                        <div className='aboutUs-section'>
                            <div className='aboutUs-section__grid-paragraphs'>
                                <p>
                                    We offer a variety of hippie bus tours that cater to different interests and travel styles. From our classic cross-country road trip to our scenic coastal tours, there's a tour for everyone. Our tours feature comfortable and stylish vintage VW buses, plenty of opportunities to explore off the beaten path.
                                </p>

                                <p className='drugi'>
                                    At Groovy Adventures, we've been sharing our love of the open road and the hippie spirit since 2023. Our founder Sylwia was inspired to start the company after taking a cross-country road trip in a vintage VW bus and experiencing the freedom and adventure that comes with traveling on the open road.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id='contact'>
                        <div className='contact-section'>
                            <div className='h1Text'>
                                <h1>CONNECT WITH <br/>US, MAN!</h1>
                            </div>

                            <span className='hippieIcon' aria-hidden="true">
                                <img src={hippieIcon} alt='Hippie man icon'/>
                            </span>
                            
                            <ul>
                                <li>
                                    <FontAwesomeIcon icon={faMobileRetro} aria-hidden="true"/>
                                    <span className='sr-only'>Phone number</span>
                                    <p>+1-202-555-0162</p>
                                </li>

                                <li>
                                 
                                    <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true"/>
                                    <span className='sr-only'>Email adress</span>
                                    <p>groovy-adventures @gmail.com</p>
                                </li>

                                <li>
                                    <FontAwesomeIcon icon={faSignsPost} aria-hidden="true"/>
                                    <span className='sr-only'>Our adress</span>
                                    <p>510 SE CAMP ST, LAKE CITY, FL 32025, U.S </p>
                                </li>

                                <li>
                                    <FontAwesomeIcon icon={faInstagramSquare} aria-hidden="true"/>
                                    <span className='sr-only'>Link to our instagram</span>
                                    <p>instagram.com /groovy-adventures</p>
                                </li>

                            </ul>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )

};

export default Home;