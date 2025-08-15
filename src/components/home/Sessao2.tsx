import sessao2 from '../../images/fundoHome2.png';

export default function Sessao2() {
    return(
        <div style={{
            maxHeight: '62.1rem',
       }} className={`
           flex justify-end 
           bg-center bg-no-repeat bg-contain w-full
       `}>
           <div className="max-h-[62.1rem] w-full relative">
           <img src={sessao2.src} />
           </div>        
       </div>
    )
}