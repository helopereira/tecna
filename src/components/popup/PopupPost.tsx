import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import { ImageUp, X } from "lucide-react"
import { useContext } from 'react';
import { AuthContext } from "@/context/authContext";
import ImageUploading from 'react-images-uploading';
import React from 'react';
import { format } from "date-fns";
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react';


export default function PopupPost() {
    const { activeUser } = useContext(AuthContext);

    //imagens
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    const onChange = (imageList: any, addUpdateIndex: any) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    //esquema de datas
    const publishDate = new Date();
    const date = format(publishDate, 'dd.MM.yyyy', { locale: ptBR });

    const handleClickPost = (values: any) => { 
        console.log(    )
        Axios.post("http://localhost:5000/pag/posts", {
            id_usuario: activeUser.id,
            post: values.post,
            date: date,
            imagem: images,
            topico: values.topico,
            
        }).then((response) => {
            console.log(response)
            setOpenPopup(false)
        }) .catch((error) => {
            console.error("Erro ao enviar os dados:", error);
            alert("Ocorreu um erro ao publicar.");
        });
    };

    const validationPost = yup.object().shape({
        post: yup
        .string()
        .required(""),

        topico: yup 
        .string()
        .required("Selecione um tópico"),
    });

    const [open, setOpenPopup] = useState(false);
    const closePopup = () => setOpenPopup(false);

    return(
        <div>
            <button onClick={() => setOpenPopup(true)}
                className={`
                flex justify-start items-center 
                text-2xl text-[#8D8C8D]
                h-[3rem] w-[25rem] mt-3
                border-b-2
                `} type='button'> O que deseja compartilhar hoje?
            </button>

            <Popup open={open} closeOnDocumentClick onClose={closePopup} modal nested>
                <Formik 
                    initialValues={{ post: "" }} 
                    onSubmit={handleClickPost}
                    validationSchema={validationPost}
                >
                    <Form  className={`
                        flex flex-col justify-center items-center
                        text-black bg-gradient-to-b from-black to-[#A90B99]
                        h-[38rem] rounded-md
                    `}>

                        <div className={`flex p-5 text-white text-3xl`}
                            style={{fontFamily: "Century Gothic"}}> NOVA PUBLICAÇÃO
                        </div>

                        <div className='flex flex-col gap-3 justify-center items-center'>
                           <div className="flex gap-3">
                                <img className="h-14" src={activeUser?.cor_perfil}/>

                                <div className='flex flex-col gap-5'>
                                    <Field className="p-2 text-2xl resize-none border-2 rounded-xl w-[35rem] h-[23rem] mr-[4rem]" name="post" placeholder="O que deseja compartilhar hoje?" as="textarea"/>
                                    <ErrorMessage name="post" component="span"/>
                                </div>      

                                {/* 
                                <div className={`
                                    flex justify-center items-center 
                                    border-2 border-dashed rounded-xl
                                    cursor-pointer w-[23rem] h-[23rem]
                                    `} style={{fontFamily: "Century Gothic"}}>

                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageUpdate,
                                            onImageRemove,
                                            onImageRemoveAll,
                                            isDragging,
                                            dragProps,
                                            }) => (
                                                        
                                            <div className="flex flex-col">
                                                <button type='button' style={isDragging ? { color: 'pink' } : undefined} onClick={onImageUpload} {...dragProps} className='flex flex-col items-center text-white mb-4'
                                                >
                                                <ImageUp color="#ffffff" size={40} />
                                                    Clique ou arraste uma imagem aqui
                                                </button>

                                                {imageList.map((image, index) => (
                                                <div key={index} className="flex flex-col items-center">
                                                    <img src={image['data_url']} alt="imagem selecionada" width="150" />

                                                    <div className="flex justify-center gap-2 mt-2">
                                                        <button type="button" onClick={() => onImageUpdate(index)} 
                                                            className='text-white text-sm bg-cyan-500 rounded-lg w-[7.5rem]'>
                                                            Mudar imagem
                                                        </button>
                                                                    
                                                        <button type="button" onClick={() => onImageRemove(index)} 
                                                            className='flex justify-center items-center bg-red-600 w-8 h-8 rounded-lg'>
                                                            <X color="#ffffff"/>
                                                        </button>
                                                    </div> 
                                                </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>  
                                */}                              
                            </div> 
       
                            <div className='flex justify-center items-center gap-3 bg-[#BC0FAB] h-[3rem] w-[35.5rem] rounded-xl'>
                                <p className='text-xl text-white' style={{fontFamily: "Century Gothic"}}>
                                    Selecione o assunto do seu post:
                                </p>
                                <div className='flex items-center gap-2'>
                                    <Field as="select" name="topico" className="rounded-xl h-[2rem]">
                                        <option value=""></option>
                                        <option value="monitor">Monitor</option>
                                        <option value="teclado">Teclado</option>
                                        <option value="mouse">Mouse</option>
                                        <option value="gabinete">Gabinete</option>  
                                        <option value="headset">Headset</option>
                                        <option value="processador">Processador/CPU</option>
                                        <option value="fonte">Fonte</option>
                                        <option value="placa-mãe">Placa-Mãe</option> 
                                        <option value="memória/ram">Memória/RAM</option>
                                        <option value="armazenamento/ssd">Armazenamento/SSD</option>
                                        <option value="ventoinha">Ventoinha</option>
                                        <option value="placa de vídeo">Placa de vídeo</option> 
                                        <option value="HD">HD</option> 
                                        <option value="computador">Computador</option> 
                                    </Field>                                    
                                    <ErrorMessage name='topico' component="span" className='flex justify-center items-center text-white bg-red-600 rounded-xl h-[2rem] w-[12rem] font-bold'/>                                                        
                                </div>
                            </div>
                        </div>
                       
                        
                                    
                        <div className="flex justify-center w-[55rem] mt-3 gap-3">
                            <button className={`
                                flex justify-center items-center
                                text-white font-bold text-xl
                                bg-lime-600 hover:bg-lime-700 rounded-xl  
                                h-[4rem] w-[8rem]
                                `} type='submit' onClick={closePopup}>
                                    <span>Publicar</span>
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
                    </Form>
                </Formik>
            </Popup>
        </div>   
    )
}