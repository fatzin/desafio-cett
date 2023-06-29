import React, { useState, useEffect, useContext } from "react";
import { SectionPrincipal } from "./styles";
import PublicarPost from "../PublicarPost";
import Posts from "../Posts";
import { UserContext } from "../../context/authContext";

interface Post {
  id: number;
  title: string;
  content: string;
  texto: string;
  curtidas: number;
  comentarios: number;
  id_usuario: number;
}

const Inicio: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { authenticated } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Chamar a API para obter os posts
      const response = await fetch("http://localhost:8000/api/get/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data: Post[] = await response.json();
        setPosts(data); // Armazenar os posts no estado
      } else {
        const errorData = await response.json();
        console.error(errorData.error);
      }
    } catch (error) {
      console.error("Erro ao obter os posts:", error);
    }
  };

  return (
    <SectionPrincipal>
      <h1 className="inicio__title">Página Inicial</h1>
      {authenticated && (
        <div className="border__box">
          <PublicarPost />
        </div>
      )}
      <div className="posts">
        {posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div>
    </SectionPrincipal>
  );
};

export default Inicio;
