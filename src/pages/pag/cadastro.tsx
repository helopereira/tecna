import backlogin from "../../images/fundoLogin.png";
import logo from "../../images/logo.png"
import seta from "../../images/seta.png"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useContext, useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/authContext";
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'

export default function Cadastro() {

    const navigate = useRouter();
    const { cadastro } = useContext(AuthContext);
    const [isShow, setIsShow] = useState(false);
    const handlePassword = () => setIsShow(!isShow);

    //esquema de datas
    const publishDate = new Date();
    const date = format(publishDate,  "'Entrou em' dd 'de' MMM 'de' yyyy", { locale: ptBR });

    const handleClickCadastro = async (values: any) => {
        try {
            const response = await Axios.post("http://localhost:5000/pag/cadastro", {
                email: values.email,
                nome: values.nome,
                senha: values.senha,
                date: date,
                color_img: "/_next/static/media/perfil_pink.df4e8722.png",
            });
            console.log(response)
            if(response.data.msg == 'cadastrado'){

                navigate.push('/pag/login');
            } else {
                alert(response.data.msg);
            }
            
        } catch (error) {
            console.error("Erro ao fazer o cadastro:", error);
            alert("Ocorreu um erro ao tentar fazer o cadastro.");
        } 
    };

    const validationCadastro = yup.object().shape({
        email: yup
        .string()
        .email("Não é um e-mail válido")
        .required("Este campo é obrigatório"),
        nome: yup
        .string()
        .min(5, "Nome mínimo de cinco caracteres")
        .required("Este campo é obrigatório"),
        senha: yup
        .string()
        .min(8, "Senha mínima de oito caracteres")
        .required("Este campo é obrigatório"),
        confirmasenha: yup
        .string()
        .oneOf([yup.ref("senha")], "Senhas não compatíveis")
        .required("Este campo é obrigatório")
    });

    return(
        <div style={{
            maxHeight: '67.5rem',
        }} className={`
           flex w-full
        `}>
            <div className="max-h-[67.5rem] w-full relative">
                <img src={backlogin.src}/>
            </div>

            <div className={`
                    flex left-3 top-3
                    absolute z-10
                    w-10
                `}>
                <a href="http://localhost:3000/"><img src={seta.src}/></a>
            </div>

            <div className={`
                    flex left-[23rem] top-[8rem]
                    absolute z-10 
                    w-52 
                `}>
                <img src={logo.src}/>
            </div>

            <Formik
                initialValues={{}} 
                onSubmit={handleClickCadastro}
                validationSchema={validationCadastro}
            >
                <Form className={`w-[25vw] absolute z-10 left-[13rem] top-[20rem]`}>
                    <div className="div-field">
                        <Field className="field" name="email" placeholder="seu e-mail" />                        
                        <ErrorMessage component="span" name="email" className="form-error"/>
                    </div>
                        
                    <div className="div-field">
                        <Field className="field" name="nome" placeholder="nome de usuário" />                       
                        <ErrorMessage component="span" name="nome" className="form-error"/>
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
                        
                    <div className="div-field"> 
                        <div className="flex justify-center items-center">  
                            <Field className="field-senha" name="confirmasenha" placeholder="confirme sua senha" type={isShow ? "text" : "password" }/>
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
                            rounded-xl font-bold text-3xl text-white
                            h-20 w-[27rem] ml-6 mt-4
                        `} type="submit">
                            <a onSubmit={handleClickCadastro} className=" flex justify-center items-center">CADASTRAR</a>
                    </button>  
                </Form>
            </Formik>

            <div className={`
                    flex left-[19rem] top-[60rem]
                    absolute z-10
                    text-black text-xl
                `}>
                Já possui uma conta? <a className={`text-blue-800 font-bold pl-1`}href="/pag/login">Conecte-se</a>
            </div>
            
        </div>
    )
}