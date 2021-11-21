import React, { useState, useContext, useEffect } from "react";
import { api } from "../../services/api";
import TextInput from "../../components/Input";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import {
  Container,
  InnerContainer,
  PageTitle,
  SubTitle,
  FormArea,
  Button,
  ButtonText,
  MsgBox,
  Line,
  StyledText,
} from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { CredentialsContext } from "../../context/credentials";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../../context/auth";

const PasswordRecovery = () => {
  const [senha, setSenha] = useState();
  const { user, setUser } = useAuth();

  const clearLogin = () => {
    AsyncStorage.removeItem("user")
    setUser( { estaLogado: false,
      atividade: "",
      cod: "",
      cpf: "",
      email: "",
      endereco: "",
      nome: "",
      senha: "",
      status: "",
      telefone: "", });
  };

  const Update = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/updatesenha/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senha: senha,
      }),
    });
    const password = await res.json();
    setSenha(password)
    
   
  }

  return (
    <KeyboardAvoidingWrapper>
      {
        <Container>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>BYCAR</PageTitle>
            <SubTitle>Redefinição de Senha</SubTitle>
            <StyledText>
              Redefina a sua senha preenchendo os campos abaixo
            </StyledText>

            <FormArea>
              <TextInput
                label="Senha"
                placeholder="Insira sua nova senha"
                onChangeText={(value) => setSenha(value)}
              
              />
              <TextInput
                label="Cofirmação de Senha"
                placeholder="Reinsira sua nova senha"
                onChangeText={(value) => setSenha(value)}
             
              />
              

              <Button onPress={() => Update(user.id)}>
                <ButtonText>REDEFINIR</ButtonText>
              </Button>
            </FormArea>

            <Button onPress={clearLogin}>
              <ButtonText>SAIR</ButtonText>
            </Button>
          </InnerContainer>
        </Container>
      }
    </KeyboardAvoidingWrapper>
  );
};

export default PasswordRecovery;
