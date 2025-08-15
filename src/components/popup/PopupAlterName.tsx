import Axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Popup from "reactjs-popup";
import * as yup from "yup";
import { useContext } from 'react';
import { AuthContext } from "@/context/authContext";
import { useState } from "react";

export default function PopupAlterName() {

    const { activeUser } = useContext(AuthContext);

    const handleClickAlterName = (values: any) => {
        Axios.post("http://localhost:5000/pag/usuario", {
            novoNome: values.novoNome,
            id: activeUser.id,
        }).then((response) => {
            console.log(response);
            closePopup();
        }).catch((error) => {
            console.log("Erro ao alterar nome:", error);
            alert("Erro ao alterar nome.");
        })
    };

    const validationAlterName = yup.object().shape({
        novoNome: yup
        .string()
        .required(""),
    });

    const [open, setOpenPopup] = useState(false);
    const closePopup = () => setOpenPopup(false);

    return(
        <div>
            <button onClick={() => setOpenPopup(true)}
                className={`h-[3.6rem] border-2 border-[#BC0FAB] hover:bg-[#75066A] vp-3 w-[33rem]`}>
                Alterar nome de usuário
            </button>

            <Popup open={open} closeOnDocumentClick onClose={closePopup} modal nested>
                <Formik
                initialValues={{ novoNome: "" }}
                onSubmit={handleClickAlterName}
                validationSchema={validationAlterName}
                >
                    <Form className={`
                        flex flex-col justify-center items-center
                        text-black bg-gradient-to-tr from-black to-[#810066]
                        h-[20rem] rounded-md
                    `}>
                        
                        <div className={`flex p-5 text-white text-3xl`}
                        style={{fontFamily: "Century Gothic"}}> ALTERAR NOME DE USUÁRIO
                        </div>

                        <div  className="flex flex-col  items-center gap-5">
                            <div>
                                <Field className="field" name="novoNome" placeholder="Novo nome de usuário"/>
                                <ErrorMessage component="span" name="novoNome" className=""/>
                            </div>

                            <div className="flex gap-3">
                                <button className={`
                                    flex justify-center items-center
                                    text-white font-bold text-xl
                                    bg-lime-600 hover:bg-lime-700 rounded-xl  
                                    h-[4rem] w-[8rem]
                                    `} type='submit'>
                                    <span>Salvar</span>
                                </button> 

                                <button className={`
                                    flex justify-center items-center
                                    text-white font-bold text-xl
                                    bg-red-700 hover:bg-red-800 rounded-xl  
                                    h-[4rem] w-[8rem]
                                    `} type='button' onClick={closePopup}>
                                    <span>Cancelar</span>
                                </button>
                            </div>
                                                        
                        </div>
                    </Form>
                </Formik> 
            </Popup>
        </div>
    )
}