import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdHome, MdNotificationsNone } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import { UserContext } from "../../context/authContext";
import Avatar from "../../assets/avatar.png";
import {
  HeaderContainer,
  HeaderOptions,
  HeaderSpacer,
  HeaderUser,
} from "./styles";

const Header: React.FC = () => {
  const { user, authenticated } = useContext(UserContext);
  const signOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      <HeaderContainer>
        <HeaderSpacer>
          {authenticated ? (
            <>
              {user && (
                <>
                  <HeaderOptions>
                    <Link to="/">
                      <MdHome /> Home{" "}
                    </Link>

                    <Link to="/notifications">
                      <MdNotificationsNone /> Notificações
                    </Link>

                    <Link to="/settings/profile">
                      <BsGear /> Configurações
                    </Link>
                    <Link
                      to="/"
                      onClick={() => signOut()}
                      className="link__button"
                    >
                      Sair
                    </Link>
                  </HeaderOptions>
                  <HeaderUser>
                    {user.imagem ? (
                      <img src={user.imagem} alt="pfp" width={30} height={30} />
                    ) : (
                      <img src={Avatar} alt="pfp" width={30} height={30} />
                    )}
                    <p className="">{user.nome}</p>
                  </HeaderUser>
                </>
              )}{" "}
            </>
          ) : (
            <>
              <HeaderOptions>
                <Link to="/">
                  <MdHome /> Home{" "}
                </Link>
                <Link to="/auth/login" className="link__button">
                  Entrar
                </Link>
              </HeaderOptions>
            </>
          )}
        </HeaderSpacer>
      </HeaderContainer>
    </>
  );
};

export default Header;
