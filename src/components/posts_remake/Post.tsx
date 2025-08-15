import useResponse from "@/pages/api/useResponse";
import iconCoracao1 from "../../images/iconCoracao1.png"
import iconCoracao2 from "../../images/iconCoracao2.png"
import iconComents from "../../images/iconComents.png"
import { useContext, useState } from 'react';
import { AuthContext} from "@/context/authContext";
import { EllipsisVertical, Trash } from "lucide-react";
import Axios from "axios";
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'
import Popup from "reactjs-popup";
import {Comentar, Comentario} from "./Comentario";

interface PostProps{
    id: string,
    id_usuario: string,
    texto: string,
    data: string,
    imagem: string,
}

interface Posts{
    allPosts: PostProps[];
}

export default function Post({allPosts}: Posts){
    const {usuarios, comentarios} = useResponse();
    const findUser = (id: any) => {
        return usuarios.find(user => user.id === id);
    };

    //esquema de datas
    const publishDate = new Date(); // Substitua isso pela sua data real
    const date = format(publishDate, 'dd.MM.yyyy', { locale: ptBR });

    // Autenticação
    const { activeUser } = useContext(AuthContext);

    // Comentário
    const [comentsPostId, setComentsPostId] = useState(null);
  
    const showComents = (postId: any) => {
        setComentsPostId(comentsPostId === postId ? null : postId);
    };

    //deletar post
    const deletePosts = async (postsId: number | string) => {
        Axios.post("http://localhost:5000/pag/comentario", {
            id_post: postsId,
        });

        deletePostsComents(postsId);
    };

    //deletar tdos os comentários do post
    const deletePostsComents = async (postId: number | string) => {
        Axios.post("http://localhost:5000/pag/comentario", {
            id_comentPost: postId,
        });
    };

    return (
        <div>
          {allPosts.length === 0 ? (
            <div className="flex text-[#8D8C8D] p-10 justify-center items-center font-medium text-2xl"  style={{ fontFamily: "Century Gothic" }}>Ainda não há publicações</div>
          ) : (
            allPosts.map((post) => {
                return (
                    <div
                      className="
                        flex flex-col justify-center items-start 
                        border-b-2 border-[#d6d4d6] mb-3
                      "
                      key={post.id}
                    >
                      <div className="flex w-[99.5%]">
                        <div className="flex w-[77rem]">
                          <img className="h-14" src={findUser(post.id_usuario)?.cor_perfil} />
      
                          <div className="flex flex-col mt-0.5">
                            <p
                              className="
                                font-bold text-xl pl-2
                              "
                              style={{ fontFamily: "Century Gothic" }}
                            >
                              {findUser(post.id_usuario)?.nome}
                            </p>
      
                            <p
                              className="
                                pl-2 text-[#8D8C8D]
                              "
                              style={{ fontFamily: "Century Gothic" }}
                            >
                              {findUser(post.id_usuario)?.email}
                            </p>
                          </div>
                        </div>
      
                        <div className="flex items-start mt-2">
                            {activeUser?.id == post.id_usuario && (
                                <Popup  
                                    trigger={
                                    <button type="button" className="">
                                        <EllipsisVertical />
                                    </button>
                                    }
                                >
                                    <div>
                                        <button
                                            className="flex justify-center ml-2 font-semibold gap-[6.5rem] text-black"
                                            type="button"
                                            onClick={() => deletePosts(post.id)}
                                        >
                                            Deletar <Trash size={20} />
                                        </button>
                                    </div>
                              </Popup>
                            )}
                        </div>
                      </div>
      
                      <p className="flex text-2xl p-2 mt-2">{post.texto}</p>
      
                      <div className="flex justify-between w-[78rem] p-2">
                        <p
                          className="
                            flex justify-start
                            text-xl text-[#8D8C8D]
                          "
                        >
                          {post.data}
                        </p>
      
                        <div className="flex gap-5">
                          <button
                            onClick={() => showComents(post.id)}
                            className="flex w-6 gap-1 text-xl mr-5"
                          >
                            <img src={iconComents.src} />
                          </button>
                        </div>
                      </div>
      
                      {comentsPostId === post.id && (
                        <div className="flex flex-col ml-3">
                            <Comentar id={post.id}/>    
                            <Comentario Comentario={comentarios} id={post.id}/>
                        </div>
                      )}
                    </div>
                );
            })
          )}
        </div>
      );      
}