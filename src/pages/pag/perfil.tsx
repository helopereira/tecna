import Navbar from "@/components/basicos/navbar/Navbar"
import 'reactjs-popup/dist/index.css';
import { useContext } from 'react';
import { AuthContext} from "@/context/authContext";
import { useRouter } from "next/router";
import useResponse from "../api/useResponse";
import { MessageCircle} from "lucide-react";
import PopupPost from "@/components/popup/PopupPost";
import PopupAlterName from "@/components/popup/PopupAlterName";
import Axios from "axios";
import imgRed from "../../images/perfil_red.png"
import imgOrange from "../../images/perfil_orange.png"
import imgYellow from "../../images/perfil_yellow.png"
import imgGreen from "../../images/perfil_green.png"
import imgBlue from "../../images/perfil_blue.png"
import imgPurple from "../../images/perfil_purple.png"
import imgPink from "../../images/perfil_pink.png"
import Post from "@/components/posts_remake/Post";
  
export default function Perfil() {
    // Autenticação e navegação   
    const {  posts, sugestoes, usuarios } = useResponse(); 
    const findUser = (id: any) => {
        return usuarios.find(user => user.id === id);
    };
    const { logout, activeUser } = useContext(AuthContext);    
    const navigate = useRouter();
    function sair (){
        logout();
        navigate.push('/');
    }

    const postsUser = posts.filter(post => post.id_usuario == activeUser?.id);
    
    // Botão trocar cor perfil
    const colorChange = ( color: any , id: any) => {
        console.log(imgRed)
        console.log(imgOrange)
        console.log(imgYellow)
        console.log(imgGreen)
        console.log(imgBlue)
        console.log(imgPurple)
        console.log(imgPink)

        Axios.post("http://localhost:5000/pag/usuario", {
            imagem: color,
            id: id,
        }).then((response) => {
            console.log(response)
        });
    }

    return(
        <div>
            <Navbar activePage="perfil"/>
            <div className={`
                 h-screen shadow-[inset_-3px_-3px_40px_#BC0FAB]
                 bg-black relative
                `}>

                {/* Sessão 1 */}
                <div className={`
                        flex absolute 
                        bg-white h-[10rem] w-[80rem] rounded-xl
                        ml-7 mt-7 p-4
                        text-black 
                    `}>
                    
                    <div className="flex flex-col justify-start items-start">
                        <div className="flex justify-center">
                            <img className="h-14" src={activeUser?.cor_perfil} alt="icon de perfil"/>

                            <div className="flex flex-col mt-0.5">
                                <p className={`
                                        font-bold text-xl pl-2
                                    `} style={{fontFamily: "Century Gothic"}}> {activeUser?.nome}
                                </p>

                                <p className={`
                                        pl-2 text-[#8D8C8D]
                                    `} style={{fontFamily: "Century Gothic"}}> {activeUser?.email}
                                </p>    
                            </div>
                        </div>

                        <PopupPost></PopupPost>
                        
                    </div>
                </div>

                {/* Sessão 2 */}
                {activeUser?.email == 'admin@email.com'? (
                    <div>
                        {/* Sessão sugestões perfil admin */}
                        <div className={`
                            flex flex-col absolute 
                            bg-white h-[20rem] w-[80rem] rounded-xl
                            ml-7 mt-[14rem] p-4
                            overflow-y-auto
                            overflow-x-hidden
                            gap-3 text-black
                        `}>
                            {/* Posts e Comentários*/}
                            <Post allPosts={postsUser}/>
                        </div>  

                        <div className={`
                            flex flex-col absolute 
                            bg-white h-[20rem] w-[80rem] rounded-xl
                            ml-7 mt-[30vw] p-4
                            text-black
                            overflow-y-auto
                            overflow-x-hidden
                            gap-3 `}>

                            {sugestoes.map (sugestao => {
                                const userSugestao = findUser(sugestao.id_usuario);

                                return(
                                    <div className="border-b-2">
                                    <div className="flex flex-col justify-start items-start">
                                        <div className="flex justify-center">
                                            <div className="flex justify-center items-center bg-slate-400 h-10 w-10 rounded-full ">
                                                <MessageCircle color="#ffffff"/> 
                                            </div>   

                                            <div className="flex flex-col mt-0.5">
                                                <p className={`
                                                    font-bold text-xl pl-2
                                                    `} style={{fontFamily: "Century Gothic"}}> {userSugestao?.nome}
                                                </p>

                                                <p className={`
                                                    pl-2 text-[#8D8C8D]
                                                    `} style={{fontFamily: "Century Gothic"}}> {userSugestao?.email}
                                                </p>    
                                            </div>
                                        </div>

                                        <div className={`flex text-lg p-2`}>
                                            {sugestao.texto} 
                                        </div>     
                                    </div>
                                </div>        
                                )
                            })}
                        </div>   
                    </div> 
                ) : (
                    <div className={`
                        flex flex-col absolute 
                        bg-white h-[40rem] w-[80rem] rounded-xl
                        ml-7 mt-[14rem] p-4 
                        text-black
                        overflow-y-auto
                        overflow-x-hidden
                        gap-3
                    `}>
                        {/* Posts e Comentários*/}
                        <Post allPosts={postsUser}/>
                    </div>    
                )}
                                 
                {/* Sessão 3 */}
                <div className="flex justify-end">
                    <div className={`
                        flex justify-center absolute 
                        h-[52.5rem] w-[33rem] 
                        mr-7 mt-7 p-4 border-2 border-[#BC0FAB] rounded-xl
                        text-black
                    `}>

                        <div className="flex flex-col">
                            <div className="flex flex-col justify-center items-center">
                                <img className="h-[18rem] mt-8" src={activeUser?.cor_perfil} alt="icon de perfil"/>

                                <div className="flex flex-col justify-center items-center mt-4">
                                    <p className={`
                                            font-bold text-3xl text-white
                                        `} style={{fontFamily: "Century Gothic"}}> {activeUser?.nome}
                                    </p>

                                    <p className={`
                                            text-white text-xl
                                        `} style={{fontFamily: "Century Gothic"}}> {activeUser?.email}
                                    </p>

                                    <p className={`
                                            text-[#9f9e9e] text-xl mt-[1rem]
                                        `} style={{fontFamily: "Century Gothic"}}>{activeUser?.data}
                                    </p>
                                </div>  
                            </div> 

                            <div className="flex flex-col justify-center items-center mt-[6rem]">
                                <p className={`
                                        flex justify-center
                                        text-white text-lg
                                    `} style={{fontFamily: "Century Gothic"}}>Cor do perfil
                                </p>

                                <div className="flex justify-between items-center p-3 gap-3">
                                    <button onClick={() => colorChange("/_next/static/media/perfil_red.445dbe8a.png", activeUser.id)} className={`
                                            rounded-full border-white border-2
                                            bg-red-700 hover:bg-red-800 h-10 w-10
                                        `}>
                                    </button>
                                    
                                    <button onClick={() => colorChange("/_next/static/media/perfil_orange.caf9c4a8.png", activeUser.id)} className={`
                                            rounded-full border-white border-2
                                            bg-orange-600 hover:bg-orange-700 h-10 w-10
                                        `}>
                                    </button>

                                    <button onClick={() => colorChange("/_next/static/media/perfil_yellow.8292c17e.png", activeUser.id)} className={`
                                            rounded-full border-white border-2
                                            bg-amber-400 hover:bg-amber-500 h-10 w-10
                                        `}>
                                    </button>

                                    <button onClick={() => colorChange("/_next/static/media/perfil_green.71daf35e.png", activeUser.id)} className={`
                                            rounded-full border-white border-2
                                            bg-green-600 hover:bg-green-700 h-10 w-10 
                                        `}>
                                    </button>

                                    <button onClick={() => colorChange("/_next/static/media/perfil_blue.d45cdf2f.png", activeUser.id)} className={`
                                            rounded-full border-white border-2
                                            bg-blue-600 hover:bg-blue-700 h-10 w-10
                                        `}>
                                    </button>

                                    <button onClick={() => colorChange("/_next/static/media/perfil_purple.a7997b61.png", activeUser.id)} className={`
                                            rounded-full border-white border-2
                                            bg-purple-700 hover:bg-purple-800 h-10 w-10
                                        `}>
                                    </button>

                                    <button onClick={() => colorChange("/_next/static/media/perfil_pink.df4e8722.png", activeUser.id)} className={`
                                            rounded-full border-white border-2
                                            bg-[#A90B99] hover:bg-[#75066A] h-10 w-10
                                        `}>
                                    </button>
                                </div>
                            </div>
                            
                            <div className={`
                                    flex flex-col justify-start items-start 
                                    mt-[3.3rem] gap-5 
                                    text-2xl text-white
                                    `} style={{fontFamily: "Century Gothic"}}>

                                {/* alterar nome de usuário */}
                                <PopupAlterName></PopupAlterName>

                                {/* sair da conta */}
                                <button className={`
                                        border-t-2 border-[#BC0FAB] hover:bg-[#75066A] rounded-b-lg 
                                        p-3 w-[33rem]
                                    `} onClick={sair}>Sair
                                </button>
                            </div>
                        </div>     
                    </div>
                </div>
            </div>           
        </div>
    )
}
