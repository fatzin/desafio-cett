import React, { FocusEvent, useContext, useEffect, useState } from "react";
import { PostContainer } from "./styles";
import { BiImageAdd } from "react-icons/bi";
import { UserContext } from "../../context/authContext";

const PublicarPost: React.FC = () => {
  const { user } = useContext(UserContext);
  const [postContent, setPostContent] = useState("");
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
      ".placeholder"
    ) as HTMLSpanElement;
    placeholder.style.display = "none";
  };

  const validate = (element: HTMLDivElement) => {
    const placeholder = document.querySelector(
      ".placeholder"
    ) as HTMLSpanElement;
    const counter = document.querySelector(".counter") as HTMLSpanElement;
    const button = document.querySelector(".post-button") as HTMLButtonElement;

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

  const handlePostButtonClick = () => {
    const conteudo = document.querySelector(".editable") as HTMLDivElement;
    setPostContent(conteudo.textContent || "");
    window.location.reload();
  };

  useEffect(() => {
    const postData = async () => {
      try {
        // Chamar a API para postar o conteúdo
        const response = await fetch("http://localhost:8000/api/post/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            texto: postContent,
            id_usuario: user?.id,
          }),
        });

        if (response.ok) {
          // Postar com sucesso
          // Limpar o conteúdo do post
          setPostContent("");
        } else {
          const errorData = await response.json();
          console.error(errorData.error);
        }
      } catch (error) {
        console.error("Erro ao postar:", error);
      }
    };

    if (postContent !== "") {
      postData();
    }
  }, [postContent, token, user?.id]);

  return (
    <PostContainer>
      <div className="input-box">
        <div className="post-area">
          <span className="placeholder">O que você quer escrever hoje?</span>
          <div
            className="input editable"
            contentEditable={true}
            spellCheck={false}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyUp={handleInputKeyUp}
            onKeyPress={handleInputKeyPress}
          ></div>
          <div
            className="input readonly"
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
        <div className="content">
          <span className="counter">150</span>
          <button
            className="post-button"
            onClick={handlePostButtonClick}
            disabled={currentLength > 150}
          >
            Postar
          </button>
        </div>
      </div>
    </PostContainer>
  );
};

export default PublicarPost;
