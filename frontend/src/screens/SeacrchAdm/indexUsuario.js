import React from "react";

import { ImageBackground } from "react-native";
import SearchInput from "../../components/Input/searchInput";
import { BasicContainer} from "../../components/style";
import { SubTitle } from "../../components/styles";

const Usuarios = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../images/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <BasicContainer>
        <SearchInput placeholder="Pesquisar" />
        <SubTitle>Resultados...</SubTitle>
      </BasicContainer>
    </ImageBackground>
  );
};

export default Usuarios;
