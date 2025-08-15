import AssuntosImagens from "./AssuntosImagens";

export default function Assuntos() {
    return(
        <div className={`
            flex-col justify-center items-center
            w-[100%] max-h-96 
            bg-black text-white p-6 gap-4
        `} style={{fontFamily: "Century Gothic"}}>

            <div className={`
                mb-4 text-xl font-bold 
                flex justify-center items-center
                `}
                style={{fontSize: '1.3vw'}}
            >
                ASSUNTOS QUE POSSAM TE INTERESSAR
            </div>

            <AssuntosImagens></AssuntosImagens>
        </div>
    )
}