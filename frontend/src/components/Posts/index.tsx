import React, { useContext, useEffect, useState } from "react";
import { PostsContainer } from "./styles";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Avatar from "../../assets/avatar.png";
import useModal from "../../hooks/useModal";
import Modal from "../modal";
import PublicarComentario from "../PublicarComentario";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/authContext";

interface Post {
  id: number;
  texto: string;
  imagem?: string;
  curtidas: number;
  comentarios: number;
  id_usuario: number;
}

interface Usuario {
  id: number;
  nome: string;
  username: string;
  imagem: string;
}

interface Props {
  post: Post;
}

const Posts: React.FC<Props> = ({ post }) => {
  const { authenticated } = useContext(UserContext);
  const { isOpen, toggle } = useModal();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/get/users/${post.id_usuario}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const usuarioData = await response.json();
          setUsuario(usuarioData);
        } else {
          const errorData = await response.json();
          console.error(errorData.error);
        }
      } catch (error) {
        console.error("Erro ao obter usuário:", error);
      }
    };

    fetchUsuario();
  }, [post.id_usuario]);

  if (!usuario) {
    return null; // Renderizar um fallback ou carregando enquanto busca o usuário
  }

  return (
    <PostsContainer>
      <div className="post-wrap">
        <Link to={`/posts/${post.id}`}>
          <div className="post-header">
            {usuario.imagem ? (
              <img src={usuario.imagem} alt="pfp" className="avator" />
            ) : (
              <img src={Avatar} alt="pfp" className="avator" />
            )}
            <div className="post-header-info">
              {usuario.nome}
              <span>@{usuario.username}</span>
              <p>{post.texto}</p>
            </div>
          </div>
          <div className="post-img-wrap">
            {post.imagem ? (
              <img
                src="https://pbs.twimg.com/media/Dgti2h0WkAEUPmT.png"
                alt=""
                className="post-img"
              />
            ) : (
              <></>
            )}
          </div>
        </Link>
        <div className="post-info-counts">
          {authenticated ? (
            <div className="comments post-info" onClick={toggle}>
              <div className="svg-post">
                <FaRegComment />
              </div>
              <Modal isOpen={isOpen} toggle={toggle}>
                <PublicarComentario post={post} />
              </Modal>
              <div className="comment-count post-info">{post.comentarios}</div>
            </div>
          ) : (
            <div className="comments post-info">
              <div className="svg-post">
                <FaRegComment />
              </div>
              <Modal isOpen={isOpen} toggle={toggle}>
                <PublicarComentario post={post} />
              </Modal>
              <div className="comment-count post-info">{post.comentarios}</div>
            </div>
          )}
          <div className="likes post-info">
            <div className="svg-post-likes">
              <AiOutlineHeart />
            </div>
            <div className="likes-count post-info">{post.curtidas}</div>
          </div>
        </div>
      </div>
    </PostsContainer>
  );
};

export default Posts;
