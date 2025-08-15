import insta from '../../../images/insta.png';
import tiktok from '../../../images/tiktok.png';
import twitter from '../../../images/twitter.png';
import face from '../../../images/facebook.png';

export default function Social() {
    return(
        <div className={`
            flex flex-col justify-center items-center max-h-35 w-1/4
        `}>
            <div className="text-white font-bold mt-4 flex h-1/4">
                SIGA NOSSAS REDES SOCIAIS
            </div>
            
            <div className={`
                    justify-center items-center
                    grid grid-cols-4 w-1/2 
                `}>
                <img src={insta.src} ></img>
                <img src={tiktok.src} ></img>
                <img src={twitter.src}></img>
                <img src={face.src}></img>
            </div>
                
        </div>
    )
}