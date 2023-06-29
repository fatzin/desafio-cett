import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SectionPrincipal } from "./styles";
import RenderSinglePost from "./RenderSinglePost";

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
  conteudo: string;
  id_post: string;
  id_usuario: number;
}

/*interface Usuario {
  id: number;
  nome: string;
  username: string;
  imagem: string;
}*/

interface Props {
  post?: Post;
  comentarios: Comentarios[];
  id: number;
}

const PostDetail: React.FC<Props> = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const makePost = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/get/posts/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          const errorData = await response.json();
          console.error(errorData.error);
        }
      } catch (error) {
        console.error("Erro ao obter posts:", error);
      }
    };

    makePost();
  }, [id, token]);

  return (
    post && (
      <>
        <SectionPrincipal>
          <h1 className="inicio__title">Post</h1>
          <div className="posts">
            <RenderSinglePost post={post} id={post.id} />
          </div>
        </SectionPrincipal>
      </>
    )
  );
};

export default PostDetail;
