import { ErrorMessage, Formik, Form, Field } from 'formik';
import lupa from '../../../images/lupa.png';
import { Search } from 'lucide-react';
import * as yup from "yup";
import axios, { Axios } from 'axios';
import { useState } from 'react';


export default function Pesquisa() {
    const [ busca, setBusca ] = useState();

    const handleClickPesquisa = (values: any) => {
        axios.get("http://localhost:5000/api/busca", {
            params: {
                busca: values.busca
            }
        }).then((response) => {
            console.log(response.data);
            console.log({params: values.busca});
            setBusca(response.data);
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
    )
}