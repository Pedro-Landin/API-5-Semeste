import React, { useContext } from "react";

import {
  Container,
  InnerContainer,
  SubTitle,
  PageTitle,
  Button,
  ButtonText,
} from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../../context/credentials";
import { HeadContainer } from "../../components/style";
import Header from "../../components/header";

const Profile = () => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email } = storedCredentials;

  const clearLogin = () => {
    AsyncStorage.removeItem("bycarCredentials")
      .then(async () => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <HeadContainer>
      <Header />
      <Container>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Perfil</PageTitle>
          <SubTitle>{name}</SubTitle>
          <SubTitle>{email}</SubTitle>
          <Button onPress={clearLogin}>
            <ButtonText>SAIR</ButtonText>
          </Button>
        </InnerContainer>
      </Container>
    </HeadContainer>
  );
};

export default Profile;
