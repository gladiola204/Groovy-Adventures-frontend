import { ReactElement } from "react";
import { useMediaQuery } from "react-responsive";

interface Props {
    children: ReactElement | null;
}

export const Desktop: React.FC<Props> = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 900 }) //1224
    return isDesktop ? children : null
}

export const TabletAndBelow: React.FC<Props>  = ({ children }) => {
    const isTabletAndBelow = useMediaQuery({ maxWidth: 900 })
  
    return isTabletAndBelow ? children : null
}