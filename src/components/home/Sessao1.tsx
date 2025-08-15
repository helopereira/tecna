import sessao1 from '../../images/fundoHome1.png';


export default function Sessao1() {
    return(
        <div style={{
            maxHeight: '62.1rem',
        }} className={`
            flex w-full
        `}>
            <div className="max-h-[62.1rem] w-full relative">
            <img src={sessao1.src} />
           
                <button className={`
                    flex justify-center items-center
                    h-32 w-96 bg-[#950888] hover:bg-[#75066A] rounded-xl   
                    text-3xl font-bold text-white 
                    absolute z-10 right-[19rem] bottom-[17rem]
                `}>
                    <a href='/pag/cadastro'>ENTRAR PARA A COMUNIDADE</a>
                </button>
            </div>        
        </div>
    )
}