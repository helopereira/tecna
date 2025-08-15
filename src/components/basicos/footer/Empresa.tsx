export default function Empresa() {
    return(
        <div className={`
            flex-col justify-center items-center
            text-white text-lg 
        `} style={{fontSize: '1.3vw'}}>
            <div className="font-bold">
                TECNA
            </div>
            <a href="/pag/contato">
                Contate-nos
            </a>
        </div>
    )
}