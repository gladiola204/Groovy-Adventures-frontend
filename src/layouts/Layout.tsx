import { ReactNode } from "react";
import Header, { HeaderVariants } from "./header/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

interface Props {
    children?: ReactNode[] | JSX.Element;
    headerVariant: HeaderVariants;
    mainClassName?: string;
}

const Layout: React.FC<Props> = ({ children, headerVariant, mainClassName }) => {
    return(
        <>
            <a className="skip-to-content" href="#main">Skip to content</a>
            
            <Header variant={headerVariant}/>

            <main id='main' className={mainClassName}>
                {children ? children : <Outlet />}
                <Outlet/>
            </main>

            <Footer/>
        </>
    )
};

export default Layout