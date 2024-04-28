import { useState } from "react";


const useToggleHamburgerMenu = () => {
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

    return { 
        isHamburgerMenuOpen, 
        setIsHamburgerMenuOpen 
    }
};

export default useToggleHamburgerMenu;