// useResponse.tsx
import { useState, useEffect } from "react";
import axios from 'axios';  

const useResponse = () => {
  const [comentarios, setComentarios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [posts, setPosts] = useState([]);
  const [anexos, setAnexos] = useState([]);
  const [sugestoes, setSugestoes] = useState([]);

  const [lastData, setLastData] = useState({});

  const fetchData = async () => {
    try {
      const [comentariosResponse, usuariosResponse, postsResponse, anexosResponse, sugestoesResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/comentarios'),
        axios.get('http://localhost:5000/api/usuario'),
        axios.get('http://localhost:5000/api/posts'),
        axios.get('http://localhost:5000/api/anexos'),
        axios.get('http://localhost:5000/api/sugestao'),
      ]);

      const newData = {
        comentarios: comentariosResponse.data.reverse(),
        usuarios: usuariosResponse.data,
        posts: postsResponse.data.reverse(),
        anexos: anexosResponse.data,
        sugestoes: sugestoesResponse.data,
      };

      checkForUpdates(newData);

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const checkForUpdates = (newData: any) => {
    if (JSON.stringify(newData) !== JSON.stringify(lastData)) {
      setComentarios(newData.comentarios);
      setUsuarios(newData.usuarios);
      setPosts(newData.posts);
      setAnexos(newData.anexos);
      setSugestoes(newData.sugestoes);
      setLastData(newData);
    } 
  };

  useEffect(() => {
    fetchData(); // Busca os dados inicialmente
    const interval = setInterval(() => {
      fetchData(); // Busca os dados a cada x segundos
    }, 1000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []); // Executa apenas uma vez na montagem

  return { comentarios, usuarios, posts, anexos, sugestoes };
};

export default useResponse;
