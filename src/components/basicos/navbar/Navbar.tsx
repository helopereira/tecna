import Logo from "./Logo";
import Menu from "./Menu";
import Pesquisa from "./Pesquisa";

interface NavbarProps {
    activePage: string; // Define o tipo de 'page' como string
    children: React.ReactNode;
  }

export default function Navbar({ activePage, children }: NavbarProps) {
    return(     
        <div className={`
            flex justify-between items-center   
            bg-black p-3 
            text-white text-xl
        `}>           
            <Logo></Logo>
            <div>{children}</div>
            <Menu page={activePage}></Menu>            
        </div>
    )
}