import styled from "styled-components";

export const PostsContainer = styled.div`
  width: 100%;
  svg {
    width: 19px;
    height: 19px;
  }
  a {
    text-decoration: none;
    color: inherit;
    font-family: inherit;
  }
  img {
    max-width: 100%;
  }
  .avator {
    border-radius: 100px;
    width: 48px;
    margin-right: 15px;
  }

  .post-wrap {
    text-decoration: none;
    max-width: 600px;
    color: var(--font-primary);
    background: var(--bg-black);
    margin: 0 auto;
    border-radius: 3px;
    padding: 30px;
    border-bottom: 1px solid var(--border-color);
    border-top: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
  }

  .post-wrap:hover {
    cursor: pointer;
    background: var(--bg-hover-post);
  }

  .post-header {
    display: flex;
    align-items: flex-start;
    font-size: 14px;
  }
  .post-header-info {
    font-weight: bold;
  }
  .post-header-info span {
    color: #657786;
    font-weight: normal;
    margin-left: 5px;
  }
  .post-header-info p {
    font-weight: normal;
    margin-top: 5px;
  }
  .post-img-wrap {
    padding-left: 60px;
  }

  .post-info-counts {
    display: flex;
    margin-left: 60px;
    margin-top: 10px;
  }
  .post-info-counts .post-info {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .post-info-counts .post-info .svg-post,
  .post-info-counts .post-info .svg-post-likes {
    display: flex;
    color: #657786;
    align-items: center;
    width: 35px;
    height: 35px;
  }

  .post-info-counts .post-info .svg-post svg,
  .post-info-counts .post-info .svg-post-likes svg {
    width: 100%;
  }

  .post-info-counts .post-info .svg-post:hover {
    cursor: pointer;
    color: var(--hover-a);
    border-radius: 20px;
    background-color: var(--bg-hover-c);
  }
  .post-info-counts .post-info .svg-post-likes:hover {
    cursor: pointer;
    color: var(--hover-ap);
    border-radius: 20px;
    background-color: var(--bg-hover-l);
  }
  .post-info-counts .comments .svg-post svg:hover {
    color: var(--hover-a);
    border-radius: 20px;
    background-color: var(--bg-hover-c);
  }
  .post-info-counts .likes .svg-post svg:hover {
    color: var(--hover-ap);
    border-radius: 20px;
    background-color: var(--bg-hover-l);
  }
  @media screen and (max-width: 430px) {
    body {
      padding-left: 20px;
      padding-right: 20px;
    }
    .post-header {
      flex-direction: column;
    }
    .post-header img {
      margin-bottom: 20px;
    }
    .post-header-info p {
      margin-bottom: 30px;
    }
    .post-img-wrap {
      padding-left: 0;
    }
    .post-info-counts {
      display: flex;
      margin-left: 0;
    }
    .post-info-counts div {
      margin-right: 10px;
    }
  }
`;
