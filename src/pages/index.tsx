import Footer from "@/components/basicos/footer/Footer";
import Navbar from "@/components/basicos/navbar/Navbar";
import Assuntos from "@/components/home/Assuntos";
import Sessao1 from "@/components/home/Sessao1";
import Sessao2 from "@/components/home/Sessao2";

export default function Home() {
    return(
        <div>
            <Navbar activePage="home"></Navbar>
            <Sessao1></Sessao1>
            <Assuntos></Assuntos>
            <Sessao2></Sessao2>
            <Footer></Footer>            
        </div>
    )
}


    
