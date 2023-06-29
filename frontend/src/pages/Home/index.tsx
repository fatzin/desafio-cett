import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { ContentContainer, HomeContainer } from "./styles";

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Header />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </HomeContainer>
  );
};

export default Home;
