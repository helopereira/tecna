import Navbar from "@/components/basicos/navbar/Navbar";
import backContato from "../../images/fundoContato.png";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { useContext } from 'react';
import { AuthContext } from "@/context/authContext";

export default function Contato() {

    const { activeUser } = useContext(AuthContext);

    //enviar forms
    const handleClickContato = (values: any, { resetForm }: FormikHelpers<any>) => { 
        Axios.post("http://localhost:5000/pag/contato", {
            nome: values.nome,
            email: values.email,
            texto: values.texto,
            idusuario: activeUser.id,
        }).then((response) => {
            alert(response.data.msg);
            console.log(response)
            resetForm();
        });
    };

    const validationContato = yup.object().shape({
        email: yup
        .string()
        .email("Não é um e-mail válido")
        .required("Este campo é obrigatório"),

        nome: yup
        .string()
        .required("Este campo é obrigatório"),

        texto: yup
        .string()
        .required("Este campo é obrigatório")

    });

    const handleReset = (resetForm: () => void) => {
        if (window.confirm('Reset?')) {
          resetForm();
        }
      };

    return(
        <div>
            <Navbar activePage="contato"></Navbar>
            <div style={{maxHeight: '62.1rem'}} className={`flex w-full`}>

                <div className="max-h-[62.1rem] w-full relative">
                    <img src={backContato.src}/>
                </div>
                
                <div className={`
                            flex justify-center items-center
                            w-full h-full
                            absolute z-10 
                        `}>
                    <div className={`
                        flex flex-col
                        gap-10 w-[25vw] 
                        `}>
                        <div className={`
                                flex justify-center 
                                font-bold text-[#950888] text-6xl 
                            `}style={{fontFamily: "Century Gothic"}}>Contate-nos
                        </div>
                        
                        <Formik
                            initialValues={{ nome: '', email: '', texto: '' }} 
                            onSubmit={handleClickContato}
                            validationSchema={validationContato}
                        >
                            <Form>
                                <div className="div-field">
                                    <Field className="field-contato" name="nome" placeholder="nome de usuário"/>
                                    <ErrorMessage component="span" name="nome" className="form-error"/>
                                </div>

                                <div className="div-field">
                                    <Field className="field-contato" name="email" placeholder="e-mail"/>
                                    <ErrorMessage component="span" name="email" className="form-error"/>
                                </div>

                                <div className="div-field">
                                    <Field className="field-contato-box" as="textarea" name="texto" placeholder="o que deseja nos dizer?"/>
                                    <ErrorMessage component="span" name="texto" className="form-error"/>
                                </div>

                                <button className={`
                                    flex justify-center items-center    
                                    bg-[#950888] hover:bg-[#75066A]
                                    rounded-xl font-bold text-3xl
                                     text-white mt-4
                                    `} type="submit" onSubmit={()=>handleClickContato}>
                                    <span className="flex justify-center items-center h-20 w-[30rem]">ENVIAR</span>
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
