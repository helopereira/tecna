import logo from '../../../images/logo.png';

export default function Logo() {
    return(
        <div style={{fontFamily: "Century Gothic"}}>    
            <a className={`
            flex justify-center items-center gap-3 pl-3
            font-bold text-white text-2xl 
            `} href="http://localhost:3000/">             
                <img className={`w-10 h-10`} src={logo.src}/>
                <p>TECNA</p>
            </a>
        </div>
    )
}