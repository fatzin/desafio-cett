import React, { useEffect, useState } from "react";
import { PostsContainer, CommentContainer } from "./styles";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Avatar from "../../../assets/avatar.png";
import { Link } from "react-router-dom";
import PublicarComentario from "../../PublicarComentario";
import useModal from "../../../hooks/useModal";
import Modal from "../../modal";

interface Post {
  id: number;
  texto: string;
  imagem?: string;
  curtidas: number;
  comentarios: number;
  id_usuario: number;
}

interface Comentarios {
  id: number;
  nome: string;
  username: string;
  conteudo: string;
  id_post: string;
  id_usuario: number;
  imagem: string;
}

interface Usuario {
  id: number;
  nome: string;
  username: string;
  imagem: string;
}

interface Props {
  post: Post;
  comentarios?: Comentarios[];
  id: number | string;
}

const RenderSinglePost: React.FC<Props> = ({ post, id }) => {
  const { isOpen, toggle } = useModal();
  const [comentarios, setComentarios] = useState<Comentarios[]>([]);
  const token = localStorage.getItem("token");
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/get/posts/${id}/comentarios-detalhados`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.ok) {
          const comentarioData = await response.json();
          console.log(comentarioData);
          setLoading(false);
          setComentarios(comentarioData);
        } else {
          const errorResponseText = await response.text();
          console.log("Ocorreu um erro:", errorResponseText);
        }
      } catch (error) {
        console.error("Erro ao obter comentários:", error);
      }
    };

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
    fetchComentarios();
  }, [id, token, post.id]);

  if (!usuario) {
    return null; // Renderizar um fallback ou carregando enquanto busca o usuário
  }

  return (
    <>
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
          <div className="mb-grey"></div>
          <div className="post-info-counts">
            <div className="comments post-info" onClick={toggle}>
              <div className="svg-post">
                <FaRegComment />
              </div>
              <Modal isOpen={isOpen} toggle={toggle}>
                <PublicarComentario post={post} />
              </Modal>
              <div className="comment-count post-info">{post.comentarios}</div>
            </div>
            <div className="likes post-info">
              <div className="svg-post-likes">
                <AiOutlineHeart />
              </div>
              <div className="likes-count post-info">{post.curtidas}</div>
            </div>
          </div>
          <div>
            <PublicarComentario post={post} />
          </div>
        </div>
      </PostsContainer>
      {loading ? (
        <div>Carregando comentários...</div>
      ) : (
        <CommentContainer className="comentarios">
          {comentarios?.length > 0 ? (
            comentarios.map((comentario) => (
              <div key={comentario.id} className="comment-wrap">
                <>
                  <div className="comment-header">
                    {comentario.imagem ? (
                      <img
                        src={comentario.imagem}
                        alt="pfp"
                        className="avator"
                      />
                    ) : (
                      <img src={Avatar} alt="pfp" className="avator" />
                    )}
                    <div className="comment-header-info">
                      {comentario.nome}
                      <span>@{comentario.username}</span>
                      <p>{comentario.conteudo}</p>
                    </div>
                  </div>
                </>
              </div>
            ))
          ) : (
            <></>
          )}
        </CommentContainer>
      )}
    </>
  );
};

export default RenderSinglePost;
