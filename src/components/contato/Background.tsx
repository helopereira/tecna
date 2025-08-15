import backlogin from '../../images/fundoContato.png';

export default function Background() {
    return(
        <div style={{
            maxHeight: '62.1rem',
       }} className={`
           flex w-full
        `}>
            <div className="max-h-[62.1rem] w-full relative">
                <img src={backlogin.src}/>
            </div>
            
            <div className={`
                        flex justify-center items-center
                        w-full h-full
                        absolute z-10 
                    `}>
                <div className={`
                    flex flex-col
                    gap-10 w-[25vw] 
                    `}>
                    <div className={`
                            flex justify-center 
                            font-bold text-[#950888] text-6xl 
                        `}style={{fontFamily: "Century Gothic"}}>Contate-nos
                    </div>
                   
                        <form className={`
                                flex flex-col gap-10 text-black
                            `}>
                            <input className="bg-[#EAE8E8] h-14 rounded-full text-xl p-6" 
                            type='text' name='user' placeholder='nome do usuário'/>
                            <input className="bg-[#EAE8E8] h-14 rounded-full text-xl p-6"
                            type='email' name='email' placeholder='e-mail'/>
                            <textarea className="bg-[#EAE8E8] h-40 rounded-3xl text-xl p-6 resize-none"
                            rows={4} cols={50} name='conteudo' placeholder='o que deseja nos dizer?'/>
                        </form>
                        

                        <button className={`
                                flex justify-center items-center    
                                bg-[#950888] hover:bg-[#75066A]
                                rounded-xl font-bold text-3xl
                                h-20 text-white
                            `}>ENVIAR
                        </button>
                    
                </div>
            </div>
        </div>
    )
}