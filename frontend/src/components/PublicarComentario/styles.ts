import styled from "styled-components";

export const PostContainer = styled.section`
  max-width: 550px;
  z-index: 4;
  width: 100%;
  border-radius: 15px;
  padding: 25px 25px 15px 25px;
  background-color: var(--bg-black);
  color: var(--font-primary);
  font-family: "Poppins", sans-serif;
  & .input-box-comments {
    padding-top: 10px;
    border-bottom: 1px solid var(--border-color);
  }

  & .input-box-comments .post-area-comments {
    position: relative;
    min-height: 130px;
  }

  & .post-area-comments .placeholder-comment {
    position: absolute;
    margin-top: 1px;
    font-size: 17px;
    color: var(--font-secondary);
    pointer-events: none;
  }
  & .post-area-comments .input-comment {
    outline: none;
    font-size: 17px;
    word-wrap: break-word;
  }
  & .post-area-comments .readonly-comments {
    position: absolute;
    overflow-wrap: break-word;
    top: 0;
    left: 0;
    z-index: -1;
  }
  & .bottom {
    display: flex;
    margin-top: 13px;
    align-items: center;
    justify-content: space-between;
  }
  & .bottom .icons {
    display: inline-flex;
  }

  & .icons li {
    color: var(--bg-purple);
    list-style: none;
    height: 38px;
    width: 38px;
    display: flex;
    margin: 0 2px;
    font-size: 20px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  & .icons li:hover {
    background-color: var(--bg-hover-p);
    transition: background 0.2 ease;
  }

  & .bottom .content-comment {
    display: flex;
    align-items: center;
  }

  & .content-comment .counter-comments {
    display: none;
    margin-right: 15px;
    padding-right: 15px;
    color: var(--font-primary);
    border-right: 1px solid #aab8c2;
  }

  & .content-comment button {
    padding: 9px 18px;
    border: none;
    outline: none;
    border-radius: 50px;
    font-size: 15px;
    font-weight: 700;
    background-color: var(--bg-purple);
    color: var(--font-primary);
    cursor: pointer;
    opacity: 0.5;
    pointer-events: none;
  }

  & .bottom button.active {
    opacity: 1;
    pointer-events: auto;
  }

  button:disabled {
    background: red;
    color: var(--font-primary);
  }
`;
