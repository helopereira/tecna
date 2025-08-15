import perfil from '../../../images/perfil.png';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';

interface MenuProps {
  page: string; // Define o tipo de 'page' como string
}

export default function Menu({ page }: MenuProps) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <ul className="
      flex justify-center items-center
      text-white gap-10 font-thin text-xl
    ">
      <li>
        <a href="/" className={page === "home" ? 'text-[#950888] font-semibold' : ''}>Home</a>
      </li>
      <li>
        <a href="/pag/posts" className={page === "posts" ? 'text-[#950888] font-semibold' : ''}>Posts</a>
      </li>
      <li>
        <a href="/pag/contato" className={page === "contato" ? 'text-[#950888] font-semibold' : ''}>Contate-nos</a>
      </li>
      {!isAuthenticated ? (
        <li className={`flex justify-center items-center gap-3 pr-3 ${page === "login" ? 'text-[#950888] font-semibold' : ''}`}>
          <a href="/pag/login">Login</a>
          <a href="/pag/login">
            <img className="w-10 h-10" src={perfil.src} alt="Perfil" />
          </a>
        </li>
      ) : (
        <li className={`flex justify-center items-center gap-3 pr-3 ${page === "perfil" ? 'text-[#950888] font-semibold' : ''}`}>
          <a href="/pag/perfil">Meu Perfil</a>
          <a href="/pag/perfil">
            <img className="w-10 h-10" src={perfil.src} alt="Perfil" />
          </a>
        </li>
      )}
    </ul>
  );
}
