import React, { FocusEvent, useContext, useEffect, useState } from "react";
import { PostContainer } from "./styles";
import { BiImageAdd } from "react-icons/bi";
import { UserContext } from "../../context/authContext";

interface Post {
  id: number;
  texto: string;
  imagem?: string;
  curtidas: number;
  comentarios: number;
  id_usuario: number;
}

interface Props {
  post: Post;
}

const PublicarComentario: React.FC<Props> = ({ post }) => {
  const { user, authenticated } = useContext(UserContext);
  const [commentContent, setCommentContent] = useState("");
  const [currentLength, setCurrentLenght] = useState(0);

  const token = localStorage.getItem("token");

  const handleInputFocus = () => {
    const placeholder = document.querySelector(
      ".placeholder"
    ) as HTMLSpanElement;
    placeholder.style.color = "#c5ccd3";
  };

  const handleInputBlur = (e: FocusEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    validate(element);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    validate(element);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    validate(element);
    const placeholder = document.querySelector(
      ".placeholder-comment"
    ) as HTMLSpanElement;
    placeholder.style.display = "none";
  };

  const validate = (element: HTMLDivElement) => {
    const placeholder = document.querySelector(
      ".placeholder-comment"
    ) as HTMLSpanElement;
    const counter = document.querySelector(
      ".counter-comments"
    ) as HTMLSpanElement;
    const button = document.querySelector(
      ".post-button-comments"
    ) as HTMLButtonElement;

    const maxLength = 150;
    const currentLength = element.innerText.length;
    setCurrentLenght(currentLength);

    placeholder.style.display = currentLength <= 0 ? "block" : "none";
    counter.style.display = currentLength <= 0 ? "none" : "block";
    button.classList.toggle("active", currentLength > 0);
    button.classList.toggle("disable", currentLength > 150);

    counter.innerText = String(maxLength - currentLength);
    counter.style.color = currentLength > maxLength ? "#e0245e" : "#333";
  };

  const handleCommentButtonClick = () => {
    const conteudo = document.querySelector(
      ".editable-comments"
    ) as HTMLDivElement;
    setCommentContent(conteudo.textContent || "");
    window.location.reload();
  };

  useEffect(() => {
    const postComentario = async () => {
      try {
        console.log(user, commentContent);
        // Chamar a API para postar o conteúdo
        const response = await fetch(
          `http://localhost:8000/api/post/posts/${post.id}/comentarios`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify({
              conteudo: commentContent,
              id_usuario: user?.id,
            }),
          }
        );

        if (response.ok) {
          // Postar com sucesso
          // Limpar o conteúdo do comentario
          setCommentContent("");
        } else {
          const errorData = await response.json();
          console.error(errorData.error);
        }
      } catch (error) {
        console.error("Erro ao postar:", error);
      }
    };

    if (commentContent !== "") {
      postComentario();
    }
  }, [commentContent]);

  return (
    <>
      {authenticated ? (
        <PostContainer>
          <div className="input-box-comments">
            <div className="post-area-comments">
              <span className="placeholder-comment">Postar sua resposta</span>
              <div
                className="input-comment editable-comments"
                contentEditable={true}
                spellCheck={false}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyUp={handleInputKeyUp}
                onKeyPress={handleInputKeyPress}
              ></div>
              <div
                className="input-comment readonly-comments"
                contentEditable={true}
                spellCheck={false}
              ></div>
            </div>
          </div>
          <div className="bottom">
            <ul className="icons">
              <li>
                <BiImageAdd />
              </li>
            </ul>
            <div className="content-comment">
              <span className="counter-comments">150</span>
              <button
                className="post-button-comments"
                onClick={handleCommentButtonClick}
                disabled={currentLength > 150}
              >
                Comentar
              </button>
            </div>
          </div>
        </PostContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default PublicarComentario;
