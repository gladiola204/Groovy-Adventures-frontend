import { Link } from "react-router-dom";
import logoBlack from '../../assets/groovyAdventuresIcon-black.svg';
import logoWhite from '../../assets/GroovyAdventuresIcon-white.svg';

interface Props {
    colorVariant: 'black' | 'white'
}

const Logo: React.FC<Props> = ({ colorVariant }) => {
    const logoVariant = colorVariant === 'black' ? logoBlack : logoWhite;

    return(
        <div className='header__logo'>
            <Link to='/'>
                <img src={logoVariant} alt='Icon - hippie showing victory sign. Next to it is the inscription Groovy Adventures'/>
            </Link>    
        </div>
    )
};

export default Logo;