import backlogin from "../../images/fundoLogin.png";
import logo from "../../images/logo.png";
import seta from "../../images/seta.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";
import { useContext, useState } from 'react';
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const navigate = useRouter();
    const { login } = useContext(AuthContext);
    const [isShow, setIsShow] = useState(false);
    const handlePassword = () => setIsShow(!isShow);

    const handleClickLogin = async (values: any) => {
        try {
            const response = await Axios.post("http://localhost:5000/pag/login", {
                email: values.email,
                senha: values.senha,
            });
            if(response.data.msg == 'logged'){
                login(values.email);

                navigate.push('/pag/perfil');
            } else {
                alert(response.data.msg);
            }
            
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Ocorreu um erro ao tentar fazer login.");
        } 
    };

    const validationLogin = yup.object().shape({
        email: yup
        .string()
        .email("Não é um e-mail válido")
        .required("Este campo é obrigatório"),

        senha: yup
        .string()
        .min(8, "Senha mínima de oito caracteres")
        .required("Este campo é obrigatório"),
    });

    return(
        <div style={{
            maxHeight: '67.5rem',
        }} className={`flex w-full`}>
            <div className="max-h-[67.5rem] w-full relative">
                <img src={backlogin.src} alt="Background Login"/>
            </div>

            <div className={`flex left-3 top-3 absolute z-10 w-10`}>
                <a href="http://localhost:3000/"><img src={seta.src} alt="Voltar"/></a>
            </div>

            <div className={`flex left-[23rem] top-[12rem] absolute z-10 w-52`}>
                <img src={logo.src} alt="Logo"/>
            </div>

            <Formik 
                initialValues={{ email: '', senha: '' }} 
                onSubmit={handleClickLogin}
                validationSchema={validationLogin}
            >
                <Form className={`w-[25vw] absolute z-10 left-[13rem] top-[27rem]`}>
                    <div className="div-field">
                        <Field className="field" name="email" placeholder="seu e-mail"/>
                        <ErrorMessage component="span" name="email" className="form-error"/>
                    </div>

                    <div className="div-field"> 
                        <div className="flex justify-center items-center">  
                            <Field className="field-senha" name="senha" placeholder="sua senha" type={isShow ? "text" : "password" }/>
                            <button className="bg-[#BC0FAB] h-14 ml-2 w-14 rounded-full flex justify-center items-center" onClick={handlePassword} type="button">
                                {isShow && <Eye color="#ffffff" size={24}/>}
                                {!isShow && <EyeOff color="#ffffff" size={24}/>}                              
                            </button>
                        </div>
                      
                        <ErrorMessage component="span" name="senha" className="form-error"/>
                    </div>
                        
                    <button className={`
                            flex justify-center items-center 
                            bg-[#950888] hover:bg-[#75066A] 
                            rounded-xl font-bold text-3xl
                            text-white h-20 mt-3
                         `} type="submit">
                        <span className="flex justify-center items-center h-20 w-[30rem]">ENTRAR</span>
                    </button>
                </Form>
            </Formik>

            <div className={`flex left-[16rem] top-[50rem] absolute z-10 text-black text-xl`}>
                Ainda não possui uma conta? <a className={`text-blue-800 font-bold pl-1`} href="/pag/cadastro">Criar conta</a>
            </div>
        </div>
    );
}
