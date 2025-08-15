import Empresa from "./Empresa";
import Social from "./Social";

export default function Footer() {
    return(
        <div className={`
            flex justify-center items-center
            w-full max-h-40 bg-black gap-40 p-3
        `}style={{fontFamily: "Century Gothic", fontSize: '1.3vw'}}> 

            <Empresa></Empresa>
            <Social></Social>
        </div>
    )
} 