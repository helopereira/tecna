import { useContext } from 'react';
import { AuthContext } from "@/context/authContext";
import { EllipsisVertical, Trash, SendHorizonal } from "lucide-react";
import Popup from "reactjs-popup";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";

// Comentario
interface ComentarioProps {
    texto: string;
    id_usuario: string; // Alterado de [] para string
    id_post: string;
    data: string;
    id: string;
}

interface Comentarios {
    Comentario: ComentarioProps[];
    id: string;
}

const deleteComents = async (comentsId: string) => {
    try {
        const response = await Axios.post("http://localhost:5000/pag/comentario", {
            id_coments: comentsId,
        });
        console.log(response);
    } catch (error) {
        console.error("Erro ao deletar comentário:", error);
    }
}

export function Comentario({ Comentario, id }: Comentarios) {
    const {usuarios} = useResponse();
    const findUser = (id: any) => {
        return usuarios.find(user => user.id === id);
    };
    const { activeUser } = useContext(AuthContext);

    return (
        <>
            {Comentario.map((coment) => {
                if (coment.id_post === id)
                    return (
                        <div
                            className="flex flex-col p-2 mt-2 mb-2 border-2 overflow-y-auto overflow-x-hidden max-h-[30rem]"
                            key={coment.id}
                        >
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <img className="h-12" src={findUser(coment.id_usuario)?.cor_perfil} alt="Imagem do usuário" />
                                    <div className="flex flex-col mt-0.5">
                                        <p
                                            className="font-bold text-lg pl-2"
                                            style={{ fontFamily: "Century Gothic" }}
                                        >
                                            {findUser(coment.id_usuario)?.nome}
                                        </p>
                                        <p
                                            className="pl-2 text-[#8D8C8D]"
                                            style={{ fontFamily: "Century Gothic" }}
                                        >
                                            {findUser(coment.id_usuario)?.email}
                                        </p>
                                    </div>
                                </div>
                                {activeUser?.id === coment.id_usuario && (
                                    <div className="flex items-start mt-2">
                                        <Popup
                                            trigger={
                                                <button type="button">
                                                    <EllipsisVertical />
                                                </button>
                                            }
                                        >
                                            <div>
                                                <button
                                                    className="flex justify-center ml-2 font-semibold gap-[6.5rem] text-black"
                                                    type="button"
                                                    onClick={() => deleteComents(coment.id)}
                                                >
                                                    Deletar <Trash size={16} />
                                                </button>
                                            </div>
                                        </Popup>
                                    </div>
                                )}
                            </div>
                            <p className="flex text-xl p-2 mt-2">
                                {coment.texto}
                            </p>
                            <div className="flex p-2">
                                <p className="flex justify-start text-lg text-[#8D8C8D]">
                                    {coment.data}
                                </p>
                            </div>
                        </div>
                    );
                return null; // Adiciona return null para evitar problemas com renderização
            })}
        </>
    );
}

// Comentar
interface Post {
    id: string;
}

import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import useResponse from '@/pages/api/useResponse';

const publishDate = new Date();
const date = format(publishDate, 'dd.MM.yyyy', { locale: ptBR });

export function Comentar({ id }: Post) {
    const { activeUser, isAuthenticated } = useContext(AuthContext);

    const handleClickComents = (values: any, { resetForm }: FormikHelpers<any>) => {
        Axios.post("http://localhost:5000/pag/comentario", {
            id_usuario: activeUser.id,
            id_post: id,
            comentario: values.comentario,
            date: date,
        }).then((response) => {
            alert(response.data.msg);
            console.log(response);
            resetForm();
        }).catch(error => {
            console.error("Erro ao comentar:", error);
        });

        resetForm();  
    };

    const validationComents = yup.object().shape({
        comentario: yup.string().required(""),
    });

    const handleClickAlert = () => {
        alert("É preciso estar logado para fazer comentários");
    }

    return (
        <div className="border-t-2 p-2">
            <Formik
                initialValues={{ comentario: "" }}
                onSubmit={handleClickComents}
                validationSchema={validationComents}
            >
                <Form className="flex items-center">
                    <div className="flex gap-2">
                        <img className="flex h-12" src={activeUser?.cor_perfil? activeUser.cor_perfil : '/_next/static/media/perfil_pink.df4e8722.png'} alt="Imagem do usuário" />
                        <Field
                            className="bg-[#EAE8E8] w-[68rem] rounded-full p-3"
                            name="comentario"
                            placeholder="Escreva um comentário..."
                        />
                        <ErrorMessage component="span" name="comentario" />
                    </div>

                    {!isAuthenticated ? (
                        <button
                            className="
                                flex justify-center items-center
                                bg-[#950888] hover:bg-[#75066A]
                                w-10 h-10 rounded-full ml-2
                            "
                            onClick={handleClickAlert}
                            type="button" // Garanta que o tipo seja "button" para evitar submit do form
                        >
                            <span className="">
                                <SendHorizonal color="#ffffff" />
                            </span>
                        </button>
                    ) : (
                        <button
                            className="
                                flex justify-center items-center
                                bg-[#950888] hover:bg-[#75066A]
                                w-10 h-10 rounded-full ml-2
                            "
                            type="submit"
                        >
                            <span className="">
                                <SendHorizonal color="#ffffff" />
                            </span>
                        </button>
                    )}
                </Form>
            </Formik>
        </div>
    );
}
