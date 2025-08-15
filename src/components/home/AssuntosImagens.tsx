import monitor from "../../images/monitor.png";
import gabinete from "../../images/gabinete.png";
import processador from "../../images/processador.png";
import fonte from "../../images/fonte.png";
import teclado from "../../images/teclado.png";
import headset from "../../images/headset.png";


export default function AssuntosImagens() {
    return( 
        <div className={`
            grid grid-cols-6 items-center
            gap-14 text-lg w-full h-fit 
        `} style={{fontSize: '1.3vw'}}>
            <div className="flex-col w-fit">
                <img className={`
                    max-h-60 w-60 rounded-full shadow-[0_0_50px_rgba(188,_15,_171,_0.7)]
                `}src={monitor.src}></img>
                <div className="flex justify-center p-4" >Monitor</div>
            </div>
            
            <div className="flex-col w-fit">
                <img className={`
                    max-h-60 w-60 rounded-full shadow-[0_0_50px_rgba(188,_15,_171,_0.7)]
                `}src={gabinete.src}></img>
                <div className="flex justify-center p-4" >Gabinete</div>
            </div>

            <div className="flex-col  w-fit"> 
                <img className={`
                    max-h-60 w-60 rounded-full shadow-[0_0_50px_rgba(188,_15,_171,_0.7)]
                `}src={processador.src}></img>
                <div className="flex justify-center p-4">Processador</div>
            </div>
           
            <div className="flex-col  w-fit">
                <img className={`
                    max-h-60 w-60 rounded-full shadow-[0_0_50px_rgba(188,_15,_171,_0.7)]
                `}src={fonte.src}></img>
                <div className="flex justify-center p-4 text-center">Fonte</div>
            </div>
            
            <div className="flex-col  w-fit">
                <img className={`
                    max-h-60 w-60 rounded-full shadow-[0_0_40px_rgba(188,_15,_171,_0.7)]
                `}src={teclado.src}></img>
                <div className="flex justify-center p-4">Teclado</div>
            </div>
            
            <div className="flex-col  w-fit">
                <img className={`
                    max-h-60 w-60 rounded-full shadow-[0_0_50px_rgba(188,_15,_171,_0.7)]
                `}src={headset.src}></img>
                <div className="flex justify-center p-4">Headset</div>
            </div>
            
        </div>
    )
}