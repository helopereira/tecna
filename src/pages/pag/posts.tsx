import { useContext, useEffect } from 'react';
import { AuthContext } from "@/context/authContext";
import Navbar from "@/components/basicos/navbar/Navbar";
import imgPosts from "../../images/imgPosts.png";
import 'reactjs-popup/dist/index.css';
import useResponse from '../api/useResponse';
import PopupPost from "@/components/popup/PopupPost";
import Post from "@/components/posts_remake/Post";
import { ErrorMessage, Formik, Form, Field } from 'formik';
import { Search } from 'lucide-react';
import * as yup from "yup";
import axios from 'axios';
import { useState } from 'react';

export default function posts() {
    const { posts } = useResponse(); 
    const { isAuthenticated, activeUser } = useContext(AuthContext);
    const [ postsExibidos, setPostsExibidos ] = useState(posts);

    //quando recarrega a página vem todos os posts
    useEffect(() => {   
        handleClickPesquisa({busca:""});
    }, []);

    const handleClickPesquisa = (values: any) => {
        axios.get("http://localhost:5000/api/busca", {
            params: {
                busca: values.busca
            }
        }).then((response) => {
            console.log(response.data);
            console.log({params: values.busca});
            setPostsExibidos(response.data);
        }).catch((error) => {
            console.log("Erro ao fazer pesquisa:", error);
            alert("Erro ao fazer pesquisa.");
        })
    }

    const validationPesquisa = yup.object().shape({
        busca: yup
        .string()
        .required("")
    })

    return (
        <div>
            <Navbar activePage="posts">
                <div>
                    <Formik
                        initialValues={{ busca:'' }}
                        onSubmit={handleClickPesquisa}
                        validationSchema={validationPesquisa}
                    >
                        <Form>
                            <div className='flex relative items-center'>
                                <Search color="#ffffff" size={22} className='absolute ml-2'/>
                                <Field className={`
                                    flex justify-center items-center
                                    rounded-3xl w-80 h-10 pl-10
                                    bg-[#46053F] 
                                    placeholder:text-[#820476]
                                    `} name="busca" placeholder="Buscar..."
                                />
                                <ErrorMessage component="span" name="busca"/>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </Navbar>
            <div className={`flex justify-center items-center h-screen shadow-[inset_-3px_-3px_50px_#BC0FAB] bg-black relative`}>
                <div className={`flex absolute gap-5`}>
                    {/* Sessão 1 */}
                    <div className={`flex flex-col bg-white h-fit  rounded-xl text-black p-4 gap-3 overflow-y-auto max-h-[52.5rem] max-w-[80rem]`}>
                            {/* Posts e Comentários */}
                            <Post allPosts={postsExibidos} />                          
                    </div>

                    {/* Sessão 2 */}
                    <div className={`flex justify-center relative bg-white h-[52.5rem] w-[29rem] rounded-xl`}>
                        {!isAuthenticated ? (
                            <div className="flex justify-center">
                                <img className={`flex rounded-xl`} src={imgPosts.src} alt="img de fundo" />
                                <div className="flex flex-col absolute items-center mt-[3rem] gap-3 w-[20rem]">
                                    <p className="flex text-center text-black text-xl" style={{ fontFamily: "Century Gothic" }}>
                                        Para interagir conosco, junte-se à nossa comunidade!
                                    </p>
                                    <button className={`flex justify-center items-center h-10 w-[20rem] bg-[#950888] hover:bg-[#75066A] rounded-lg text-lg font-bold text-white`}>
                                        <a href='/pag/cadastro'>ENTRAR PARA A COMUNIDADE</a>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex">
                                <img className={`flex rounded-xl`} src={imgPosts.src} alt="img de fundo" />
                                <div className="flex flex-col justify-center items-start absolute p-5">
                                    <div className="flex">
                                        <img className="h-14" src={activeUser?.cor_perfil} alt="icon de perfil" />
                                        <div className="flex flex-col mt-0.5">
                                            <p className={`font-bold text-xl pl-2 text-black`} style={{ fontFamily: "Century Gothic" }}>
                                                {activeUser?.nome}
                                            </p>
                                            <p className={`pl-2 text-[#8D8C8D]`} style={{ fontFamily: "Century Gothic" }}>
                                                {activeUser?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <PopupPost />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
